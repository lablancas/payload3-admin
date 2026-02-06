/**
 * Migration: set apartment.accountId from apartment.account (text)
 * by looping through each account and batch-updating all apartments where
 * apartment.account equals account.publicId.
 *
 * Run from project root: pnpm run migrate:apartment-account-ids
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.js'

async function run() {
  const payload = await getPayload({ config })

  const { docs: accounts } = await payload.find({
    collection: 'accounts',
    limit: 1000,
    depth: 0,
    sort: 'createdAt',
  })

  let totalUpdated = 0

  for (const account of accounts) {
    const publicId = (account as { publicId?: string }).publicId
    if (!publicId || typeof publicId !== 'string' || !publicId.trim()) {
      continue
    }

    const result = await payload.update({
      collection: 'apartments',
      where: {
        account: { equals: publicId.trim() },
      },
      data: { accountId: account.id },
      limit: 10000,
    })

    const updated = result.docs?.length ?? 0
    if (updated > 0) {
      totalUpdated += updated
      console.log(
        `Account ${account.id} (publicId: ${publicId.trim()}): updated ${updated} apartment(s)`
      )
    }
  }

  console.log(`Done. Total apartments updated: ${totalUpdated}`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
