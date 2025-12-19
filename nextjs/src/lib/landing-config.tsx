import { Target, ListChecks, Sparkles } from "lucide-react";

export const landingConfig = {
  title: "Flourish AI",
  subtitle: "Because every learner deserves a path.",
  features: [
    {
      icon: <Target className="text-emerald-400 h-8 w-8" />,
      title: "Learning Goals",
      description: "Define and refine your learning roadmap.",
    },
    {
      icon: <ListChecks className="text-cyan-400 h-8 w-8" />,
      title: "Task Breakdown",
      description: "Clear steps and structured progress milestones.",
    },
    {
      icon: <Sparkles className="text-purple-400 h-8 w-8" />,
      title: "Growth Path",
      description: "Personalized guidance as you evolve.",
    },
  ],
};
