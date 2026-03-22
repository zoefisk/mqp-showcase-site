# Contributions Guide

## Overview

This project is primarily developed and maintained by a single contributor.  
The workflow is intentionally simple to support rapid iteration, while still allowing structured contributions from team members when needed.

---

## Main Development Workflow

- All primary development is done directly on the `main` branch
- Changes are pushed frequently
- The `main` branch should always remain in a working, deployable state

---

## Solo Development Practices

When working on the project:

- Commit frequently with clear, descriptive messages
- Keep commits focused (avoid mixing unrelated changes)
- Test features locally before pushing
- Avoid leaving broken or incomplete functionality in `main`

---

## External Contributions (Team Members)

Team members may occasionally contribute via pull requests.

### Workflow

1. Create a branch from `main`

git checkout -b feature/short-description

2. Make changes and commit

3. Push the branch

git push origin feature/short-description

4. Open a Pull Request into `main`

---

## Pull Request Guidelines

Pull requests should:

- Be focused and limited in scope
- Include a clear description of:
- What was changed
- Why the change was made
- Be tested locally before submission
- Avoid introducing breaking changes without discussion

---

## Commit Message Conventions

This project uses a lightweight structured commit format:

type: short description

### Common Types

- `feat:` → new feature
- `fix:` → bug fix
- `refactor:` → code changes without behavior change
- `style:` → formatting, UI tweaks, styling
- `docs:` → documentation updates
- `chore:` → misc changes (config, deps, cleanup)

---

### Examples

feat: add likert scale question component
fix: resolve nav loading spinner not resetting
refactor: simplify question rendering logic
style: adjust spacing in question cards
docs: update contributions guide
chore: clean up unused imports

---

### Guidelines

- Use present tense ("add", not "added")
- Keep descriptions concise but clear
- Avoid vague messages like:
    - ❌ "stuff"
    - ❌ "fix things"
    - ❌ "update"

---

## Branch Naming (for contributors)

Use descriptive, lowercase names:

feature/likert-scale-ui
fix/nav-loading-state
refactor/question-types

---

## Code Style & Structure

- Follow existing project patterns and structure
- Prefer readable and maintainable code over clever solutions
- Keep components modular and reusable
- Match existing naming conventions (especially for React components and types)

---

## Notes

- Large architectural or design changes should be discussed before implementation
- Small improvements and fixes are always welcome via PR

---

## Summary

- `main` = primary development (solo workflow)
- Feature branches + PRs = external contributions
- Use clear commit messages and consistent naming
- Keep everything clean, readable, and working
