"use client";

import Image from "next/image";

export default function PartnersPage() {
  return (
    <main className="min-h-screen px-6 py-16 bg-background">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-10">Our Partners</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Logo Slot 1 */}
          <div className="w-full h-40 relative border border-primary/20 rounded-xl flex items-center justify-center bg-card/40">
            {/* Replace the src URL below with your own */}
            <Image
              src="/public/YCS.png.avif" // paste your own path
              alt="Partner Logo 1"
              fill
              className="object-contain p-4"
            />
          </div>

          {/* Logo Slot 2 */}
          <div className="w-full h-40 relative border border-primary/20 rounded-xl flex items-center justify-center bg-card/40">
            <Image
              src="/public/SAC.png" // paste your own path
              alt="Partner Logo 2"
              fill
              className="object-contain p-4"
            />
          </div>

          {/* Logo Slot 3 */}
          <div className="w-full h-40 relative border border-primary/20 rounded-xl flex items-center justify-center bg-card/40">
            <Image
              src="/public/NYC.png" // paste your own path
              alt="Partner Logo 3"
              fill
              className="object-contain p-4"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
