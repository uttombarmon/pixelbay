"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export function PersonalizedSuggestions() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/suggestions`, {
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
    <section className="py-20 px-4 md:px-8">
      <Card className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-3xl border-0 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-red-900 to-black opacity-95"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -ml-48 -mb-48"></div>

        <div className="relative z-10 grid lg:grid-cols-2 items-center">
          {/* Left: Image */}
          <div className="relative h-[300px] lg:h-[500px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1526406915894-7bcd65f60845?w=800&auto=format&fit=crop&q=80"
              alt="Personalized suggestions"
              fill
              className="object-cover opacity-80"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:hidden"></div>
          </div>

          {/* Right: Text + Form */}
          <div className="p-8 md:p-12 lg:p-16 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-red-400 text-sm font-bold mb-6">
              <Sparkles className="w-4 h-4" /> Smart Recommendations
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
              Get Tech Tailored <br />
              <span className="text-red-500">For Your Lifestyle</span>
            </h2>
            <p className="mb-8 text-gray-300 text-lg leading-relaxed max-w-md">
              Join 10,000+ tech lovers. We’ll analyze your interests and send you hand-picked gadget deals every week.
            </p>

            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 h-14 rounded-xl focus:ring-red-500 focus:border-red-500"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold h-14 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-red-900/40"
                >
                  {loading ? "Joining..." : "Get Started"}
                </Button>
              </form>
            ) : (
              <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl">
                <p className="text-green-400 font-bold text-xl mb-2">
                  You're on the list!
                </p>
                <p className="text-green-400/80">
                  Welcome to the future of gadget shopping. Your first set of recommendations is on its way.
                </p>
              </div>
            )}

            <p className="mt-8 text-xs text-gray-500 italic">
              *By signing up, you agree to receive marketing emails. No spam, only tech.
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
}
