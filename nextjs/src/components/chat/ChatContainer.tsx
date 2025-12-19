// nextjs/src/components/chat/ChatContainer.tsx
"use client";

import { ChatContent } from "./ChatContent";
import { ChatInput } from "./ChatInput";
import { ChatHeader } from "./ChatHeader";

export function ChatContainer(): React.JSX.Element {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#05070c] via-[#0b0f19] to-[#05070c]">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto relative">
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl pointer-events-none"></div>

        <ChatContent />
      </div>

      <div className="border-t border-white/10 bg-white/[0.05] backdrop-blur-xl p-3">
        <ChatInput />
      </div>
    </div>
  );
}
