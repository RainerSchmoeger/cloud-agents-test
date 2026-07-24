# cloud-agents-test

A Vue 3 + Vite demo application showcasing a poem with routing, theming, and CI/CD.

## A Poem

In circuits deep and threads unseen,
A quiet thought begins to gleam.
From line to line, the code takes flight—
A small spark born to find the light.

It hums through silicon and wire,
Fueled by coffee, fueled by fire.
And though the hours stretch and bend,
Each bug fixed brings a hopeful end.

So let the cursors dance and play,
While stars outside forget the day.
A verse compiled, a dream compiled—
Goodnight, dear shell, until we build.

## Tech Stack

- **Framework**: Vue 3 (Composition API, `<script setup>`)
- **Build Tool**: Vite 8
- **Router**: Vue Router 4
- **Package Manager**: pnpm 9
- **Testing**: Playwright (e2e)
- **CI/CD**: GitHub Actions

## Project Structure

```
.
├── .github/
│   ├── workflows/
│   │   ├── deploy-demo.yml      # Build & deploy to GitHub Pages
│   │   └── playwright.yml       # E2e test workflow
│   └── dependabot.yml          # Dependency update config
├── .opencode/
│   └── skills/
│       └── worker/             # Autonomous issue-triage worker skill
├── demo/
│   ├── public/
│   │   └── favicon.svg          # Custom poem favicon
│   ├── src/
│   │   ├── components/
│   │   │   └── Poem.vue         # Poem display component
│   │   ├── composables/
│   │   │   └── useTheme.js      # Theme switching composable
│   │   ├── views/
│   │   │   ├── Terms.vue         # Terms & conditions page
│   │   │   └── Feedback.vue     # Feedback form page
│   │   ├── App.vue              # Root layout (header, footer, router)
│   │   ├── main.js              # App entry + router setup
│   │   └── style.css            # Global styles & theme variables
│   ├── tests/
│   │   └── poem.spec.js         # Playwright e2e tests
│   ├── playwright.config.js     # Playwright configuration
│   └── package.json
├── docs/
│   └── feature-proposal.md      # Proposed future features
├── AGENTS.md                    # Git workflow rules for agents
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 24+
- pnpm 9+ (`npm install -g pnpm` or use [corepack](https://nodejs.org/api/corepack.html))

### Installation

```bash
cd demo
pnpm install
```

### Development

```bash
cd demo
pnpm dev
```

The dev server starts at `http://localhost:5173`.

### Build

```bash
cd demo
pnpm build
```

Output is in `demo/dist/`.

### Preview Production Build

```bash
cd demo
pnpm preview
```

### Run E2E Tests

```bash
cd demo
pnpm test:e2e
```

This will build the app, start a preview server, and run Playwright tests.

## Features

- **Poem Display**: A four-stanza poem rendered in a monospace code block
- **Routing**: Home, Terms, and Feedback pages via Vue Router
- **Theme Switching**: Light/dark/auto theme toggle with localStorage persistence
- **Accessibility**: Skip-to-content link, focus-visible outlines, reduced-motion support, ARIA labels
- **Feedback Form**: Email, star rating (1-5), and feedback textarea
- **Legal**: Full Terms & Conditions page
- **CI/CD**: Automatic deployment to GitHub Pages on push to main and PRs

## Deployment

The demo is deployed to GitHub Pages via the `deploy-demo.yml` workflow:

- **Main branch**: Deploys to `/<repo>/main/`
- **Pull requests**: Deploys preview to `/<repo>/pr-<number>/`
- **Closed PRs**: Removes the preview deployment

The live site is at: `https://rainerschmoeger.github.io/cloud-agents-test/`

## Git Workflow

See [AGENTS.md](./AGENTS.md) for the full git workflow rules. Key points:

- Never commit directly to `main`
- Branches must be prefixed with `cloud/` (e.g. `cloud/add-feature`)
- Always rebase on `main` before pushing
- Keep history linear (no merge commits)
- Open a PR for every change — never merge yourself

## Worker Skill

The `.opencode/skills/worker/` directory contains an autonomous issue-triage skill that:

1. Fetches open GitHub issues and PRs
2. Closes issues whose PRs have been merged
3. Rebases open PRs on `main`
4. Addresses GitHub review comments
5. Reviews dependabot PRs for breaking changes
6. Fixes the most important open issue
7. Waits and polls until the time budget expires

## License

This is a demo project. All content is owned by the repository owner.
