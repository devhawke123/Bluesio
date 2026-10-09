# Design system rules (read before writing UI)

Follow `../ARCHITECTURE.md` (§4.5 styling, §4.5a global CSS, §4.5b Figma workflow).

- Tailwind v4: all config in `src/index.css`. Never create `tailwind.config.*`.
- Tokens only: no hardcoded hex, px font sizes or arbitrary breakpoints.
- Fonts come from Figma. If a family/weight is missing from `src/assets/`, stop and ask the user to add it.
- Pages are thin compositions; markup lives in `sections/`. Reuse `src/components/` first.
- All HTTP goes through `src/lib/api.ts`.
