import { CONFIG } from '../config';

export function initializeSheets() {
  try {
    // @ts-ignore
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    // @ts-ignore
    let memberSheet = spreadsheet.getSheetByName(CONFIG.MEMBERS_SHEET);
    let settingsSheet = spreadsheet.getSheetByName(CONFIG.SETTINGS_SHEET);

    if (!memberSheet) {
      // @ts-ignore
      memberSheet = spreadsheet.insertSheet(CONFIG.MEMBERS_SHEET);
      
      // Set up headers
      memberSheet.getRange('A1:C1').setValues([['Name', 'Email', 'Roles']]);
      
      // Add some initial data
      const initialData = [
        ['John Doe', 'john@example.com', 'admin,user'],
        ['Jane Smith', 'jane@example.com', 'user']
      ];
      memberSheet.getRange(2, 1, initialData.length, initialData[0].length)
        .setValues(initialData);
      
      // Format headers
      memberSheet.getRange('A1:C1')
        .setBackground('#f3f3f3')
        .setFontWeight('bold');
      
      // Auto-resize columns
      memberSheet.autoResizeColumns(1, 3);
    }
    if (!settingsSheet) {
      // @ts-ignore
      settingsSheet = spreadsheet.insertSheet(CONFIG.SETTINGS_SHEET);
      
      // Set up headers
      settingsSheet.getRange('A1:A1').setValues([['Church Name']]);
      
      // Add some initial data
      const initialData = [['Your Church Name']];
      settingsSheet.getRange(2, 1, initialData.length, initialData[0].length)
        .setValues(initialData);
      
      // Format headers
      settingsSheet.getRange('A1:A1')
        .setBackground('#f3f3f3')
        .setFontWeight('bold');
      
      // Auto-resize columns
      settingsSheet.autoResizeColumns(1, 1);
    }
    return true;
  } catch (error) {
    console.error('Error initializing sheets:', error);
    throw error;
  }
} 