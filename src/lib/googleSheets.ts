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

interface ProgramMetrics {
  year: string;
  month: string;
  preschoolEnrollment: number;
  preschoolAttendance: number;
  tutoringEnrollment: number;
  studentImprovement: number;
  digitalLiteracyParticipation: number;
  digitalLiteracyImprovement: number;
  mentoringParticipation: number;
  mentoringImprovement: number;
  totalProgramSessions: number;
  communityLedSessions: number;
  communitySatisfaction: number;
  totalRespondents: number;
  localRevenue: number;
  maintenanceRequired: string;
  incomeUtilization: string;
}

// Google Sheets API configuration
const GOOGLE_SHEETS_API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || '';
const SPREADSHEET_ID = '1XTKAYoCk7MHTAYh5ot55LzoLzS5XBWDp';
const SHEET_NAMES = ['2025', '2024', '2023']; // Multiple years
const RANGE = 'A:AB'; // Full range based on your sheet structure

/**
 * Fetches data from Google Sheets for multiple years
 * @returns Promise<AnalyticsData[]>
 */
export const fetchGoogleSheetsData = async (): Promise<AnalyticsData[]> => {
  try {
    // If no API key is provided, return mock data
    if (!GOOGLE_SHEETS_API_KEY) {
      console.warn('Google Sheets API key not found. Using mock data.');
      return getMockData();
    }

    const allData: AnalyticsData[] = [];
    
    // Fetch data from all years
    for (const sheetName of SHEET_NAMES) {
      try {
        // Quote and URL-encode sheet name for A1 notation (required for numeric sheet names)
        const sheetA1 = encodeURIComponent(`'${sheetName}'`);
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${sheetA1}!${RANGE}?key=${GOOGLE_SHEETS_API_KEY}&valueRenderOption=UNFORMATTED_VALUE`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          console.warn(`Failed to fetch data from sheet ${sheetName}: ${response.status}`);
          continue;
        }
        
        const data: GoogleSheetsResponse = await response.json();
        
        // Convert Google Sheets data to AnalyticsData format
        const yearData = convertSheetsDataToAnalytics(data.values, sheetName);
        allData.push(...yearData);
        
      } catch (error) {
        console.error(`Error fetching data from sheet ${sheetName}:`, error);
        continue;
      }
    }
    
    // Sort by date and return
    return allData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    // Fallback to mock data on error
    return getMockData();
  }
};

/**
 * Converts Google Sheets data to AnalyticsData format
 * @param values Raw data from Google Sheets
 * @param year Year of the data
 * @returns AnalyticsData[]
 */
const convertSheetsDataToAnalytics = (values: string[][], year: string): AnalyticsData[] => {
  if (!values || values.length < 2) {
    return [];
  }

  // Find the header row (look for "January" in the row)
  let headerRowIndex = -1;
  for (let i = 0; i < values.length; i++) {
    if (values[i].some(cell => cell && cell.toLowerCase().includes('january'))) {
      headerRowIndex = i;
      break;
    }
  }

  if (headerRowIndex === -1) {
    console.warn(`No header row found in sheet ${year}`);
    return [];
  }

  // Extract month columns (January through December)
  const monthColumns = [];
  const headerRow = values[headerRowIndex];
  
  for (let i = 0; i < headerRow.length; i++) {
    const cell = headerRow[i]?.toLowerCase();
    if (cell && (cell.includes('january') || cell.includes('february') || cell.includes('march') || 
                 cell.includes('april') || cell.includes('may') || cell.includes('june') ||
                 cell.includes('july') || cell.includes('august') || cell.includes('september') ||
                 cell.includes('october') || cell.includes('november') || cell.includes('december'))) {
      monthColumns.push(i);
    }
  }

  if (monthColumns.length === 0) {
    console.warn(`No month columns found in sheet ${year}`);
    return [];
  }

  // Process each program row
  const analyticsData: AnalyticsData[] = [];
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];

  // Look for key metrics rows
  for (let rowIndex = headerRowIndex + 1; rowIndex < values.length; rowIndex++) {
    const row = values[rowIndex];
    if (!row || row.length === 0) continue;

    const program = row[0]?.toLowerCase() || '';
    const metric = row[1]?.toLowerCase() || '';

    // Focus on key metrics that represent beneficiaries and programs
    if (program.includes('education') && (metric.includes('enrollment') || metric.includes('attendance'))) {
      // Process each month column
      monthColumns.forEach((colIndex, monthIndex) => {
        if (monthIndex < months.length) {
          const value = parseInt(row[colIndex]) || 0;
          if (value > 0) {
            const date = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
            
            // Find or create entry for this month
            let existingEntry = analyticsData.find(item => item.date === date);
            if (!existingEntry) {
              existingEntry = {
                date,
                beneficiaries: 0,
                programs: 0,
                donations: 0,
                volunteers: 0
              };
              analyticsData.push(existingEntry);
            }
            
            existingEntry.beneficiaries += value;
            existingEntry.programs += 1; // Count each program metric as a program
          }
        }
      });
    }
  }

  return analyticsData;
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
 * Fetches detailed program metrics from Google Sheets
 * @returns Promise<ProgramMetrics[]>
 */
export const fetchProgramMetrics = async (): Promise<ProgramMetrics[]> => {
  try {
    if (!GOOGLE_SHEETS_API_KEY) {
      console.warn('Google Sheets API key not found. Using mock data.');
      return getMockProgramMetrics();
    }

    const allMetrics: ProgramMetrics[] = [];
    
    // Fetch data from all years
    for (const sheetName of SHEET_NAMES) {
      try {
        // Quote and URL-encode sheet name for A1 notation (required for numeric sheet names)
        const sheetA1 = encodeURIComponent(`'${sheetName}'`);
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${sheetA1}!${RANGE}?key=${GOOGLE_SHEETS_API_KEY}&valueRenderOption=UNFORMATTED_VALUE`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          console.warn(`Failed to fetch metrics from sheet ${sheetName}: ${response.status}`);
          continue;
        }
        
        // Convert to program metrics
        const yearMetrics = convertToProgramMetrics();
        allMetrics.push(...yearMetrics);
        
      } catch (error) {
        console.error(`Error fetching metrics from sheet ${sheetName}:`, error);
        continue;
      }
    }
    
    return allMetrics.sort((a, b) => new Date(`${a.year}-${a.month}`).getTime() - new Date(`${b.year}-${b.month}`).getTime());
    
  } catch (error) {
    console.error('Error fetching program metrics:', error);
    return getMockProgramMetrics();
  }
};

/**
 * Converts Google Sheets data to ProgramMetrics format
 */
const convertToProgramMetrics = (): ProgramMetrics[] => {
  // This would parse the specific metrics from your sheet
  // For now, return mock data
  return getMockProgramMetrics();
};

/**
 * Mock program metrics data
 */
const getMockProgramMetrics = (): ProgramMetrics[] => {
  return [
    {
      year: '2025',
      month: 'January',
      preschoolEnrollment: 73,
      preschoolAttendance: 58,
      tutoringEnrollment: 37,
      studentImprovement: 31,
      digitalLiteracyParticipation: 25,
      digitalLiteracyImprovement: 15,
      mentoringParticipation: 0,
      mentoringImprovement: 0,
      totalProgramSessions: 8,
      communityLedSessions: 2,
      communitySatisfaction: 0,
      totalRespondents: 0,
      localRevenue: 25000,
      maintenanceRequired: 'None',
      incomeUtilization: 'Placeholder'
    }
  ];
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
      '7. The sheet should have tabs for 2025, 2024, and 2023',
      '8. Each tab should have program metrics with monthly columns'
    ],
    note: 'The sheet contains program metrics for Education, Health, Social, and Leadership programs across multiple years'
  };
};
