import { Keystroke } from "@core/types";

export const encodeKeystrokes = (keystrokes: Keystroke[]): string => {
  return keystrokes.map(({ key, time }) => `${key}:${time}`).join("|");
};

export const decodeKeystrokes = (encoded: string): Keystroke[] => {
  if (typeof encoded !== "string" || encoded.length === 0) return [];

  return encoded.split("|").map(entry => {
    const [key, time] = entry.split(":");
    return { key, time: parseFloat(time) };
  });
};

export const normalizeKeystrokes = (
  keystrokes: Keystroke[],
  factor: number
): Keystroke[] => {
  if (keystrokes.length === 0) return [];

  let cumulativeTime = 0;

  return keystrokes.map((stroke, index) => {
    if (index > 0) {
      let timeDifference = stroke.time - keystrokes[index - 1].time;
      cumulativeTime += timeDifference / factor;
    }
    return { key: stroke.key, time: cumulativeTime };
  });
};
