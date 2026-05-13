// Rollback: shared callout type → Guide's previous inline shape
// ({ label: string, body: text }).
//
// Safety net for the forward migration in
// 2026-05-13-guide-callouts-to-shared-type.mjs. Not a planned action.
//
// Body conversion: flattens Portable Text blocks into a single string by
// joining each block's span text values and separating blocks with '\n\n'.
// Non-block content (images etc.) is dropped — these were not representable
// in the old shape anyway.
//
// Usage:
//   Dry-run:
//     node --env-file=.env.local migrations/rollback-2026-05-13-guide-callouts-to-shared-type.mjs --dry-run
//
//   Live rollback (requires SANITY_API_TOKEN):
//     node --env-file=.env.local migrations/rollback-2026-05-13-guide-callouts-to-shared-type.mjs

import { createClient } from '@sanity/client'
import { randomBytes } from 'node:crypto'

const DRY_RUN = process.argv.includes('--dry-run')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'p4oxzjho'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!DRY_RUN && !token) {
  console.error('ERROR: SANITY_API_TOKEN env var required for live rollback.')
  console.error('Pass --dry-run to preview without writes.')
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

function flattenBlockContentToText(body) {
  if (!Array.isArray(body)) return ''
  return body
    .filter(b => b?._type === 'block')
    .map(b => (Array.isArray(b.children) ? b.children : [])
      .filter(s => s?._type === 'span')
      .map(s => (typeof s.text === 'string' ? s.text : ''))
      .join(''))
    .join('\n\n')
}

const query = `*[_type == 'guide' && defined(callouts) && count(callouts) > 0]{
  _id, _rev, callouts
}`

console.log(`[${DRY_RUN ? 'DRY-RUN' : 'LIVE'}] ROLLBACK: querying Guide documents with callouts...`)
console.log(`  projectId=${projectId} dataset=${dataset}`)

const guides = await client.fetch(query)
console.log(`Found ${guides.length} Guide document(s) with callouts.\n`)

let touched = 0
let calloutsReverted = 0
let skipped = 0

for (const guide of guides) {
  const callouts = Array.isArray(guide.callouts) ? guide.callouts : []
  const anyNewShape = callouts.some(c => c?._type === 'callout')

  if (!anyNewShape) {
    skipped++
    console.log(`SKIP   ${guide._id}  (no new-shape callouts to roll back)`)
    continue
  }

  const reverted = callouts.map(c => {
    if (c?._type !== 'callout') return c // already in old shape; leave
    return {
      _key: newKey(),
      label: typeof c.title === 'string' ? c.title : '',
      body: flattenBlockContentToText(c.body),
    }
  })

  touched++
  calloutsReverted += reverted.filter(c => !c._type).length

  console.log(`${DRY_RUN ? 'DRY-RUN' : 'WRITE  '} ${guide._id}  (${reverted.length} callout(s) → old shape)`)

  if (!DRY_RUN) {
    await client
      .patch(guide._id)
      .set({ callouts: reverted })
      .commit({ autoGenerateArrayKeys: false })
  }
}

console.log(`\n--- Summary ---`)
console.log(`${DRY_RUN ? 'Would revert' : 'Reverted'}: ${touched} Guide document(s), ${calloutsReverted} callout(s) reverted`)
console.log(`Skipped (already in old shape): ${skipped}`)
console.log(`Total scanned: ${guides.length}`)
