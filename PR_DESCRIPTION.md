# PR: feat(ui): add reusable ConfirmationModal and replace window.confirm usages

Branch: feature/confirmation-modal -> Base: main

## Summary

This PR adds a reusable, accessible, and neumorphic-styled `ConfirmationModal` component and replaces existing usages of the native `window.confirm()` prompt in three places with the new component so confirmations match the project's design language.

## Files added / changed

- Added: `src/components/ui/ConfirmationModal.tsx` — reusable modal component
- Updated: `src/app/app/freelancer/services/page.tsx` — replaced `confirm()` with modal
- Updated: `src/app/app/freelancer/services/[id]/page.tsx` — replaced `confirm()` with modal
- Updated: `src/app/app/client/offers/page.tsx` — replaced `confirm()` with modal

## What this implements

- Named export `ConfirmationModal` at `src/components/ui/ConfirmationModal.tsx`
- Props typed via `ConfirmationModalProps` with no usage of `any`
- Visual variants: `danger`, `warning`, `info`
- Backdrop with blur and click-outside to close
- Scale-in animation using the existing `animate-scale-in` class
- Close button (✕) in top-right
- Optional icon in circular tint background matching the variant
- Loading state with spinner in confirm button (disables buttons while loading)
- Keyboard support: `Escape` closes modal
- Accessibility: `role="alertdialog"`, `aria-labelledby`, and `aria-describedby`
- Uses existing `NEUMORPHIC_CARD` style tokens and Tailwind classes
- Responsive: constrained to `max-w-md`, padding on mobile

## Acceptance criteria mapping

- Component created at `/src/components/ui/ConfirmationModal.tsx` — yes
- Props fully typed (no `any`) — yes
- 3 visual variants (danger, warning, info) — yes
- Backdrop with blur and click-outside to close — yes
- Scale-in animation on open (uses existing CSS) — yes
- Close button (✕) in top-right corner — yes
- Optional icon with circle and tint background — yes
- Loading state with spinner in confirm button — yes
- Keyboard support: ESC closes modal — yes
- Accessibility: `role="alertdialog"`, ARIA labels — yes
- Neumorphic design consistent with project tokens — yes
- Responsive: `max-w-md` with padding on mobile — yes
- Named export (not default) — yes

## How to test locally

1. Install and run dev server:

```bash
npm install
npm run dev
```

2. Test pages in the UI:
- Freelancer services list: `/app/freelancer/services` — click a service Delete button
- Freelancer service details: `/app/freelancer/services/<id>` — use the Delete action
- Client offers list: `/app/client/offers` — click Delete on an offer

Verify:
- Modal appears with neumorphic style and icon tint
- Clicking outside or pressing `Esc` closes the modal
- Confirm button shows a spinner while processing and disables actions
- After confirm completes, the mocked deletion logic runs (list item removed or navigation happens)

## Notes

- I ran lint during development. The modal component uses fully typed interfaces and no `any` remains. There were unrelated pre-existing lint warnings in other parts of the repo (about setState in effects) — not introduced by this change.
- The confirmation flows currently simulate a short async delay to surface the loading spinner. Replace the simulated delays with real async calls (API requests) when wiring to backend endpoints.

## Reviewer checklist

- [ ] Confirm the new modal meets accessibility checks (screen reader announcements, focus management as needed)
- [ ] Confirm visual tokens match the style guide
- [ ] Confirm ESC/Click-outside and focus behavior are acceptable
- [ ] Suggest any UX or wording improvements for confirm/cancel text

---

*You can copy-paste this PR description into GitHub when creating the PR for branch `feature/confirmation-modal`.*
