# Build workspaces

Each dice roll gets an **isolated folder** so multiple Cursor builds don't overwrite each other.

```
app/build/{slug}/page.tsx    ← demo route (/build/{slug})
projects/{slug}/             ← tool components & logic
app/api/build/{slug}/route.ts ← optional API (if needed)
```

The slug is generated on roll (e.g. `commit-msg-chef-x7k2`) and included in the Cursor prompt.

**Do not** put rolled builds in `app/present/` or shared `components/` — those are kitchen infrastructure.
