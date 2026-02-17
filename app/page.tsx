"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { motion } from "framer-motion";
import { Snowflake, ShieldCheck, Users, HeartHandshakeIcon, Heart, FootprintsIcon } from "lucide-react";
import { GamesButton } from "@/components/auth/games-button";

export default function Home() {
  const features = [
    {
      icon: HeartHandshakeIcon,
      title: "How we help",
      description:
        "We help connect users based on auditory visual response and provide a safe chatroom with icebreaker games to help users connect.",
      color: "from-rose-500/20",
      delay: 0.2,
    },
    {
      icon: Users,
      title: "Who we help",
      description:
        "We are an app designed by the young for the young. Young people struggle to open up emotionally, because of stigma around mental health and fear of lack of control. Our app aims to act as a bridge to help younger people become more open about mental health.",
      color: "from-amber-500/20",
      delay: 0.4,
    },
    {
      icon: FootprintsIcon,
      title: "We adjust to your comfort level",
      description:
        "Every step of the way, we prioritise your comfort. From choosing games that suit your sensory preferences to matching you with people who understand your needs, we ensure a supportive environment.",
      color: "from-emerald-500/20",
      delay: 0.6,
    },
    {
      icon: ShieldCheck,
      title: "Security",
      description:
        "Our apps aims to be secure but not invasive. We ask our users to verify their identity and we ensure chatrooms are safe.",
      color: "from-blue-500/20",
      delay: 0.8,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* hero section*/}

      <section className="relative min-h-[90vh] mt-20 flex flex-col items-center justify-center py-12 px-4">
        {/* Flickering Grid Background */}
        <div className="absolute inset-0 -z-30 w-full h-full pointer-events-none">
          <FlickeringGrid
            className="w-full h-full opacity-75"
            squareSize={4}
            gridGap={6}
            color="#60A5FA"
            maxOpacity={0.9}
            flickerChance={0.3}
          />
        </div>

        <div className="absolute inset-0 bg-background/60 backdrop-blur-2xl -z-40"></div>

        {/* Foreground content */}
        <div className="relative z-10 flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-plus-jakarta tracking-tight">
            <span className="inline-block mt-2 bg-gradient-to-b from-foreground to-foreground/90 bg-clip-text text-transparent">
              Break
            </span>
            <br />
            <span className="inline-block mt-2 bg-gradient-to-b from-foreground to-foreground/90 bg-clip-text text-transparent">
              The Ice
            </span>
          </h1>
          <GamesButton className="mt-4 px-6 py-3 text-lg md:text-xl font-medium bg-background hover:bg-background/50 text-primary border border-primary/30 hover:border-primary/50 rounded-lg transition-colors duration-300" />
        </div>
      </section>

      {/* ================= FEATURE GRID ================= */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
              Welcome
            </h2>
            <p className="text-foreground/90 max-w-2xl mx-auto font-medium text-lg">
              Welcome to Break the Ice, a platform which helps you manage anxiety and improve mental health through destimulating games and simplfied social interactions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="group relative overflow-hidden border border-primary/10 hover:border-primary/20 transition-all duration-300 h-full min-h-[260px] flex flex-col bg-card/30 backdrop-blur-sm">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  />
                  <CardHeader className="pb-4 flex-none">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                        <feature.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold tracking-tight text-foreground">
                        {feature.title}
                      </h3>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

