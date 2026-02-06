import type { CollectionConfig } from 'payload'
import { defaultTimezones } from 'payload/shared'

export const Apartments: CollectionConfig = {
  slug: 'apartments',
  labels: {
    singular: 'Apartment',
    plural: 'Apartments',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'status', 'type', 'accountId', 'createdAt', 'updatedAt'],
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
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Single Family', value: 'singleFamily' },
        { label: 'Multi Family', value: 'multiFamily' },
        { label: 'Student', value: 'student' },
        { label: 'Military', value: 'military' },
        { label: 'Affordable', value: 'affordable' },
        { label: 'Senior', value: 'senior' },
      ],
    },
    {
      name: 'housingType',
      type: 'select',
      label: 'Housing Type',
      options: [
        { label: 'Apartment', value: 'apartment' },
        { label: 'Penthouse', value: 'penthouse' },
        { label: 'Duplex', value: 'duplex' },
        { label: 'Townhome', value: 'townhome' },
      ],
    },
    {
      name: 'enabledFeatures',
      type: 'select',
      label: 'Enabled Features',
      hasMany: true,
      options: [
        { label: 'Search', value: 'search' },
        { label: 'SEO', value: 'seo' },
        { label: 'PPC', value: 'ppc' },
        { label: 'Microsite', value: 'microsite' },
        { label: 'Design Assistant', value: 'designAssistant' },
      ],
    },
    {
      name: 'timeZone',
      type: 'select',
      label: 'Time Zone',
      options: defaultTimezones,
      admin: {
        description: 'IANA time zone (e.g. America/New_York)',
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
    {
      name: 'address',
      type: 'group',
      label: 'Address',
      fields: [
        { name: 'line1', type: 'text', label: 'Line 1' },
        { name: 'line2', type: 'text', label: 'Line 2' },
        { name: 'city', type: 'text', label: 'City' },
        { name: 'state', type: 'text', label: 'State / Region' },
        { name: 'postalCode', type: 'text', label: 'Postal Code' },
        { name: 'country', type: 'text', label: 'Country' },
      ],
    },
    {
      name: 'coordinates',
      type: 'group',
      label: 'Coordinates',
      fields: [
        { name: 'lat', type: 'number', label: 'Latitude' },
        { name: 'lng', type: 'number', label: 'Longitude' },
      ],
    },
    {
      name: 'geojson',
      type: 'json',
      label: 'GeoJSON',
      admin: {
        description:
          'GeoJSON Point: { "type": "Point", "coordinates": [longitude, latitude] }',
      },
    },
    {
      name: 'marketingWebsiteUrl',
      type: 'text',
      label: 'Marketing Website URL',
      admin: {
        description: 'URL of the marketing website',
      },
    },
    {
      name: 'prospectPhoneNumber',
      type: 'text',
      label: 'Prospect Phone Number',
      admin: {
        description: 'Phone number for prospects',
      },
    },
  ],
  timestamps: true,
}
