"use client";

import { Card as C2, CardHeader as CH2, CardTitle as CT2, CardContent as CC2 } from "@/components/ui/card";
import { useState } from "react";

export function SoundPebbles({ className = "" }: { className?: string }) {
const [ripples, setRipples] = useState<any[]>([]);

function addRipple(e: any) {
const rect = e.currentTarget.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;
const id = Date.now();
setRipples((r) => [...r, { id, x, y }]);
setTimeout(() => setRipples((r) => r.filter((p) => p.id !== id)), 800);
}

return (
<C2 className={className}>
<CH2>
<CT2>Sound Pebbles</CT2>
</CH2>
<CC2>
<div
onClick={addRipple}
className="relative w-full h-64 rounded-xl bg-gradient-to-br from-blue-200 to-purple-200 overflow-hidden cursor-pointer"
>
{ripples.map((r) => (
<span
key={r.id}
className="absolute w-10 h-10 rounded-full bg-white/40 animate-ping"
style={{ left: r.x - 20, top: r.y - 20 }}
/>
))}
</div>
</CC2>
</C2>
);
}