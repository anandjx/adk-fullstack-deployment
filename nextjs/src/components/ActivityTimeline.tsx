// nextjs/src/components/ActivityTimeline.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Loader2,
  Activity,
  Info,
  Search,
  Brain,
  Pen,
  ChevronDown,
  ChevronUp,
  Code,
  FileText,
} from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export interface ProcessedEvent {
  title: string;
  data: unknown;
}

interface ActivityTimelineProps {
  processedEvents: ProcessedEvent[];
  isLoading: boolean;
}

export function ActivityTimeline({
  processedEvents,
  isLoading,
}: ActivityTimelineProps): React.JSX.Element {
  const [isTimelineCollapsed, setIsTimelineCollapsed] =
    useState<boolean>(false);

  /* =========================================
     DATA FORMATTERS (unchanged logic)
     ========================================= */
  const formatEventData = (data: unknown): string => {
    if (typeof data === "object" && data !== null && "type" in data) {
      const typedData = data as {
        type: string;
        content?: unknown;
        name?: string;
        args?: unknown;
        response?: unknown;
      };
      switch (typedData.type) {
        case "functionCall":
          return `Calling function: ${typedData.name}\nArguments: ${JSON.stringify(
            typedData.args,
            null,
            2
          )}`;
        case "functionResponse":
          return `Function ${typedData.name} response:\n${JSON.stringify(
            typedData.response,
            null,
            2
          )}`;
        case "text":
          return String(typedData.content || "");
        case "sources":
          const sources = typedData.content as Record<
            string,
            { title: string; url: string }
          >;
          if (Object.keys(sources).length === 0) {
            return "No sources found.";
          }
          return Object.values(sources)
            .map(
              (source) =>
                `[${source.title || "Untitled Source"}](${source.url})`
            )
            .join(", ");
        case "thinking":
          return String(typedData.content || "");
        default:
          return JSON.stringify(data, null, 2);
      }
    }

    if (typeof data === "string") {
      try {
        const parsed = JSON.parse(data);
        return JSON.stringify(parsed, null, 2);
      } catch {
        return data;
      }
    } else if (Array.isArray(data)) {
      return data.join(", ");
    } else if (typeof data === "object" && data !== null) {
      return JSON.stringify(data, null, 2);
    }
    return String(data);
  };

  const isJsonData = (data: unknown): boolean => {
    if (typeof data === "object" && data !== null && "type" in data) {
      const typedData = data as { type: string };
      if (typedData.type === "thinking" || typedData.type === "sources") {
        return false;
      }
      return (
        typedData.type === "functionCall" ||
        typedData.type === "functionResponse"
      );
    }

    if (typeof data === "string") {
      try {
        JSON.parse(data);
        return true;
      } catch {
        return false;
      }
    }

    return typeof data === "object" && data !== null;
  };

  /* =========================================
     ICON SELECTION
     ========================================= */
  const getEventIcon = (title: string) => {
    if (title.includes("Function Call")) return <Code className="h-4 w-4" />;
    if (title.includes("Function Response"))
      return <FileText className="h-4 w-4" />;
    if (title.includes("Sources") || title.includes("Research"))
      return <Search className="h-4 w-4" />;
    if (title.includes("Planning") || title.includes("Strategy"))
      return <Brain className="h-4 w-4" />;
    if (title.includes("Processing") || title.includes("Analysis"))
      return <Activity className="h-4 w-4" />;
    if (title.includes("Writing") || title.includes("Report"))
      return <Pen className="h-4 w-4" />;
    if (title.includes("Thinking") || title.startsWith("🤔"))
      return <Brain className="h-4 w-4" />;
    return <Info className="h-4 w-4" />;
  };

  const getEventColor = (title: string): string => {
    if (title.includes("Function Call")) return "text-cyan-400";
    if (title.includes("Function Response")) return "text-emerald-400";
    if (title.includes("Sources") || title.includes("Research"))
      return "text-purple-300";
    if (title.includes("Planning") || title.includes("Strategy"))
      return "text-yellow-400";
    if (title.includes("Processing") || title.includes("Analysis"))
      return "text-orange-400";
    if (title.includes("Writing") || title.includes("Report"))
      return "text-pink-400";
    if (title.includes("Thinking") || title.startsWith("🤔"))
      return "text-cyan-300";
    return "text-neutral-400";
  };

  /* =========================================
     RENDER
     ========================================= */
  return (
    <div className="w-full mb-4">
      {/* Main glass card */}
      <Card className="glass-card border-white/10">
        <CardHeader className="pb-3 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-cyan-300 glow-ring" />
              <CardDescription className="text-neutral-300 font-medium tracking-wide">
                AI Activity Timeline
              </CardDescription>
            </div>

            <button
              onClick={() => setIsTimelineCollapsed(!isTimelineCollapsed)}
              className="p-1 rounded-md bg-white/[0.03] hover:bg-white/[0.07] backdrop-blur-md border border-white/[0.1]"
            >
              {isTimelineCollapsed ? (
                <ChevronDown className="h-4 w-4 text-neutral-300" />
              ) : (
                <ChevronUp className="h-4 w-4 text-neutral-300" />
              )}
            </button>
          </div>
        </CardHeader>

        {!isTimelineCollapsed && (
          <CardContent className="pt-0">
            <ScrollArea className="h-48">
              <div className="space-y-3 pr-4">
                {processedEvents.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.04] border border-white/[0.06] backdrop-blur-xl"
                  >
                    <div className={`mt-0.5 ${getEventColor(event.title)}`}>
                      {getEventIcon(event.title)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-sm font-medium ${getEventColor(
                          event.title
                        )}`}
                      >
                        {event.title}
                      </div>

                      <div className="text-xs text-neutral-400 mt-1">
                        {isJsonData(event.data) ? (
                          <pre className="whitespace-pre-wrap font-mono text-xs text-cyan-100/90">
                            {formatEventData(event.data)}
                          </pre>
                        ) : (
                          <div className="prose prose-invert prose-xs">
                            <ReactMarkdown>
                              {formatEventData(event.data)}
                            </ReactMarkdown>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Loader */}
                {isLoading && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
                    <Loader2 className="h-4 w-4 animate-spin text-cyan-300" />
                    <div className="text-sm text-neutral-400">
                      AI is processing...
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {processedEvents.length === 0 && !isLoading && (
                  <div className="text-center py-4 text-neutral-500 text-sm">
                    Activity will appear here as the AI processes your request
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
