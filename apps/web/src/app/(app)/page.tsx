"use client";

// import { Thread } from "@/components/thread";
// import { StreamProvider } from "@/providers/Stream";
// import { ThreadProvider } from "@/providers/Thread";
// import { ArtifactProvider } from "@/components/thread/artifact";
// import { Toaster } from "@/components/ui/sonner";
// import { Navbar } from "@/components/navbar";
import React from "react";

export default function DemoPage(): React.ReactNode {
  return (
    <React.Suspense fallback={<div>Loading (layout)...</div>}>
      {/* <Toaster />
      <Navbar />
      <ThreadProvider>
        <StreamProvider>
          <ArtifactProvider>
            <Thread />
          </ArtifactProvider>
        </StreamProvider>
      </ThreadProvider> */}
      <div style={{ padding: "2rem" }}>
        <h1 style={{ fontSize: "24px" }}>Welcome to Prompt Scorer 👋</h1>
        <p>This is a placeholder for your homepage. You can customize it later.</p>
      </div>
    </React.Suspense>
  );
}
