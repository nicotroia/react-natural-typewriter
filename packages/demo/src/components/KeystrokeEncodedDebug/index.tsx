import {
  faCheckCircle,
  faClipboard,
  faCopy,
  faSave,
  faTimesCircle,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/Button";
import { GhostButton } from "@/components/GhostButton";
import { Text } from "@/components/Text";
import { cx } from "@/helpers";
import { decodeKeystrokes, encodeKeystrokes } from "@core/helpers";
import { useCooldown } from "@core/hooks/useCooldown";

export type KeystrokeEncodedDebugProps = {
  keystrokes: string;
  onKeystrokesChange?: (keystrokes: string) => void;
  className?: string;
  children?: React.ReactNode;
};

const LOCALSTORAGE_KEY = "@nico/saved-keystrokes";

export const KeystrokeEncodedDebug: React.FC<
  KeystrokeEncodedDebugProps
> = props => {
  const { keystrokes, onKeystrokesChange, className } = props;

  const [savedKeystrokes, setSavedKeystrokes] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [copyReady, triggerCopied] = useCooldown(1000);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCALSTORAGE_KEY);
      if (saved) {
        setSavedKeystrokes(JSON.parse(saved));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(savedKeystrokes));
    } catch {
      // Ignore localStorage errors
    }
  }, [savedKeystrokes]);

  const handleSaveKeystrokes = () => {
    if (!keystrokes) return;
    const encodedKeystrokes = encodeKeystrokes(decodeKeystrokes(keystrokes));
    setSavedKeystrokes(prev => [...prev, encodedKeystrokes]);
  };

  const handleRemoveKeystrokes = (index: number) => () => {
    setSavedKeystrokes(prev => prev.filter((_, i) => i !== index));
  };

  const handleLoadSaved = (index: number) => () => {
    if (onKeystrokesChange) {
      onKeystrokesChange(savedKeystrokes[index]);
    }
  };

  const handleEncodedChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    if (onKeystrokesChange) {
      onKeystrokesChange(newValue);
    }
  };

  const handleCopySaved = (index: number) => () => {
    if (!navigator.clipboard) return;

    const encodedKeystrokes = encodeKeystrokes(
      decodeKeystrokes(savedKeystrokes[index])
    );

    navigator.clipboard.writeText(encodedKeystrokes).then(
      () => {
        setCopiedIndex(index);
        triggerCopied();
      },
      err => {
        console.error("Could not write to clipboard: ", err);
      }
    );
  };

  return (
    <div className={cx("flex flex-col gap-3 min-h-32 w-full", className)}>
      <div className="flex w-full items-center justify-between">
        <Text variant="code" size="md">
          Encoded
        </Text>
        <div className="flex flex-1 items-center justify-end gap-6">
          {/* Copy button */}
        </div>
      </div>

      <div className={cx("flex flex-col gap-4 items-start justify-start")}>
        <textarea
          className={cx(
            "w-full h-full resize-none",
            "border border-solid border-web-border-dim rounded-lg p-3 bg-web-content",
            "select-text min-h-7 w-full"
          )}
          aria-multiline
          rows={Math.max(2, keystrokes.split("\n").length)}
          value={keystrokes}
          onChange={handleEncodedChange}
          placeholder="Encoded keystrokes will appear here..."
        />
      </div>

      <Button
        disabled={!keystrokes}
        className=""
        onClick={handleSaveKeystrokes}>
        <span>
          <FontAwesomeIcon icon={faSave} className="mr-2" />
          Save Keystrokes
        </span>
      </Button>

      {savedKeystrokes.length > 0 ? (
        <div className="mt-4">
          <Text variant="code" size="md">
            Saved Keystrokes
          </Text>
          <div
            className={cx(
              "flex flex-col items-start justify-start mt-4 gap-4",
              "bg-web-secondary p-3 rounded-lg",
              "border border-web-border-dim border-solid"
            )}>
            {savedKeystrokes.map((encoded, index) => (
              <div
                key={index}
                className={cx(
                  "inline-flex flex-row items-center",
                  "w-full",
                  index !== savedKeystrokes.length - 1 &&
                    "border-b border-solid border-web-border-dim pb-4"
                )}>
                <div className="flex-1 max-h-14 overflow-scroll">
                  <Text variant="code" size="sm">
                    {encoded}
                  </Text>
                </div>
                <div className="w-36 flex flex-row items-center justify-end gap-3">
                  <GhostButton
                    onClick={handleLoadSaved(index)}
                    tooltipContent={"Load"}
                    tooltipId={`load-saved-${index}`}>
                    <FontAwesomeIcon icon={faClipboard} />
                  </GhostButton>
                  <GhostButton
                    onClick={handleCopySaved(index)}
                    tooltipContent={
                      !copyReady && copiedIndex === index ? "Copied" : "Copy"
                    }
                    tooltipId={`copy-saved-${index}`}>
                    {!copyReady && copiedIndex === index ? (
                      <FontAwesomeIcon icon={faCheckCircle} />
                    ) : (
                      <FontAwesomeIcon icon={faCopy} />
                    )}
                  </GhostButton>
                  <GhostButton
                    className=" min-w-input-xs"
                    onClick={handleRemoveKeystrokes(index)}
                    tooltipContent={"Remove"}
                    tooltipId={`remove-keystrokes-${index}`}>
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      className="size-[18px]"
                    />
                  </GhostButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
