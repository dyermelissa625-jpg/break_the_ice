const queues = {
  "tic-tac-toe": [],
  "would-you-rather": [],
};

function addToQueue(game, socket) {
  if (!queues[game]) queues[game] = [];
  queues[game].push(socket);
}

function removeFromQueue(game, socket) {
  if (!queues[game]) return;
  queues[game] = queues[game].filter(s => s.id !== socket.id);
}

function findMatch(game) {
  const q = queues[game];
  if (q.length >= 2) {
    const p1 = q.shift();
    const p2 = q.shift();
    return [p1, p2];
  }
  return null;
}

module.exports = {
  addToQueue,
  removeFromQueue,
  findMatch
};
