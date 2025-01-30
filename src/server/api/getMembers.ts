import { Config } from '../config';

interface Member {
  name: string;
  email: string;
  roles: string[];
}

export function getMembers(): Member[] {
  try {
    // @ts-ignore
    const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.MEMBERS_SHEET);
    if (!sheet) {
      // @ts-ignore
      throw new Error(`Sheet "${CONFIG.MEMBERS_SHEET}" not found`);
    }

    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);

    return rows.map(row => {
      const member: Member = {
        name: row[headers.indexOf('Name')],
        email: row[headers.indexOf('Email')],
        roles: (row[headers.indexOf('Roles')] || '').split(',').map((role: string) => role.trim())
      };
      return member;
    });
  } catch (error) {
    console.error('Error fetching members:', error);
    throw error;
  }
} 