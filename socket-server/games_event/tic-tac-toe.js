const rooms = new Map();

function createRoomState(roomId) {
  return {
    id: roomId,
    players: {},
    order: [],
    board: Array(9).fill(null),
    turn: null,
    winner: null,
    moves: 0,
    readyForRematch: new Set(),
  };
}

function checkWinner(board) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (const [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  if (board.every(cell => cell !== null)) return 'draw';
  return null;
}

module.exports = function ticTacToe(io, socket) {

  console.log("TicTacToe: client connected", socket.id);

  socket.on('createRoom', (cb) => {
    const roomId = Math.random().toString(36).slice(2,7).toUpperCase();
    const state = createRoomState(roomId);
    rooms.set(roomId, state);
    cb({ ok: true, roomId });
  });

  socket.on('joinRoom', ({ roomId }, cb) => {
    const state = rooms.get(roomId);
    if (!state) return cb({ ok: false, error: 'Room not found' });
    if (state.order.length >= 2) return cb({ ok: false, error: 'Room full' });

    const symbol = state.order.length === 0 ? 'X' : 'O';
    state.players[socket.id] = { symbol };
    state.order.push(socket.id);
    socket.join(roomId);

    if (state.order.length === 2) {
      state.turn = state.order[0];
      io.to(roomId).emit('gameStart', {
        players: state.order.map(id => ({ id, symbol: state.players[id].symbol })),
        board: state.board,
        turn: state.turn,
      });
    } else {
      io.to(roomId).emit('waiting', { message: 'Waiting for opponent...' });
    }

    cb({ ok: true, symbol });
  });

  socket.on('makeMove', ({ roomId, index }, cb) => {
    const state = rooms.get(roomId);
    if (!state) return cb({ ok: false, error: 'Room not found' });
    if (state.winner) return cb({ ok: false, error: 'Game over' });
    if (socket.id !== state.turn) return cb({ ok: false, error: 'Not your turn' });
    if (state.board[index] !== null) return cb({ ok: false, error: 'Cell taken' });

    const symbol = state.players[socket.id].symbol;
    state.board[index] = symbol;
    state.moves++;

    const result = checkWinner(state.board);

    if (result === 'draw') {
      state.winner = 'draw';
      io.to(roomId).emit('update', { board: state.board, winner: 'draw' });
    } else if (result) {
      state.winner = result;
      io.to(roomId).emit('update', { board: state.board, winner: result });
    } else {
      state.turn = state.order.find(id => id !== state.turn);
      io.to(roomId).emit('update', { board: state.board, turn: state.turn });
    }

    cb({ ok: true });
  });

  socket.on('continue', ({ roomId }) => {
    const state = rooms.get(roomId);
    if (!state) return;

    state.readyForRematch.add(socket.id);

    if (state.readyForRematch.size < 2) {
      io.to(roomId).emit('info', { message: 'Waiting for opponent to continue...' });
      return;
    }

    // swap symbols
    for (const pid of state.order) {
      state.players[pid].symbol =
        state.players[pid].symbol === "X" ? "O" : "X";
    }

    // reset board
    state.board = Array(9).fill(null);
    state.moves = 0;
    state.winner = null;
    state.turn = state.order[0];
    state.readyForRematch.clear();

    io.to(roomId).emit('gameStart', {
      players: state.order.map(id => ({ id, symbol: state.players[id].symbol })),
      board: state.board,
      turn: state.turn,
    });
  });

  socket.on('leaveRoom', ({ roomId }) => {
    const state = rooms.get(roomId);
    if (!state) return;

    socket.leave(roomId);
    delete state.players[socket.id];
    state.order = state.order.filter(id => id !== socket.id);
    io.to(roomId).emit('playerLeft', { id: socket.id });

    if (state.order.length === 0) rooms.delete(roomId);
  });

  socket.on('disconnect', () => {
    for (const [roomId, state] of rooms.entries()) {
      if (state.players[socket.id]) {
        delete state.players[socket.id];
        state.order = state.order.filter(id => id !== socket.id);
        io.to(roomId).emit('playerLeft', { id: socket.id });
        if (state.order.length === 0) rooms.delete(roomId);
      }
    }
  });
};

