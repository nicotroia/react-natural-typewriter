import React from "react";

type useCooldownType = (cooldownTime?: number) => [boolean, () => void];

export const useCooldown: useCooldownType = (cooldownTime: number = 500) => {
  const [ready, setReady] = React.useState(true);
  const timerRef = React.useRef<number | null>(null);

  const trigger = () => {
    if (timerRef.current) {
      // Clear existing timer if it's already running
      window.clearTimeout(timerRef.current);
    }
    // Set the state to not ready
    setReady(false);
    // Start the cooldown timer
    timerRef.current = window.setTimeout(() => {
      setReady(true);
      timerRef.current = null; // Clear the reference
    }, cooldownTime);
  };

  return [ready, trigger];
};
