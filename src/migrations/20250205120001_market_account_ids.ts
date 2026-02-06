import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-mongodb'

/**
 * Set market.accountId from market.account (text) by matching
 * market.account to account.publicId, in batch per account.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const { docs: accounts } = await payload.find({
    collection: 'accounts',
    limit: 1000,
    depth: 0,
    sort: 'createdAt',
    req,
  })

  for (const account of accounts) {
    const publicId = (account as { publicId?: string }).publicId
    if (!publicId || typeof publicId !== 'string' || !publicId.trim()) {
      continue
    }

    await payload.update({
      collection: 'markets',
      where: {
        account: { equals: publicId.trim() },
      },
      data: { accountId: account.id },
      limit: 10000,
      req,
    })
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  // Data migration: no safe rollback (would require storing previous accountId per doc).
  payload.logger.info({
    msg: 'market_account_ids down: no-op (data migration)',
  })
}
