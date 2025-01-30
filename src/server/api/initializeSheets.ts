export function initializeSheets() {
  try {
    // @ts-ignore
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    // @ts-ignore
    let sheet = spreadsheet.getSheetByName(CONFIG.MEMBERS_SHEET);

    if (!sheet) {
      // @ts-ignore
      sheet = spreadsheet.insertSheet(CONFIG.MEMBERS_SHEET);
      
      // Set up headers
      sheet.getRange('A1:C1').setValues([['Name', 'Email', 'Roles']]);
      
      // Add some initial data
      const initialData = [
        ['John Doe', 'john@example.com', 'admin,user'],
        ['Jane Smith', 'jane@example.com', 'user']
      ];
      sheet.getRange(2, 1, initialData.length, initialData[0].length)
        .setValues(initialData);
      
      // Format headers
      sheet.getRange('A1:C1')
        .setBackground('#f3f3f3')
        .setFontWeight('bold');
      
      // Auto-resize columns
      sheet.autoResizeColumns(1, 3);
    }

    return true;
  } catch (error) {
    console.error('Error initializing sheets:', error);
    throw error;
  }
} 