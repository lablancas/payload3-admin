import type { CollectionConfig } from 'payload'

export const Markets: CollectionConfig = {
  slug: 'markets',
  labels: {
    singular: 'Market',
    plural: 'Markets',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'market', 'submarket', 'state', 'createdAt', 'updatedAt'],
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        const parts = [doc?.market, doc?.submarket, doc?.state].filter(Boolean)
        doc.name = parts.join(', ') || ''
      },
    ],
    beforeChange: [
      ({ data }) => {
        const parts = [data?.market, data?.submarket, data?.state].filter(Boolean)
        data.name = parts.join(', ') || ''
        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      admin: {
        description: 'Combined market, submarket and state (auto-set)',
        readOnly: true,
      },
    },
    {
      name: 'market',
      type: 'text',
      label: 'Market',
    },
    {
      name: 'submarket',
      type: 'text',
      label: 'Submarket',
    },
    {
      name: 'account',
      type: 'text',
      label: 'Account',
    },
    {
      name: 'state',
      type: 'text',
      label: 'State',
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location',
    },
  ],
  timestamps: true,
}
