"use client";

import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";

export function RootWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
