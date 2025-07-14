import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { GhostButton } from "@/components/GhostButton";
import { Text } from "@/components/Text";
import { TextInput } from "@/components/TextInput";
import { cx } from "@/helpers";
import { KeystrokePlayback } from "@core/components/KeystrokePlayback";

export type KeystrokePlaybackDebugProps = {
  keystrokes: string;
  speed?: number;
  onSpeedChange?: (speed: number) => void;
  className?: string;
};

export const KeystrokePlaybackDebug = forwardRef(
  (props: KeystrokePlaybackDebugProps, ref) => {
    const {
      keystrokes: encodedKeystrokes,
      speed = 1.0,
      className,
      onSpeedChange,
    } = props;

    const playbackRef = useRef<any>(null);
    const [speedInput, setSpeedInput] = useState(String(speed));

    useImperativeHandle(
      ref,
      () => ({
        restart: () => {
          playbackRef.current?.restart();
        },
      }),
      []
    );

    useEffect(() => {
      setSpeedInput(String(speed.toFixed(1)));
    }, [speed]);

    const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSpeedInput(value);
      const newSpeed = parseFloat(value);

      if (value === "" || value.endsWith(".")) return;
      if (!isNaN(newSpeed) && newSpeed > 0) {
        const roundedSpeed = Math.round(newSpeed * 10) / 10;
        onSpeedChange?.(roundedSpeed);
      } else {
        onSpeedChange?.(1.0);
      }
    };

    const handleRefresh = () => {
      playbackRef.current?.restart();
    };

    return (
      <div className="flex flex-col gap-3 min-h-32 w-full">
        <div className="flex w-full items-center justify-between">
          <Text variant="code" size="md">
            Preview
          </Text>
          <div className="flex flex-1 items-center justify-end gap-3">
            <TextInput
              label="Speed (1.0x)"
              containerClassName="w-auto self-end"
              value={speedInput}
              onChange={handleSpeedChange}
              type="number"
              step="0.1"
            />
            <GhostButton
              onClick={handleRefresh}
              disabled={!encodedKeystrokes}
              tooltipContent="Run animation"
              tooltipId="keystroke-playback-refresh">
              <FontAwesomeIcon icon={faPlayCircle} />
            </GhostButton>
          </div>
        </div>
        <div
          className={cx(
            "flex flex-1 flex-col gap-3",
            "bg-web-secondary p-4 rounded-lg",
            "border border-web-border-dim border-solid"
          )}>
          <Text variant="code" size="lg">
            <KeystrokePlayback
              ref={playbackRef}
              keystrokes={encodedKeystrokes}
              speed={speed}
              className={cx("flex flex-col gap-4 select-none", className)}
            />
          </Text>
        </div>
      </div>
    );
  }
);
