// lib/socket.ts
"use client";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    const url = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8080";
    socket = io(url, {
      transports: ["websocket"],
      autoConnect: false,
      // If you want to send auth token:
      // auth: { token: localStorage.getItem("token") }
    });
  }
  return socket;
}

// Optional helper to teardown socket entirely (useful for tests)
export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
