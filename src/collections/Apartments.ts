import type { CollectionConfig } from 'payload'

export const Apartments: CollectionConfig = {
  slug: 'apartments',
  labels: {
    singular: 'Apartment',
    plural: 'Apartments',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'accountId', 'createdAt', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Name or identifier for the apartment',
      },
    },
    {
      name: 'accountId',
      type: 'relationship',
      relationTo: 'accounts',
      required: true,
      label: 'Account',
      admin: {
        description: 'Account that owns or is associated with this apartment',
      },
    },
    {
      name: 'account',
      type: 'text',
      admin: {
        hidden: true,
        description: 'Account (text)',
      },
    },
  ],
  timestamps: true,
}
