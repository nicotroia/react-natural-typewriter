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

export const reconstructTextFromKeystrokes = (encoded: string): string => {
  if (typeof encoded !== "string" || encoded.length === 0) return "";

  let reconstructedText = "";
  const keystrokeArray = encoded.split("|");

  for (const item of keystrokeArray) {
    const [key] = item.split(":");
    if (key === "<BACKSPACE>") {
      // Remove the last character
      reconstructedText = reconstructedText.slice(0, -1);
    } else if (
      ![
        "Shift",
        "Meta",
        "Control",
        "Alt",
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
      ].includes(key)
    ) {
      // Add the character (filter out modifier and arrow keys)
      reconstructedText += key;
    }
  }

  return reconstructedText;
};
