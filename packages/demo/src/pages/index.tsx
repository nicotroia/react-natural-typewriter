import React, { useState } from "react";

import { Footer } from "@/components/Footer";
import { KeystrokeEncodedDebug } from "@/components/KeystrokeEncodedDebug";
import { KeystrokePlaybackDebug } from "@/components/KeystrokePlaybackDebug";
import { KeystrokeRecorder } from "@/components/KeystrokeRecorder";
import { cx } from "@/helpers";

export type NextIndexPageProps = {};

export const NextIndexPage: React.FC<NextIndexPageProps> = () => {
  const [keystrokes, setKeystrokes] = useState<string>("");
  const [speed, setSpeed] = useState<number>(1.2);

  return (
    <div className={cx("flex flex-col container relative mx-auto pt-12 gap-8")}>
      <div className="flex flex-col gap-8 min-h-[calc(100vh-10rem)]">
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
      <Footer />
    </div>
  );
};

export default NextIndexPage;
