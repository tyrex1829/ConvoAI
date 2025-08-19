import React from "react";
import SignUp from "@/components/sign-up";

export default function page() {
  return (
    <div className="min-h-screen w-full relative bg-black">
      {/* Magenta Nebula Background with Top Glow */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(236, 72, 153, 0.25), transparent 70%), #000000",
        }}
      />

      {/* Your Content/Components */}
      <div className="relative">
        <SignUp />
      </div>
    </div>
  );
}
