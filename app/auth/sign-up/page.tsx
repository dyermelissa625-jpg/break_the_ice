"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const ALL_INTERESTS = [
  "Travel","Cooking","Fitness","Gaming","Movies","Music","Art",
  "Sports","Reading","Technology","Fashion","Outdoors","Pets",
  "Foodie","Photography",
];

export default function SignupPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    gender: "",
    address: "",
    interests: [] as string[],
  });

  function toggleInterest(i: string) {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(i)
        ? prev.interests.filter(x => x !== i)
        : [...prev.interests, i],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/authx/sign-up", {
      method: "POST",
      body: JSON.stringify({ ...form, age: parseInt(form.age) }),
    });
    const data = await res.json();
    alert(JSON.stringify(data));
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className = "mt-20"
      >
        <Card className="w-full max-w-md bg-card/30 backdrop-blur-lg border border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <Input
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
            <Input
              placeholder="Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <Input
              placeholder="Age"
              type="number"
              value={form.age}
              onChange={e => setForm({ ...form, age: e.target.value })}
            />
            <Input
              placeholder="Gender"
              value={form.gender}
              onChange={e => setForm({ ...form, gender: e.target.value })}
            />
            <Input
              placeholder="Address"
              value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })}
            />

            <div className="flex flex-wrap gap-2">
              {ALL_INTERESTS.map(i => {
                const selected = form.interests.includes(i);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => toggleInterest(i)}
                    className={`px-3 py-1 rounded-full border transition-all duration-200
                      ${selected 
                        ? "bg-primary/20 border-primary text-primary" 
                        : "bg-background border-border text-foreground hover:bg-primary/10"}`}
                  >
                    {i}
                  </button>
                );
              })}
            </div>

            <Button
              className="w-full mt-2"
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

