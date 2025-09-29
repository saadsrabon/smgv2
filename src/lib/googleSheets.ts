// Google Sheets API integration for real-time data
// This utility fetches data from Google Sheets and converts it to analytics format

interface GoogleSheetsResponse {
  values: string[][];
}

interface AnalyticsData {
  date: string;
  beneficiaries: number;
  programs: number;
  donations: number;
  volunteers: number;
}

// Google Sheets API configuration
const GOOGLE_SHEETS_API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || '';
const SPREADSHEET_ID = '1XTKAYoCk7MHTAYh5ot55LzoLzS5XBWDp';
const SHEET_NAME = "'2025'"; // Change this to your actual sheet name
const RANGE = 'A:V'; // Adjust range based on your data structure

/**
 * Fetches data from Google Sheets
 * @returns Promise<AnalyticsData[]>
 */
export const fetchGoogleSheetsData = async (): Promise<AnalyticsData[]> => {
  try {
    // If no API key is provided, return mock data
    if (!GOOGLE_SHEETS_API_KEY) {
      console.warn('Google Sheets API key not found. Using mock data.');
      return getMockData();
    }

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!${RANGE}?key=${GOOGLE_SHEETS_API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: GoogleSheetsResponse = await response.json();
    
    // Convert Google Sheets data to AnalyticsData format
    return convertSheetsDataToAnalytics(data.values);
    
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    // Fallback to mock data on error
    return getMockData();
  }
};

/**
 * Converts Google Sheets data to AnalyticsData format
 * @param values Raw data from Google Sheets
 * @returns AnalyticsData[]
 */
const convertSheetsDataToAnalytics = (values: string[][]): AnalyticsData[] => {
  if (!values || values.length < 2) {
    return getMockData();
  }

  // Skip header row and convert data
  const dataRows = values.slice(1);
  
  return dataRows.map((row, index) => {
    // Assuming columns: Date, Beneficiaries, Programs, Donations, Volunteers
    return {
      date: row[0] || `2024-${String(index + 1).padStart(2, '0')}`,
      beneficiaries: parseInt(row[1]) || 0,
      programs: parseInt(row[2]) || 0,
      donations: parseInt(row[3]) || 0,
      volunteers: parseInt(row[4]) || 0,
    };
  }).filter(item => item.date); // Filter out empty rows
};

/**
 * Mock data for development and fallback
 * @returns AnalyticsData[]
 */
const getMockData = (): AnalyticsData[] => {
  return [
    { date: '2024-01', beneficiaries: 45, programs: 3, donations: 12500, volunteers: 12 },
    { date: '2024-02', beneficiaries: 52, programs: 4, donations: 15200, volunteers: 15 },
    { date: '2024-03', beneficiaries: 48, programs: 3, donations: 11800, volunteers: 13 },
    { date: '2024-04', beneficiaries: 61, programs: 5, donations: 18900, volunteers: 18 },
    { date: '2024-05', beneficiaries: 58, programs: 4, donations: 16700, volunteers: 16 },
    { date: '2024-06', beneficiaries: 67, programs: 6, donations: 22100, volunteers: 20 },
    { date: '2024-07', beneficiaries: 72, programs: 5, donations: 19800, volunteers: 19 },
    { date: '2024-08', beneficiaries: 78, programs: 7, donations: 25600, volunteers: 22 },
    { date: '2024-09', beneficiaries: 85, programs: 6, donations: 23400, volunteers: 21 },
    { date: '2024-10', beneficiaries: 92, programs: 8, donations: 28900, volunteers: 25 },
    { date: '2024-11', beneficiaries: 88, programs: 7, donations: 26700, volunteers: 23 },
    { date: '2024-12', beneficiaries: 95, programs: 9, donations: 31200, volunteers: 28 }
  ];
};

/**
 * Calculates cumulative statistics from analytics data
 * @param data AnalyticsData[]
 * @returns CumulativeStats
 */
export const calculateCumulativeStats = (data: AnalyticsData[]) => {
  const totalBeneficiaries = data.reduce((sum, item) => sum + item.beneficiaries, 0);
  const totalPrograms = data.reduce((sum, item) => sum + item.programs, 0);
  const totalDonations = data.reduce((sum, item) => sum + item.donations, 0);
  const totalVolunteers = data.reduce((sum, item) => sum + item.volunteers, 0);
  
  // Calculate monthly growth (last 3 months average vs previous 3 months)
  if (data.length >= 6) {
    const recentMonths = data.slice(-3);
    const avgRecent = recentMonths.reduce((sum, item) => sum + item.beneficiaries, 0) / 3;
    const olderMonths = data.slice(-6, -3);
    const avgOlder = olderMonths.reduce((sum, item) => sum + item.beneficiaries, 0) / 3;
    const monthlyGrowth = avgOlder > 0 ? ((avgRecent - avgOlder) / avgOlder) * 100 : 0;
    
    return {
      totalBeneficiaries,
      totalPrograms,
      totalDonations,
      totalVolunteers,
      monthlyGrowth
    };
  }
  
  return {
    totalBeneficiaries,
    totalPrograms,
    totalDonations,
    totalVolunteers,
    monthlyGrowth: 0
  };
};

/**
 * Setup instructions for Google Sheets API
 */
export const getSetupInstructions = () => {
  return {
    steps: [
      '1. Go to Google Cloud Console (console.cloud.google.com)',
      '2. Create a new project or select existing one',
      '3. Enable Google Sheets API',
      '4. Create credentials (API Key)',
      '5. Add the API key to your .env file as VITE_GOOGLE_SHEETS_API_KEY',
      '6. Make sure your Google Sheet is publicly readable or shared with the API key',
      '7. Update SPREADSHEET_ID and SHEET_NAME in this file'
    ],
    note: 'The sheet should have columns: Date, Beneficiaries, Programs, Donations, Volunteers'
  };
};
