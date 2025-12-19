import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Flourish UI",
  description: "every learner deserves a path",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* =====================================================
            INTSEMBLE FUTURISTIC ANIMATED BACKGROUND LAYERS
            ===================================================== */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">

          {/* Soft radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.18),transparent_70%)] animate-pulse-slow" />

          {/* Moving hologram vertical grid */}
          <div className="absolute inset-0 
            bg-[linear-gradient(90deg,transparent_96%,rgba(255,255,255,0.05)_100%)] 
            bg-[length:4px_100%] 
            opacity-20 
            animate-grid-move" 
          />

          {/* Moving hologram horizontal grid */}
          <div className="absolute inset-0 
            bg-[linear-gradient(0deg,transparent_96%,rgba(255,255,255,0.06)_100%)] 
            bg-[length:100%_4px] 
            opacity-20 
            animate-grid-move-vertical" 
          />

          {/* Floating particles */}
          <div className="absolute inset-0 opacity-40 animate-pulse-slow">
            <div className="w-1 h-1 rounded-full bg-cyan-300/40 absolute top-1/3 left-1/4 blur-sm animate-float" />
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400/40 absolute top-1/2 left-2/3 blur-sm animate-float-delayed" />
            <div className="w-1 h-1 rounded-full bg-emerald-400/40 absolute top-[70%] left-[40%] blur-sm animate-float-slow" />
          </div>
        </div>

        {/* =====================================================
            THEME + APP WRAPPER
            ===================================================== */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
