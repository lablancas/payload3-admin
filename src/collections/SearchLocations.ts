import type { CollectionConfig } from 'payload'

export const SearchLocations: CollectionConfig = {
  slug: 'searchLocations',
  labels: {
    singular: 'Search Location',
    plural: 'Search Locations',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'country', 'publicId', 'createdAt', 'updatedAt'],
  },
  fields: [
    {
      name: 'parentId',
      type: 'number',
      label: 'Parent ID',
      admin: {
        description: 'ID of the parent search location',
      },
    },
    {
      name: 'type',
      type: 'text',
      required: true,
      admin: {
        description: 'Location type (e.g. State, City)',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the search location',
      },
    },
    {
      name: 'canonicalName',
      type: 'text',
      label: 'Canonical Name',
      admin: {
        description: 'Canonical full name (e.g. California, United States)',
      },
    },
    {
      name: 'country',
      type: 'text',
      admin: {
        description: 'Country code (e.g. US)',
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
        description: 'Public identifier',
      },
    },
  ],
  timestamps: true,
}
