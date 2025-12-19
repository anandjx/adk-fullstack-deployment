// "use client";

// import { LandingHero } from "./LandingHero";
// import { landingConfig } from "@/lib/landing-config";
// import { useChatContext } from "./ChatProvider";
// import { MessageList } from "./MessageList";
// import { EmptyState } from "./EmptyState";

// /**
//  * ChatContent - now includes landing hero screen
//  */
// export function ChatContent(): React.JSX.Element {
//   const { messages } = useChatContext();

//   const hasMessages = messages && messages.length > 0;

//   return (
//     <div className="flex flex-col w-full h-full">

//       {/* Landing Hero (only show when no messages yet) */}
//       {!hasMessages && (
//         <div className="flex justify-center w-full">
//           <LandingHero
//             title={landingConfig.title}
//             subtitle={landingConfig.subtitle}
//             features={landingConfig.features}
//           />
//         </div>
//       )}

//       {/* Message List (show AFTER first message) */}
//       {hasMessages ? <MessageList /> : null}
//     </div>
//   );
// }

"use client";

import { LandingHero } from "./LandingHero";
import { landingConfig } from "@/lib/landing-config";
import { useChatContext } from "./ChatProvider";
import { MessageList } from "./MessageList";

export function ChatContent(): React.JSX.Element {
  // Fix: Extract ALL data needed for the message list from context
  const { messages, messageEvents, isLoading, scrollAreaRef } = useChatContext();

  const hasMessages = messages && messages.length > 0;

  return (
    <div className="flex flex-col w-full h-full">
      {!hasMessages && (
        <div className="flex justify-center w-full">
          <LandingHero
            title={landingConfig.title}
            subtitle={landingConfig.subtitle}
            features={landingConfig.features}
          />
        </div>
      )}

      {/* Fix: Pass the data as props to MessageList */}
      {hasMessages ? (
        <MessageList 
          messages={messages} 
          messageEvents={messageEvents} 
          isLoading={isLoading} 
          scrollAreaRef={scrollAreaRef}
        />
      ) : null}
    </div>
  );
}