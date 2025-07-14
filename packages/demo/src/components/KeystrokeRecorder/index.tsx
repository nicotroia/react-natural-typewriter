import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  InputHTMLAttributes,
  KeyboardEvent,
  useRef,
  useState,
} from "react";

import { GhostButton } from "@/components/GhostButton";
import { Text } from "@/components/Text";
import { TextInput } from "@/components/TextInput";
import { cx } from "@/helpers";
import { encodeKeystrokes } from "@core/helpers";
import { Keystroke } from "@core/types";

export type TypingRecorderProps = {
  keystrokes?: string;
  onComplete: (result: string) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export const KeystrokeRecorder: React.FC<TypingRecorderProps> = props => {
  const { keystrokes, onComplete, ...rest } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const keystrokesRef = useRef<Keystroke[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Tab") return;

    const key = event.key === "Backspace" ? "<BACKSPACE>" : event.key;
    keystrokesRef.current = [
      ...keystrokesRef.current,
      { key, time: new Date().getTime() - startTime },
    ];
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFocus = () => {
    keystrokesRef.current = [];
    setStartTime(new Date().getTime());
    // setIsFocused(true);
  };

  const handleBlur = () => {
    const encodedKeystrokes = encodeKeystrokes(keystrokesRef.current);

    if (keystrokes === encodedKeystrokes) return;

    setTimeout(() => onComplete(encodedKeystrokes), 1);
  };

  const handleClear = () => {
    onComplete("");
    setInputValue("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-3 max-w-96">
      <div className="flex w-full items-center justify-between">
        <Text variant="code" size="md">
          Input
        </Text>
      </div>
      <div className={cx("flex flex-row gap-3 items-start justify-start")}>
        <TextInput
          ref={inputRef}
          type="text"
          placeholder="Type something..."
          {...rest}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <GhostButton
          disabled={!inputValue}
          onClick={handleClear}
          tooltipContent={"Clear"}
          tooltipId="clear-keystrokes">
          <FontAwesomeIcon icon={faXmarkCircle} />
        </GhostButton>
      </div>
    </div>
  );
};
