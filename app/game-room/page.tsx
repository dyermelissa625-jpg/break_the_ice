"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Snowflake, Worm, DropletIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { HyperText } from "@/components/ui/hyper-text";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";

export default function GamesPage() {
  const features = [
    {
      icon: DropletIcon,
      title: "Pond",
      description:
        "Reduce anxiety by playing a sensory game ",
      color: "from-rose-500/20",
      href: "/games/snake-game",
      delay: 0.2,
    },
    {
      icon: Snowflake,
      title: "Tic-Tac-Toe",
      description: "Play games, reduce your anxiety.",
      color: "from-amber-500/20",
      href: "games/tic-tac-toe",
      delay: 0.4,
    },
    {
      icon: Snowflake,
      title: "ColourPulse",
      description: "Talk to strangers, make friends, feel better.",
      color: "from-emerald-500/20",
      href: "/games/ColourPulse",
      delay: 0.6,
    },
    {
      icon: Snowflake,
      title: "Breathing",
      description: "Destress quickly.",
      color: "from-blue-500/20",
      href: "/games/relax",
      delay: 0.8,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] mt-20 flex flex-col items-center justify-center py-12 px-4 overflow-hidden">
        <InteractiveGridPattern className="z-30 w-full h-full opacity-75" />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-2xl -z-40" />
        <div className="relative z-50 flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-plus-jakarta tracking-tight">
            <span className="inline-block z-25 mt-2 bg-gradient-to-b from-foreground to-foreground/90 bg-clip-text text-transparent">
              <HyperText>Welcome to the Games Room</HyperText>
            </span>
          </h1>
          <p className="max-w-[600px] mx-auto text-base md:text-lg leading-relaxed tracking-wide text-muted-foreground">
            Come here to play some games with random strangers. idk what to say.
          </p>
        </div>
      </section>

      {/* Games Grid */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Our Games</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Link href={feature.href} className="block relative">
                  <Card className="group relative overflow-hidden border border-primary/10 hover:border-primary/20 transition-all duration-300 h-[200px] bg-card/30 backdrop-blur-sm cursor-pointer ripple">
                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color} to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                    />
                    {/* Card Header */}
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                          <feature.icon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-semibold tracking-tight text-foreground">
                          {feature.title}
                        </h3>
                      </div>
                    </CardHeader>
                    {/* Card Content */}
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    
    </div>
  );
}


