"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type BoardValue = "X" | "O" | null;

export default function Page() {
  const socketRef = useRef<Socket | null>(null);

  const [roomId, setRoomId] = useState("");
  const [myRoom, setMyRoom] = useState<string | null>(null);
  const [mySymbol, setMySymbol] = useState<BoardValue>(null);
  const [board, setBoard] = useState<BoardValue[]>(Array(9).fill(null));
  const [turnId, setTurnId] = useState<string | null>(null);
  const [info, setInfo] = useState("Connecting...");
  const [connected, setConnected] = useState(false);
  const [winner, setWinner] = useState<BoardValue | "draw" | null>(null);
  const [waitingRematch, setWaitingRematch] = useState(false);

  // Initialize socket once
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:3001", {
        transports: ["websocket"],
        reconnection: true,
      });
    }
    const socket = socketRef.current;

    socket.on("connect", () => {
      setConnected(true);
      setInfo("Connected — create or join a room");
    });

    socket.on("disconnect", () => {
      setConnected(false);
      setInfo("Disconnected");
    });

    socket.on("waiting", ({ message }) => setInfo(message));

    socket.on("gameStart", ({ board, turn }) => {
      setBoard(board);
      setTurnId(turn);
      setWinner(null);
      setWaitingRematch(false);
      setInfo(`Game started — you are ${mySymbol}. ${turn === socket.id ? "Your turn" : "Opponent's turn"}`);
    });

    socket.on("update", ({ board, turn, winner }) => {
      setBoard(board);
      if (winner) {
        setWinner(winner);
        setInfo(winner === "draw" ? "Draw!" : `Winner: ${winner}`);
      } else {
        setTurnId(turn);
        setInfo(turn === socket.id ? "Your turn" : "Opponent's turn");
      }
    });

    socket.on("playerLeft", () => {
      setInfo("Opponent left — game ended");
      setTurnId(null);
      setBoard(Array(9).fill(null));
      setWinner(null);
      setWaitingRematch(false);
    });

    socket.on("info", ({ message }) => setInfo(message));

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("waiting");
      socket.off("gameStart");
      socket.off("update");
      socket.off("playerLeft");
      socket.off("info");
    };
  }, [mySymbol]);

  const createRoom = () => {
    if (!socketRef.current) return;
    socketRef.current.emit("createRoom", (res: { ok: boolean; roomId?: string; error?: string }) => {
      if (!res.ok) return alert(res.error);
      setRoomId(res.roomId!);
      joinRoom(res.roomId!);
    });
  };

  const joinRoom = (id: string) => {
    if (!id) return alert("Enter a room ID first!");
    if (!socketRef.current) return;
    socketRef.current.emit("joinRoom", { roomId: id }, (res: { ok: boolean; symbol?: BoardValue; error?: string }) => {
      if (!res.ok) return alert(res.error);
      setMySymbol(res.symbol!);
      setMyRoom(id);
      setInfo(`Joined room ${id} — waiting for opponent...`);
    });
  };

  const makeMove = (i: number) => {
    if (!myRoom || !!winner || turnId !== socketRef.current?.id) return;
    if (board[i]) return;
    socketRef.current?.emit("makeMove", { roomId: myRoom, index: i });
  };

  const continuePlaying = () => {
    if (!myRoom) return;
    setWaitingRematch(true);
    socketRef.current?.emit("continue", { roomId: myRoom });
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-background text-foreground">
      <div className="w-full max-w-sm space-y-4">
        <div className="flex gap-2">
          <input
            value={roomId}
            onChange={(e) => setRoomId(e.target.value.toUpperCase())}
            placeholder="Room ID"
            className="flex-1 p-2 border rounded"
          />
          <button onClick={createRoom} disabled={!connected} className="px-3 py-2 border rounded">Create</button>
          <button onClick={() => joinRoom(roomId)} disabled={!connected} className="px-3 py-2 border rounded">Join</button>
        </div>

        <div className="text-sm">{info}</div>

        <div className="grid grid-cols-3 gap-2">
          {board.map((val, i) => (
            <button
              key={i}
              onClick={() => makeMove(i)}
              disabled={!myRoom || !!val || !!winner || turnId !== socketRef.current?.id}
              className="h-20 w-full text-2xl font-bold border rounded bg-primary/10 hover:bg-primary/20 disabled:opacity-50"
            >
              {val}
            </button>
          ))}
        </div>

        {winner && !waitingRematch && (
          <button
            onClick={continuePlaying}
            className="px-3 py-2 border rounded mt-2"
          >
            Continue / Rematch
          </button>
        )}

        {waitingRematch && (
          <div className="text-sm mt-2 text-gray-600">Waiting for opponent to continue...</div>
        )}
      </div>
    </main>
  );
}
