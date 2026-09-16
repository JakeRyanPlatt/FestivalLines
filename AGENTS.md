# AGENTS.md — SuperBench45

Instructions for Junie (and any other coding agent) working in this repo.

## Project Context

- **Stack:** GitHub Actions → Vercel (Next.js frontend) → Azure Container Apps and PostgreSQL Flexible Server (backend)
- **What this app does:** Fan-engagement/voting site tied to a YouTube channel (SuperBench45) — users vote on content and can upload media
- **Public-facing:** This app has unauthenticated write access (voting, uploads). Treat every user-facing endpoint as adversarial input.
- **Design priority:** Mobile-first. Reason about mobile viewport widths for any UI change, not just desktop.

## Security Boundaries

- Never commit `.env*` files, API keys, or connection strings. Read all secrets from environment variables.
- Never hardcode credentials in a source, even temporarily "to test."
- Flag any code path that writes to the database or storage without validation — do not silently patch it, surface it.
- If a required credential or environment variable is missing, **stop and report exactly what's missing**. Do not guess, mock, or work around it silently.

## Upload / Media Handling

- Any file upload must validate MIME type via magic-byte sniffing — never trust client-declared `content-type` alone.
- Enforce size limits per file type (images vs. video have different reasonable caps).
- Never use a client-supplied filename as a storage path. Generate a UUID.
- New supported media types must be explicitly listed — don't silently expand accepted formats.

## Data Fetching

- If a required data source has an official API (e.g., YouTube Data API v3), use it. Do not scrape HTML as a first resort — JS-rendered pages, unstable markup, and missing sort/filter options make scraping unreliable here.
- Prefer authenticated, structured API access over reverse-engineering an unofficial one.

## Testing

- Any new user-facing flow (voting, upload, external links, embeds) needs a Playwright test.
- Do not mark a task complete with failing tests.
- If a test fails, explain *why* before proposing a fix — a test failure may be revealing a real gap (missing data, missing markup) rather than a bad test.

## Code Style & Scope

- Match existing formatting/lint config.
- Prefer editing existing components over creating parallel/duplicate ones.
- Don't introduce a new state-management pattern, UI library, or dependency without asking first.

## Autonomy Boundaries — Ask First

- Database schema changes / migrations
- CI/CD config (GitHub Actions, Vercel, Azure pipeline settings)
- Adding new dependencies
- Anything touching auth or public write permissions

## Communication Style

- When a task is ambiguous, report findings before making changes — don't act on a guess.
- Keep summaries terse: bullet points over prose.
- State clearly what was changed vs. what still needs a decision.