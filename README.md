# React Natural Typewriter

A lightweight React component for recording and replaying natural typing patterns with realistic timing and mistakes.

![React Natural Typewriter Demo](https://nicotroia.com/images/react-natural-typewriter.gif)

**Demo and keystroke generator** available at [this URL](https://react-natural-typewriter-demo.vercel.app/).

## Features

- 🎯 **Record natural keystrokes** with real timing data
- ⚡ **Replay with realistic animation** including backspaces and corrections
- 🪶 **Ultra-lightweight** - zero dependencies except React
- 📦 **TypeScript support** with full type definitions
- 🔧 **Customizable speed** and animation controls
- 🎨 **Unstyled** - bring your own CSS

## Project Structure

This is a tiny monorepo with two packages:

- **`packages/core`** - The main React component library (published to npm)
- **`packages/demo`** - Development demo app with recording tools

## Getting Started

### Installation

```bash
npm install react-natural-typewriter
# or
pnpm add react-natural-typewriter
```

### Basic Usage

```tsx
import { KeystrokePlayback } from "react-natural-typewriter";

function MyComponent() {
  const keystrokes = "H:0|e:89|l:167|l:234|o:456";

  return (
    <KeystrokePlayback
      keystrokes={keystrokes}
      speed={1.2}
      onComplete={() => console.log("Done!")}
    />
  );
}
```

### Keystroke Format

Keystrokes are encoded as pipe-separated key:time pairs:

```
"H:0|e:89|l:167|l:234|o:456|<BACKSPACE>:623|w:789"
```

- Each keystroke: `key:timestamp`
- Special keys: `<BACKSPACE>` for deletions
- Timestamps: Relative to start time in milliseconds

## Generating keystrokes

Run the "demo" app to record and playback keystrokes locally, or just visit [this URL](https://react-natural-typewriter-demo.vercel.app/) and copy the output.

## API

### KeystrokePlayback

The main component for playing back recorded keystrokes.

It renders a plain text string, so you can style it however you'd like:

```tsx
<span className="text-xl font-bold font-comic-sans">
  <KeystrokePlayback keystrokes="..." />
</span>
```

#### Props

| Prop         | Type         | Default | Description                        |
| ------------ | ------------ | ------- | ---------------------------------- |
| `keystrokes` | `string`     | -       | Encoded keystroke data             |
| `speed`      | `number`     | `1.0`   | Playback speed multiplier          |
| `delay`      | `number`     | `0`     | Initial delay before starting (ms) |
| `onComplete` | `() => void` | -       | Callback when animation completes  |

#### Ref Methods

| Method             | Description                              |
| ------------------ | ---------------------------------------- |
| `triggerRefresh()` | Restart the animation from the beginning |

## Development

```bash
# Clone and install dependencies
git clone https://github.com/nicotroia/react-natural-typewriter.git
cd react-natural-typewriter

# Using pnpm (recommended)
pnpm install
# Or npm
npm install
```

### Start the demo app

```bash
# pnpm
pnpm dev
pnpm --filter demo dev

# or npm
npm run dev
npm run dev -w demo
```

### Build the core library

```bash
# pnpm
pnpm build
pnpm -F react-natural-typewriter build

# or npm
npm run build
npm run build -w react-natural-typewriter
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Make your changes in `packages/core/`
4. Test in the demo app (`pnpm dev`)
5. Build the library (`pnpm build`)
6. Commit your changes (`git commit -m 'Add great new feature'`)
7. Push to the branch (`git push origin feature/new-feature`)
8. Open a Pull Request

## License

MIT © [Nico Troia](https://nicotroia.com)
