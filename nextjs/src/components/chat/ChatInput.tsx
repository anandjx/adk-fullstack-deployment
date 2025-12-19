"use client";

import { InputForm } from "@/components/InputForm";
import { useChatContext } from "@/components/chat/ChatProvider";

/**
 * Futuristic Intsemble ChatInput
 * - Glassmorphic floating bar
 * - Neon holo border
 * - Animated glow effects
 * - Upgraded to match the new Intsemble design system
 */
export function ChatInput(): React.JSX.Element {
  const { handleSubmit, isLoading } = useChatContext();

  return (
    <div
      className="
        relative z-30 flex-shrink-0 glass-panel backdrop-blur-2xl
        border-t border-white/10 shadow-[0_-8px_32px_rgba(0,0,0,0.45)]
      "
    >
      {/* Hologram animated strip */}
      <div className="absolute inset-0 animate-holoFlow opacity-20 pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto w-full p-5 pb-6">

        {/* Futuristic glowing outline */}
        <div className="absolute inset-0 rounded-2xl holo-outline pointer-events-none"></div>

        <InputForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          context="chat"
        />
      </div>
    </div>
  );
}
