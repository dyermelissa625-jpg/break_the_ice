"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";

export default function AboutPage() {
  return (
    <div className="flex justify-center px-4 pt-32 pb-20 min-h-screen">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl"
      >
        <Card className="bg-background backdrop-blur-xl border border-primary/20 shadow-xl z-40">
          <CardHeader className="pb-4 text-center">
            <CardTitle className="text-4xl font-bold bg-background text-transparent">
              Contact Support
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-10 text-foreground/90 text-lg leading-relaxed">

            {/* Emergency Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-primary">
                1. Immediate Emergency (Highest Urgency)
              </h2>

              <div className="space-y-2">
                <p>
                  <strong>995 — SCDF Ambulance</strong><br />
                  For life-threatening situations where safety is immediately at risk.
                </p>

                <p>
                  <strong>999 — Police Emergency Line</strong><br />
                  For immediate danger, threats, harm, or criminal risk.
                </p>
              </div>
            </section>

            <div className="border-b border-primary/20" />

            {/* Crisis Hotlines */}
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-primary">
                2. 24/7 Crisis Hotlines (High Urgency)
              </h2>

              <div className="space-y-3">
                <p>
                  <strong>IMH Mental Health Helpline — 6389 2222</strong><br />
                  24/7 support for severe emotional distress or urgent mental-health concerns.
                </p>

                <p>
                  <strong>Samaritans of Singapore (SOS) — 1767</strong><br />
                  A 24/7 hotline for people in acute distress.
                </p>

                <p>
                  <strong>SOS CareText WhatsApp — 9151 1767</strong><br />
                  Text-based support for people in distress. Not for emergencies, but still crisis-level.
                </p>
              </div>
            </section>

            <div className="border-b border-primary/20" />

            {/* Non-Emergency Support */}
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-primary">
                3. Non-Emergency Support & Counselling
              </h2>

              <div className="space-y-3">
                <p>
                  <strong>SAMH — 1800 283 7019</strong><br />
                  Emotional support, mental-health guidance, and general assistance.
                </p>

                <p>
                  <strong>Care Corner Counselling (Mandarin) — 1800 3535 800</strong><br />
                  Available 10am–10pm for emotional distress, family issues, or mental-health needs.
                </p>
              </div>
            </section>

          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
