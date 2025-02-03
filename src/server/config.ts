// This will be available globally in GAS
const CONFIG = {
  SPREADSHEET_ID: '1dTE7lvHdGUg94uDHB-E5l_ZcfNR6NUDo6kkerKDtksA',
  MEMBERS_SHEET: 'Members',
  SETTINGS_SHEET: 'Settings',
} as const;

// For TypeScript type checking
export type Config = typeof CONFIG;
export { CONFIG }; 