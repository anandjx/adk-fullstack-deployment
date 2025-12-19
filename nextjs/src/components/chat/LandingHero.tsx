"use client";

import { sparkles } from "lucide-react"; // optional icons
import React from "react";

interface LandingHeroProps {
  title: string;
  subtitle: string;
  features: {
    icon?: React.ReactNode;
    title: string;
    description: string;
  }[];
}

export function LandingHero({
  title,
  subtitle,
  features,
}: LandingHeroProps): React.JSX.Element {
  return (
    <div className="flex flex-col items-center text-center mt-20 px-6 animate-fadeIn">

      {/* TITLE */}
      <h1 className="text-4xl font-bold neon-text-cyan mb-2">
        {title}
      </h1>

      {/* SUBTITLE */}
      <p className="text-slate-300 max-w-xl text-sm mb-10">
        {subtitle}
      </p>

      {/* FEATURE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full">
        {features.map((f, i) => (
          <div
            key={i}
            className="
              glass-card p-4 rounded-xl
              hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(56,189,248,0.35)]
              transition-all cursor-default
            "
          >
            <div className="mb-3 flex justify-center text-cyan-300 text-3xl">
              {f.icon}
            </div>
            <h3 className="font-semibold text-slate-200 mb-1">{f.title}</h3>
            <p className="text-slate-400 text-xs">{f.description}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-xs text-slate-500">
        Start a conversation below to begin →
      </p>
    </div>
  );
}
