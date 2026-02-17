"use client";

import { Card as C, CardHeader as CH, CardTitle as CT, CardContent as CC } from "@/components/ui/card";
import { Button as B } from "@/components/ui/button";
import { useState, useEffect } from "react";

// Simple color pool
const COLORS = [
{ name: "Red", class: "bg-red-500" },
{ name: "Blue", class: "bg-blue-500" },
{ name: "Green", class: "bg-green-500" },
{ name: "Yellow", class: "bg-yellow-400" },
];

export function ColorPulse({ className = "" }: { className?: string }) {
const [target, setTarget] = useState(COLORS[0]);
const [options, setOptions] = useState<typeof COLORS>([]);
const [score, setScore] = useState(0);
const [message, setMessage] = useState("");

useEffect(() => {
newRound();
}, []);

function newRound() {
const shuffled = [...COLORS].sort(() => Math.random() - 0.5);
const t = shuffled[0];
setTarget(t);
setOptions(shuffled);
setMessage("");
}

function choose(c: any) {
if (c.name === target.name) {
setScore(score + 1);
setMessage("Correct!");
} else {
setMessage("Try again");
}
setTimeout(newRound, 600);
}

return (
<C className={className}>
<CH>
<CT>Color Match</CT>
</CH>
<CC>
<div className="flex flex-col items-center gap-6">
<div className="text-lg font-medium">Match this color:</div>

<div className={`w-24 h-24 rounded-xl shadow-inner ${target.class}`} />

<div className="grid grid-cols-2 gap-4 w-full max-w-xs mt-4">
{options.map((c) => (
<button
key={c.name}
>
  {/* Button content goes here */}
</button>
))}

</div>
<div className="mt-4 text-lg">{message}</div>
<div className="mt-2 text-sm">Score: {score}</div>
</div>
</CC>
</C>
);
}