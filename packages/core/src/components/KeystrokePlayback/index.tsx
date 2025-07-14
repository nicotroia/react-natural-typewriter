import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import { decodeKeystrokes, normalizeKeystrokes } from "@core/helpers";
import { useCooldown } from "@core/hooks/useCooldown";
import { Keystroke } from "@core/types";

export type KeystrokePlaybackProps = {
  keystrokes: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
};

export const KeystrokePlayback = forwardRef(
  (props: KeystrokePlaybackProps, ref) => {
    const {
      keystrokes: encodedKeystrokes,
      speed = 1.0,
      delay = 0.0,
      onComplete,
    } = props;

    const keystrokes = decodeKeystrokes(encodedKeystrokes);

    const [refreshReady, triggerRefresh] = useCooldown(100);
    const [displayedText, setDisplayedText] = useState("");
    const [timeouts, setTimeouts] = useState<NodeJS.Timeout[]>([]);

    useImperativeHandle(
      ref,
      () => ({
        restart: () => {
          setDisplayedText("");
          triggerRefresh();
        },
      }),
      [triggerRefresh]
    );

    useEffect(() => {
      setDisplayedText("");

      const doAnimation = async () => {
        timeouts.forEach(timeout => clearTimeout(timeout));

        if (keystrokes.length === 0) {
          return;
        }

        const filteredKeystrokes = keystrokes.filter(
          (keystroke: Keystroke) =>
            ![
              "Meta",
              "Control",
              "Alt",
              "Shift",
              "ArrowUp",
              "ArrowDown",
              "ArrowLeft",
              "ArrowRight",
            ].includes(keystroke.key)
        );
        const normalizedKeystrokes = normalizeKeystrokes(
          filteredKeystrokes,
          speed
        );
        let newTimeouts: NodeJS.Timeout[] = [];

        const startAnimation = () => {
          normalizedKeystrokes.forEach((stroke: Keystroke, idx: number) => {
            const isLast = idx === normalizedKeystrokes.length - 1;
            const timeout = setTimeout(() => {
              setDisplayedText(text =>
                stroke.key === "<BACKSPACE>"
                  ? text.slice(0, -1)
                  : text + stroke.key
              );
              if (isLast && typeof onComplete === "function") {
                onComplete();
              }
            }, stroke.time);
            newTimeouts.push(timeout);
          });

          setTimeouts(newTimeouts);
        };

        if (delay > 0) {
          const delayTimeout = setTimeout(startAnimation, delay);
          newTimeouts.push(delayTimeout);
        } else {
          startAnimation();
        }
      };

      if (refreshReady) doAnimation();
      else {
        timeouts.forEach(timeout => clearTimeout(timeout));
        setDisplayedText("");
      }

      return () => {
        setDisplayedText("");
        timeouts.forEach(timeout => clearTimeout(timeout));
      };
    }, [speed, refreshReady, delay, encodedKeystrokes]);

    return displayedText;
  }
);
