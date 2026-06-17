"use client";
import { lazy, Suspense } from "react";

const GlobalScene = lazy(() => import("./GlobalScene"));

export default function GlobalSceneWrapper() {
  return (
    <Suspense fallback={null}>
      <GlobalScene />
    </Suspense>
  );
}

