// This will be available globally in GAS
const CONFIG = {
  SPREADSHEET_ID: '1dTE7lvHdGUg94uDHB-E5l_ZcfNR6NUDo6kkerKDtksA',
  MEMBERS_SHEET: 'Members'
} as const;

// For TypeScript type checking
export type Config = typeof CONFIG; 