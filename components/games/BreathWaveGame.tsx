"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { useState } from "react";

export function BreathWaveGame({ className = "" }: { className?: string }) {
const [running, setRunning] = useState(false);
const [bpm, setBpm] = useState(6);

return (
<Card className={className}>
<CardHeader>
<div className="flex items-center justify-between">
<CardTitle>Breath Wave</CardTitle>
<Button variant="ghost" onClick={() => setRunning(!running)}>
{running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
</Button>
</div>
</CardHeader>
<CardContent>
<div className="flex flex-col items-center gap-6">
<motion.div
animate={running ? { scale: [1, 1.15, 1] } : { scale: 1 }}
transition={{ repeat: running ? Infinity : 0, duration: 60 / bpm }}
className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/30 to-secondary/20 flex items-center justify-center shadow-lg"
>
<div className="text-center">
<div className="text-xl font-semibold">Breathe</div>
<div className="text-xs opacity-60">{bpm} bpm</div>
</div>
</motion.div>

<input
type="range"
min={4}
max={10}
value={bpm}
onChange={(e) => setBpm(Number(e.target.value))}
className="w-full max-w-xs"
/>
</div>
</CardContent>
</Card>
);
}