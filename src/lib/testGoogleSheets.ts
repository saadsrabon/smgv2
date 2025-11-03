// Test function for Google Sheets integration
import { fetchGoogleSheetsData, fetchProgramMetrics } from './googleSheets';

/**
 * Test Google Sheets integration
 */
export const testGoogleSheetsIntegration = async () => {
  console.log('🧪 Testing Google Sheets Integration...');
  
  try {
    // Test basic analytics data
    console.log('📊 Fetching analytics data...');
    const analyticsData = await fetchGoogleSheetsData();
    console.log('✅ Analytics data fetched:', analyticsData.length, 'records');
    console.log('📈 Sample data:', analyticsData.slice(0, 3));
    
    // Test program metrics
    console.log('📋 Fetching program metrics...');
    const programMetrics = await fetchProgramMetrics();
    console.log('✅ Program metrics fetched:', programMetrics.length, 'records');
    console.log('📊 Sample metrics:', programMetrics.slice(0, 2));
    
    // Calculate totals
    const totalBeneficiaries = analyticsData.reduce((sum, item) => sum + item.beneficiaries, 0);
    const totalPrograms = analyticsData.reduce((sum, item) => sum + item.programs, 0);
    const totalDonations = analyticsData.reduce((sum, item) => sum + item.donations, 0);
    const totalVolunteers = analyticsData.reduce((sum, item) => sum + item.volunteers, 0);
    
    console.log('📊 Summary:');
    console.log(`   Total Beneficiaries: ${totalBeneficiaries.toLocaleString()}`);
    console.log(`   Total Programs: ${totalPrograms.toLocaleString()}`);
    console.log(`   Total Donations: ${totalDonations.toLocaleString()} BDT`);
    console.log(`   Total Volunteers: ${totalVolunteers.toLocaleString()}`);
    
    return {
      success: true,
      analyticsData,
      programMetrics,
      summary: {
        totalBeneficiaries,
        totalPrograms,
        totalDonations,
        totalVolunteers
      }
    };
    
  } catch (error) {
    console.error('❌ Google Sheets integration test failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Test specific sheet access
 */
export const testSheetAccess = async (sheetName: string) => {
  console.log(`🔍 Testing access to sheet: ${sheetName}`);
  
  try {
    const GOOGLE_SHEETS_API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
    const SPREADSHEET_ID = '1XTKAYoCk7MHTAYh5ot55LzoLzS5XBWDp';
    
    if (!GOOGLE_SHEETS_API_KEY) {
      throw new Error('Google Sheets API key not found');
    }
    
    // Quote and URL-encode sheet name for A1 notation (required for numeric sheet names)
    const sheetA1 = encodeURIComponent(`'${sheetName}'`);
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${sheetA1}!A:AB?key=${GOOGLE_SHEETS_API_KEY}&valueRenderOption=UNFORMATTED_VALUE`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    console.log(`✅ Successfully accessed sheet ${sheetName}`);
    console.log(`📊 Data rows: ${data.values?.length || 0}`);
    console.log(`📋 Sample headers:`, data.values?.[0]?.slice(0, 5));
    
    return {
      success: true,
      rowCount: data.values?.length || 0,
      headers: data.values?.[0] || []
    };
    
  } catch (error) {
    console.error(`❌ Failed to access sheet ${sheetName}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
