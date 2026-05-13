# Session 5a Notes — Deferred Client-Code Adaptation

The Guide callouts migration in session 5a (commit B) replaces the inline anonymous shape `{ label: string, body: text }` with the shared `callout` named type `{ _type: 'callout', type, title, body: blockContent, chipLabel? }`.

**No data was migrated** — the production dataset currently has zero Guide documents with callouts. But the schema change has shipped: any future Guide callout authored in Studio will use the new shape, and the existing client code below will break the moment that happens.

Per session 5a's brief, these are **flagged here for a follow-up task**, not fixed in this session.

## Files reading the old shape

| File | Line | Pattern | Break mode |
|---|---|---|---|
| [src/app/simple/guide/[slug]/page.tsx](src/app/simple/guide/[slug]/page.tsx#L42-L46) | 42–46 | `co.label`, `co.body.split('\n')` | `co.label` is undefined; `co.body.split` throws because body is now a Portable Text array, not a string |
| [src/app/ec/guide/[slug]/page.tsx](src/app/ec/guide/[slug]/page.tsx#L42-L46) | 42–46 | Same pattern as Simple | Same break |
| [src/app/appealing/guide/[slug]/page.tsx](src/app/appealing/guide/[slug]/page.tsx#L42-L46) | 42–46 | Same pattern as Simple | Same break |
| [src/components/templates-branded/BrandedGuideClient.tsx](src/components/templates-branded/BrandedGuideClient.tsx#L100-L108) | 100–108 | `c.type`, `c.title`, `c.body` rendered as raw `<p>{c.body}</p>` | Field names already match the new shape (`type`/`title`), but `c.body` is now `PortableTextBlock[]`, not a string — will render as `[object Object]` |

## Follow-up task

Adapt the four sites above to consume the new `callout` shape. The Simple/EC/Appealing Guide pages were splitting `body` on `\n` to produce a list of items; those now need to extract Portable Text bullet-list items (or render via the new shared PortableText renderer from §10 item 4 once available). BrandedGuideClient already names the right fields but needs to pass `c.body` through the PortableText renderer.

Suggested grouping: do this in the same session that brings other families off `.split('\n\n')` flattening (session 5a explicitly deferred that). Until then, Guide callout content **must remain empty in Sanity** to avoid the latent break.
