import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-mongodb'

/**
 * Set apartment.accountId from apartment.account (text) by matching
 * apartment.account to account.publicId, in batch per account.
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
      collection: 'apartments',
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
  // Leave empty or implement if you track previous values.
  payload.logger.info({
    msg: 'apartment_account_ids down: no-op (data migration)',
  })
}
