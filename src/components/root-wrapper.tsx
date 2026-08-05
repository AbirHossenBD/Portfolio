// Path: src/components/root-wrapper.tsx
"use client";

import { ReactNode } from "react";

export function RootWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}