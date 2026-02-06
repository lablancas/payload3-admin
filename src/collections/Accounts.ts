import type { CollectionConfig } from 'payload'

export const Accounts: CollectionConfig = {
  slug: 'accounts',
  labels: {
    singular: 'Account',
    plural: 'Accounts',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['id', 'name', 'publicId', 'createdAt', 'updatedAt'],
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Unique text identifier for the account',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Display name for the account',
      },
    },
    {
      name: 'publicId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Public ID',
      admin: {
        description: 'Public-facing identifier (e.g. for APIs or URLs)',
      },
    },
  ],
  timestamps: true,
}
