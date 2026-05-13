// Forward migration: Guide.callouts (inline anonymous { label, body: text })
// → shared callout type ({ _type: 'callout', type, title, body: blockContent }).
//
// Per docs/india-design-system.md §10 RESOLVED item 3.
//
// Usage:
//   Dry-run (read-only, no auth required for the fetch step):
//     node --env-file=.env.local migrations/2026-05-13-guide-callouts-to-shared-type.mjs --dry-run
//
//   Live run (requires SANITY_API_TOKEN with write access in .env.local):
//     node --env-file=.env.local migrations/2026-05-13-guide-callouts-to-shared-type.mjs
//
// Idempotency: re-running the script does NOT double-migrate. Documents whose
// callouts are already in the new shape (every entry has _type === 'callout')
// are skipped. Mixed arrays (some old, some new) are normalized — old entries
// migrated, new entries passed through unchanged.

import { createClient } from '@sanity/client'
import { randomBytes } from 'node:crypto'

const DRY_RUN = process.argv.includes('--dry-run')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'p4oxzjho'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!DRY_RUN && !token) {
  console.error('ERROR: SANITY_API_TOKEN env var required for live run.')
  console.error('Either add it to .env.local and re-run, or pass --dry-run to preview without writes.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const newKey = () => randomBytes(6).toString('hex')

const query = `*[_type == 'guide' && defined(callouts) && count(callouts) > 0]{
  _id, _rev, callouts
}`

console.log(`[${DRY_RUN ? 'DRY-RUN' : 'LIVE'}] Querying Guide documents with non-empty callouts...`)
console.log(`  projectId=${projectId} dataset=${dataset}`)

const guides = await client.fetch(query)
console.log(`Found ${guides.length} Guide document(s) with callouts.\n`)

let touched = 0
let calloutsMigrated = 0
let skipped = 0

for (const guide of guides) {
  const callouts = Array.isArray(guide.callouts) ? guide.callouts : []
  const allAlreadyNew = callouts.length > 0 && callouts.every(c => c?._type === 'callout')

  if (allAlreadyNew) {
    skipped++
    console.log(`SKIP   ${guide._id}  (${callouts.length} callout(s) already in new shape)`)
    continue
  }

  const migrated = callouts.map(c => {
    if (c?._type === 'callout') return c // pass through already-migrated entries
    return {
      _type: 'callout',
      _key: newKey(),
      type: 'note',
      title: typeof c?.label === 'string' ? c.label : '',
      body: [
        {
          _type: 'block',
          _key: newKey(),
          children: [
            {
              _type: 'span',
              _key: newKey(),
              text: typeof c?.body === 'string' ? c.body : '',
              marks: [],
            },
          ],
          markDefs: [],
          style: 'normal',
        },
      ],
    }
  })

  touched++
  calloutsMigrated += migrated.filter(c => c._type === 'callout').length

  console.log(`${DRY_RUN ? 'DRY-RUN' : 'WRITE  '} ${guide._id}  (${migrated.length} callout(s) → new shape)`)

  if (!DRY_RUN) {
    await client
      .patch(guide._id)
      .set({ callouts: migrated })
      .commit({ autoGenerateArrayKeys: false })
  }
}

console.log(`\n--- Summary ---`)
console.log(`${DRY_RUN ? 'Would update' : 'Updated'}: ${touched} Guide document(s), ${calloutsMigrated} callout(s) migrated`)
console.log(`Skipped (already migrated): ${skipped}`)
console.log(`Total scanned: ${guides.length}`)

if (DRY_RUN && touched > 0) {
  console.log('\nDry-run complete. Re-run without --dry-run to apply.')
}
