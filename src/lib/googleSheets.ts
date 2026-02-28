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

export interface ImpactMetric {
  domain: string;
  metric: string;
  monthlyActuals: number[]; // Jan to Dec (index 0-11)
  annualTarget: number;
  quarterlyAchievement: number[]; // Q1 to Q4 (percentage)
  annualAchievement: number; // percentage
}

export interface PublicImpactMetrics {
  familiesServed: string;
  tutoringEnrollment: string;
  studentImprovement: string;
  youthMentored: string;
  localLeadersEmpowered: string;
  roleplaySessions: string;
  healthParticipants: string;
  communityPrograms: string;
  financialSustainability: string;
  livesImpacted: string;
}

export interface ProgramMetrics {
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
const SPREADSHEET_ID = '1zrfoXlfTI3V0JdXYNfpVxPxO-8fb46wo5h_Po4BuugQ';
const PUBLIC_SPREADSHEET_ID = '1n85NDtgjfOl-gMjEOP3efSsVO9wdGEFx2Mxf-j-W4kg';
const SHEET_NAMES = ['2025', '2024', '2023'];
const RANGE = 'A1:AB100';
const PUBLIC_RANGE = 'forWebsite!C2:C11';

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
 * Fetches impact metrics from Google Sheets
 * @param year The year to fetch metrics for (e.g., '2025')
 * @returns Promise<ImpactMetric[]>
 */
export const fetchImpactMetrics = async (year: string = '2025'): Promise<ImpactMetric[]> => {
  try {
    if (!GOOGLE_SHEETS_API_KEY) {
      console.warn('Google Sheets API key not found. Using mock impact metrics.');
      return getMockImpactMetrics();
    }

    const sheetA1 = encodeURIComponent(`'${year}'`);
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${sheetA1}!${RANGE}?key=${GOOGLE_SHEETS_API_KEY}&valueRenderOption=UNFORMATTED_VALUE`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch impact metrics for ${year}: ${response.status}`);
    }
    
    const data: GoogleSheetsResponse = await response.json();
    const values = data.values;

    if (!values || values.length < 4) {
      return [];
    }

    // Header is on Row 3 (index 2), Data starts from Row 4 (index 3)
    const metrics: ImpactMetric[] = [];
    
    for (let i = 3; i < values.length; i++) {
      const row = values[i];
      if (!row || row.length < 2 || !row[1]) continue; // Skip empty rows or rows without metric name

      const domain = row[0] || '';
      const metricName = row[1] || '';
      
      // Monthly actuals (Col D-O, indices 3-14)
      const monthlyActuals: number[] = [];
      for (let j = 3; j <= 14; j++) {
        monthlyActuals.push(parseFloat(row[j]) || 0);
      }

      // Annual Target (Col R, index 17)
      const annualTarget = parseFloat(row[17]) || 0;

      // Quarterly Achievement (Col S-V, indices 18-21)
      const quarterlyAchievement: number[] = [];
      for (let j = 18; j <= 21; j++) {
        // Handle percentages (0.61 -> 61)
        let val = parseFloat(row[j]) || 0;
        if (val <= 2 && val > 0) val = val * 100; // Likely a decimal percentage
        quarterlyAchievement.push(Math.round(val));
      }

      // Annual Achievement (Col W, index 22)
      let annualAchievement = parseFloat(row[22]) || 0;
      if (annualAchievement <= 2 && annualAchievement > 0) annualAchievement = annualAchievement * 100;
      annualAchievement = Math.round(annualAchievement);

      metrics.push({
        domain,
        metric: metricName,
        monthlyActuals,
        annualTarget,
        quarterlyAchievement,
        annualAchievement
      });
    }

    return metrics;
    
  } catch (error) {
    console.error(`Error fetching impact metrics for ${year}:`, error);
    return getMockImpactMetrics();
  }
};

/**
 * Fetches public-facing impact metrics from a separate summary spreadsheet
 */
export async function fetchPublicImpactMetrics(): Promise<PublicImpactMetrics> {
  if (!GOOGLE_SHEETS_API_KEY) {
    console.warn('Google Sheets API key not found. Returning mock public metrics.');
    return {
      familiesServed: '900',
      tutoringEnrollment: '169',
      studentImprovement: '100%',
      youthMentored: '7',
      localLeadersEmpowered: '0',
      roleplaySessions: '0',
      healthParticipants: '347',
      communityPrograms: '702',
      financialSustainability: '27%',
      livesImpacted: '3,870'
    };
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${PUBLIC_SPREADSHEET_ID}/values/${encodeURIComponent(PUBLIC_RANGE)}?key=${GOOGLE_SHEETS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.values) {
      throw new Error('No data found in public spreadsheet');
    }

    const values = data.values.map((row: any[]) => row[0]);

    return {
      familiesServed: values[0] || '0',
      tutoringEnrollment: values[1] || '0',
      studentImprovement: values[2] || '0%',
      youthMentored: values[3] || '0',
      localLeadersEmpowered: values[4] || '0',
      roleplaySessions: values[5] || '0',
      healthParticipants: values[6] || '0',
      communityPrograms: values[7] || '0',
      financialSustainability: values[8] || '0%',
      livesImpacted: values[9] || '0',
    };
  } catch (error) {
    console.error('Error fetching public impact metrics:', error);
    throw error;
  }
}

/**
 * Mock impact metrics data
 */
const getMockImpactMetrics = (): ImpactMetric[] => {
  return [
    {
      domain: 'Leadership & Ownership',
      metric: '% of program sessions led by community members',
      monthlyActuals: [2, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      annualTarget: 10,
      quarterlyAchievement: [60, 0, 0, 0],
      annualAchievement: 60
    },
    {
      domain: 'Education',
      metric: 'Preschool Enrollment',
      monthlyActuals: [73, 73, 75, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      annualTarget: 80,
      quarterlyAchievement: [92, 0, 0, 0],
      annualAchievement: 92
    }
  ];
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
