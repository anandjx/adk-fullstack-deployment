// C:\Users\anand\Deployementrepo\adk-fullstack-deploy-tutorial\nextjs\src\components\chat\ChatHeader.tsx

"use client";

import Image from "next/image";
import { UserIdInput } from "@/components/chat/UserIdInput";
import { SessionSelector } from "@/components/chat/SessionSelector";
import { useChatContext } from "@/components/chat/ChatProvider";

/**
 * Intsemble Futuristic ChatHeader
 * - Neon hologram background
 * - Glowing animated brain logo
 * - Neural pulse rings
 * - Floating particles
 * - Preserves ALL logic exactly
 */
export function ChatHeader(): React.JSX.Element {
  const {
    userId,
    sessionId,
    handleUserIdChange,
    handleUserIdConfirm,
    handleSessionSwitch,
    handleCreateNewSession,
  } = useChatContext();

  return (
    <div className="relative z-30 border-b border-white/10 overflow-hidden">

      {/* =====================================================
          Hologram Gradient Background + Particles
          ===================================================== */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.35),rgba(0,0,0,0.65))] backdrop-blur-xl">
        <div className="absolute inset-0 animate-holoFlow opacity-50"></div>
      </div>

      {/* Floating header particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="particle particle-cyan"></div>
        <div className="particle particle-purple"></div>
        <div className="particle particle-green"></div>
      </div>

      {/* =====================================================
          HEADER CONTENT
          ===================================================== */}
      <div className="relative flex items-center justify-between max-w-6xl mx-auto py-4 px-4">

        {/* LEFT SIDE — Branding */}
        <div className="flex items-center gap-4">

          {/* ============ Neon Brain Logo + Neural Pulses ============ */}
          <div className="relative h-14 w-14 flex items-center justify-center">

            {/* Neural Pulses */}
            <div className="absolute inset-0 rounded-2xl neural-pulse-ring"></div>
            <div className="absolute inset-0 rounded-2xl neural-pulse-ring2"></div>

            {/* Logo Frame */}
            <div className="h-14 w-14 rounded-2xl glass-strong overflow-hidden 
                            relative border border-cyan-400/30 shadow-2xl animate-orbPulse">
              <Image
                src="/intsemble-brain.png"
                alt="Intsemble Brain"
                width={56}
                height={56}
                className="object-cover w-full h-full rounded-2xl logo-neon"
              />
            </div>

            {/* Hologram Ring */}
            <div className="absolute inset-0 rounded-2xl hologram-ring"></div>
          </div>

          {/* Title Text */}
          <div>
            <h1 className="text-xl font-semibold neon-text-cyan tracking-wide">
              Flourish AI
            </h1>
            <p className="text-xs text-slate-400 italic">because every learner deserves a path</p>
          </div>
        </div>

        {/* RIGHT SIDE — User + Session Controls */}
        <div className="flex items-center gap-4">
          <UserIdInput
            currentUserId={userId}
            onUserIdChange={handleUserIdChange}
            onUserIdConfirm={handleUserIdConfirm}
            className="text-xs"
          />

          {userId && (
            <SessionSelector
              currentUserId={userId}
              currentSessionId={sessionId}
              onSessionSelect={handleSessionSwitch}
              onCreateSession={handleCreateNewSession}
              className="text-xs"
            />
          )}
        </div>
      </div>
    </div>
  );
}
