import React, { useState } from "react";

import { KeystrokeEncodedDebug } from "@/components/KeystrokeEncodedDebug";
import { KeystrokePlaybackDebug } from "@/components/KeystrokePlaybackDebug";
import { KeystrokeRecorder } from "@/components/KeystrokeRecorder";
import { cx } from "@/helpers";

export type NextIndexPageProps = {};

export const NextIndexPage: React.FC<NextIndexPageProps> = () => {
  const [keystrokes, setKeystrokes] = useState<string>("");
  const [speed, setSpeed] = useState<number>(1.2);

  return (
    <div className={cx("flex flex-col container relative mx-auto py-14 gap-8")}>
      <KeystrokeRecorder keystrokes={keystrokes} onComplete={setKeystrokes} />
      <KeystrokePlaybackDebug
        keystrokes={keystrokes}
        speed={speed}
        onSpeedChange={setSpeed}
      />
      <KeystrokeEncodedDebug
        keystrokes={keystrokes}
        onKeystrokesChange={setKeystrokes}
      />
    </div>
  );
};

export default NextIndexPage;
