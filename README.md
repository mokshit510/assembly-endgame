# Assembly: Endgame

A developer-themed, Hangman-style word guessing game built with React 18, Vite, and Vanilla CSS.

Can you guess the secret word before all modern programming languages are eliminated, leaving only Assembly?

---

## Overview

In **Assembly: Endgame**, you are tasked with protecting the modern software ecosystem. With every incorrect letter guessed, one programming language is eliminated in sequence:

1. HTML
2. CSS
3. JavaScript
4. React
5. TypeScript
6. Node.js
7. Python
8. Ruby

If you make 8 incorrect guesses, all modern technologies are wiped out, and only **Assembly** remains. Guess all letters correctly before your attempts expire to save the programming world.

---

## Features

- **Developer-Focused Dark Interface**: Clean charcoal aesthetic (`#202023`) with high-contrast typography, monospace code-editor style letter tiles, and the iconic yellow keyboard.
- **Physical & Virtual Keyboard Support**: Guess letters using your physical keyboard (`A`–`Z`) or tap the on-screen buttons.
- **Live Status & Farewell Messages**: Real-time attempt tracker (`Attempts remaining: X of 8`) and humorous farewell eulogies as languages are eliminated.
- **Accessible Design**: ARIA live regions (`role="status"`, `aria-live="polite"`), visually hidden screen-reader summaries, explicit button labels, and visible focus rings.
- **Fully Responsive**: Fluid layout built with CSS `clamp()` and flexbox, ensuring seamless play across mobile (320px–430px), tablet, and desktop screens without horizontal scroll.
- **Celebratory Win State**: Dynamic confetti effect upon solving the word.

---

## Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Styling**: Vanilla CSS (Custom Design System, CSS Variables)
- **Typography**: [Hanken Grotesk](https://fonts.google.com/specimen/Hanken+Grotesk) (UI) & [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (Word Tiles & Indicators)
- **Utilities**: `clsx`, `react-confetti`

---

## Project Structure

```text
Assembly: Endgame/
├── index.html          # HTML entry, meta tags, and Google Fonts
├── index.jsx           # React DOM root render
├── App.jsx             # Main game logic, state, and UI components
├── index.css           # Design system, responsive styles, and animations
├── languages.js        # Programming language definitions and brand colors
├── words.js            # Secret word bank
├── utils.js            # Random word generator and farewell messages
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies and build scripts
```

---

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (version 18 or newer recommended).

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/assembly-endgame.git
cd assembly-endgame
npm install
```

### Development

Start the local development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

### Production Build

Create an optimized production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## License

This project is open source and available under the [MIT License](LICENSE).