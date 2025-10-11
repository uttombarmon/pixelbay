"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function PersonalizedSuggestions() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.API_URL}/api/suggestions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full bg-gradient-to-r to-red-800/50 from-black/50 text-white py-16 px-6 md:px-12 lg:px-20 mx-auto">
      <div className="grid lg:grid-cols-2 items-center gap-10 max-w-6xl mx-auto">
        {/* Left: Image */}
        <div className="relative h-64 sm:h-80 lg:h-[400px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1526406915894-7bcd65f60845?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjE4fHxMaWZlc3R5bGUlMjB3aXRoJTIwR2FkZ2V0c3xlbnwwfHwwfHx8MA%3D%3D"
            alt="Personalized suggestions"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right: Text + Form */}
        <Card className="bg-white/10 border-0 text-white backdrop-blur-md shadow-xl p-8 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Get Personalized Suggestions ✨
          </h2>
          <p className="mb-6 text-white/80">
            Drop your email and we’ll send you hand-picked gadget
            recommendations just for you.
          </p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-black dark:text-white flex-1"
              />
              <Button
                type="submit"
                disabled={loading}
                className="bg-yellow-400 text-black font-semibold hover:bg-yellow-500"
              >
                {loading ? "Sending..." : "Get Suggestions"}
              </Button>
            </form>
          ) : (
            <p className="text-green-300 font-medium">
              ✅ Thanks! You’ll receive your personalized picks soon.
            </p>
          )}
        </Card>
      </div>
    </section>
  );
}
