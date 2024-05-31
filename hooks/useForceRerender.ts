"use client";
import { useState } from "react";

export default function useForceRerender() {
  const [_, setTick] = useState(0);

  const forceRerender = () => {
    setTick((tick) => tick + 1);
  };

  return {
    key: _,
    forceRerender,
  };
}
