# RIZE - Husky Git Hooks

This directory contains Git hooks managed by Husky to ensure code quality before commits and pushes.

## Hooks

### pre-commit
Runs before each commit to validate code quality:
- **Type checking** (TypeScript)
- **Linting** (ESLint)
- **Tests** (Jest for backend changes)

Only runs checks for the code that's being committed (backend or mobile).

## Setup

Husky should be automatically installed when you run `npm install` in the root directory.

If hooks aren't working, reinstall:
```bash
npm install
npx husky install
```

## Skipping Hooks

In case of emergency (use sparingly!):
```bash
git commit --no-verify -m "your message"
```

## Customizing

Edit `.husky/pre-commit` to customize what runs before commits.
