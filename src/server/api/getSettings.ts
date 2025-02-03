import { CONFIG } from '../config';

interface Settings {
  churchName: string;
}

export function getSettings(): Settings {
  try {
    // @ts-ignore
    const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SETTINGS_SHEET);
    if (!sheet) {
      throw new Error('Settings sheet not found');
    }

    const churchName = sheet.getRange(2, 1).getValue();
    
    return {
      churchName
    };
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }
} 