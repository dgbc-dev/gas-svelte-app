import { Config } from '../config';

interface PutMemberArgs {
  name: string;
  email: string;
  roles: string[];
}

export function putMember(args: PutMemberArgs) {
  try {
    // @ts-ignore
    const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.MEMBERS_SHEET);
    if (!sheet) {
      // @ts-ignore
      throw new Error(`Sheet "${CONFIG.MEMBERS_SHEET}" not found`);
    }

    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const emailCol = headers.indexOf('Email');
    const rows = data.slice(1);

    // Find existing member
    const rowIndex = rows.findIndex(row => row[emailCol] === args.email);

    const newValues = [
      args.name,
      args.email,
      args.roles.join(',')
    ];

    if (rowIndex === -1) {
      // Add new member
      sheet.appendRow(newValues);
    } else {
      // Update existing member
      sheet.getRange(rowIndex + 2, 1, 1, newValues.length).setValues([newValues]);
    }

    return args;
  } catch (error) {
    console.error('Error updating member:', error);
    throw error;
  }
} 