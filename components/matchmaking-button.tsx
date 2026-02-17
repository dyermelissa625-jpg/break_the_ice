// components/MatchButton.tsx
"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { getSocket } from "../lib/socket";

type Props = {
  game: string; // e.g. "tic-tac-toe" or "would-you-rather"
  label?: string;
  searchingLabel?: string;
  className?: string;
};

export default function MatchButton({
  game,
  label = "Find Match",
  searchingLabel = "Searching...",
  className,
}: Props) {
  const router = useRouter();
  const [searching, setSearching] = useState(false);
  const [opponentId, setOpponentId] = useState<string | null>(null);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    const socket = getSocket();
    socketRef.current = socket;

    // connect lazily when component mounts (or you may prefer connect on first find)
    if (!socket.connected) {
      socket.connect();
    }

    // Listen for status updates
    const onStatus = (payload: any) => {
      // payload: { status: "searching" } or other states from server
      if (payload?.status === "searching") {
        setSearching(true);
      }
    };

    // Match found handler
    const onMatchFound = (payload: { roomId: string; opponentId?: string }) => {
      // payload.roomId expected (server provides)
      setSearching(false);
      setOpponentId(payload.opponentId || null);

      // Navigate to the game route—choose your routing style
      // Example: /games/tic-tac-toe?room=ROOMID
      const roomParam = encodeURIComponent(payload.roomId);
      router.push(`/games/${game}?room=${roomParam}`);
    };

    socket.on("matchStatus", onStatus);
    socket.on("matchFound", onMatchFound);

    return () => {
      socket.off("matchStatus", onStatus);
      socket.off("matchFound", onMatchFound);
    };
  }, [game, router]);

  // Start searching
  const startSearch = () => {
    const socket = socketRef.current || getSocket();
    if (!socket.connected) socket.connect();
    setSearching(true);
    socket.emit("findMatch", { game });
  };

  // Leave queue (cancel)
  const cancelSearch = () => {
    const socket = socketRef.current || getSocket();
    setSearching(false);
    socket.emit("leaveQueue", { game }); // server should implement leaveQueue listener
  };

  return (
    <div className={className}>
      {!searching ? (
        <button onClick={startSearch} className="px-4 py-2 rounded bg-primary text-white">
          {label}
        </button>
      ) : (
        <div className="flex items-center gap-3">
          <button onClick={cancelSearch} className="px-4 py-2 rounded border">
            Cancel
          </button>
          <div className="text-sm text-muted-foreground">{searchingLabel}</div>
        </div>
      )}
    </div>
  );
}
