"use client"

import { Button } from "../ui/button"
import Link from "next/link";

interface GamesButtonProps {
    className?: string;
}

export function GamesButton({ className }: GamesButtonProps) {
  return (
    <Button asChild className={className}>
        <Link href="/game-room">Click to Begin</Link>
    </Button>
  );}