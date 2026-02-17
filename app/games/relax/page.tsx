"use client";
import { BreathWaveGame } from "@/components/games/BreathWaveGame";
export default function Page() {
return (
<div className="min-h-screen flex items-center justify-center p-8">
<BreathWaveGame className="w-full max-w-xl" />
</div>
);
}