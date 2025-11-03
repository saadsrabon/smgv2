import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  Heart, 
  RefreshCw, 
  Calendar,
  Target,
  Award,
  Settings
} from 'lucide-react';
import { fetchGoogleSheetsData, calculateCumulativeStats, getSetupInstructions } from '@/lib/googleSheets';
import { testGoogleSheetsIntegration } from '@/lib/testGoogleSheets';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface AnalyticsData {
  date: string;
  beneficiaries: number;
  programs: number;
  donations: number;
  volunteers: number;
}

interface CumulativeStats {
  totalBeneficiaries: number;
  totalPrograms: number;
  totalDonations: number;
  totalVolunteers: number;
  monthlyGrowth: number;
}

const Analytics = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [cumulativeStats, setCumulativeStats] = useState<CumulativeStats>({
    totalBeneficiaries: 0,
    totalPrograms: 0,
    totalDonations: 0,
    totalVolunteers: 0,
    monthlyGrowth: 0
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [testingSheets, setTestingSheets] = useState(false);
  const [sheetsStatus, setSheetsStatus] = useState<string>('');

  // Fetch data from Google Sheets
  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      const data = await fetchGoogleSheetsData();
      setAnalyticsData(data);
      
      // Calculate cumulative stats
      const stats = calculateCumulativeStats(data);
      setCumulativeStats(stats);
      
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchAnalyticsData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Test Google Sheets integration
  const testSheetsIntegration = async () => {
    setTestingSheets(true);
    setSheetsStatus('Testing Google Sheets integration...');
    
    try {
      const result = await testGoogleSheetsIntegration();
      
      if (result.success) {
        setSheetsStatus(`✅ Success! Found ${result.analyticsData?.length || 0} analytics records and ${result.programMetrics?.length || 0} program metrics.`);
        console.log('Google Sheets test result:', result);
      } else {
        setSheetsStatus(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      setSheetsStatus(`❌ Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setTestingSheets(false);
    }
  };

  // Handle hash-based navigation
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash && hash !== '') {
        // Redirect to main page with the same hash
        navigate(`/${hash}`);
      }
    };

    // Check for hash on component mount
    handleHashNavigation();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);
    
    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, [navigate]);

  // Chart configurations
  const lineChartData = {
    labels: analyticsData.map(item => item.date),
    datasets: [
      {
        label: i18n.language === 'bn' ? 'সুবিধাভোগী' : 'Beneficiaries',
        data: analyticsData.map(item => item.beneficiaries),
        borderColor: 'rgb(14, 165, 233)',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        tension: 0.4,
      },
      {
        label: i18n.language === 'bn' ? 'প্রোগ্রাম' : 'Programs',
        data: analyticsData.map(item => item.programs),
        borderColor: 'rgb(20, 184, 166)',
        backgroundColor: 'rgba(20, 184, 166, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: analyticsData.map(item => item.date),
    datasets: [
      {
        label: i18n.language === 'bn' ? 'অনুদান (টাকা)' : 'Donations (BDT)',
        data: analyticsData.map(item => item.donations),
        backgroundColor: 'rgba(249, 115, 22, 0.8)',
        borderColor: 'rgb(249, 115, 22)',
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartData = {
    labels: [
      i18n.language === 'bn' ? 'শিক্ষা' : 'Education',
      i18n.language === 'bn' ? 'স্বাস্থ্য' : 'Health',
      i18n.language === 'bn' ? 'সামাজিক' : 'Social',
      i18n.language === 'bn' ? 'অর্থনৈতিক' : 'Economic'
    ],
    datasets: [
      {
        data: [35, 25, 20, 20],
        backgroundColor: [
          'rgba(14, 165, 233, 0.8)',
          'rgba(20, 184, 166, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
        borderColor: [
          'rgb(14, 165, 233)',
          'rgb(20, 184, 166)',
          'rgb(249, 115, 22)',
          'rgb(236, 72, 153)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            family: i18n.language === 'bn' ? 'Bornomala' : 'Ubuntu Sans',
          },
        },
      },
      title: {
        display: true,
        font: {
          family: i18n.language === 'bn' ? 'Bornomala' : 'Ubuntu Sans',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            family: i18n.language === 'bn' ? 'Bornomala' : 'Ubuntu Sans',
          },
        },
      },
      x: {
        ticks: {
          font: {
            family: i18n.language === 'bn' ? 'Bornomala' : 'Ubuntu Sans',
          },
        },
      },
    },
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-BD').format(num);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="min-h-screen bg-light-bg pt-24">
      <div className="container-custom section-padding">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold text-light-text mb-4 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
            {i18n.language === 'bn' ? 'বিশ্লেষণ ও পরিসংখ্যান' : 'Analytics & Statistics'}
          </h1>
          <p className={`text-lg text-light-muted max-w-3xl mx-auto ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
            {i18n.language === 'bn' 
              ? 'আমাদের কাজের প্রভাব এবং অগ্রগতি দেখুন' 
              : 'Track our impact and progress in real-time'
            }
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={fetchAnalyticsData}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className={i18n.language === 'bn' ? 'font-bengali' : 'font-english'}>
                {i18n.language === 'bn' ? 'রিফ্রেশ' : 'Refresh'}
              </span>
            </button>
            
            <button
              onClick={testSheetsIntegration}
              disabled={testingSheets}
              className="flex items-center space-x-2 px-4 py-2 bg-secondary-teal text-white rounded-lg hover:bg-secondary-teal/90 transition-colors disabled:opacity-50"
            >
              <Settings className={`w-4 h-4 ${testingSheets ? 'animate-spin' : ''}`} />
              <span className={i18n.language === 'bn' ? 'font-bengali' : 'font-english'}>
                {i18n.language === 'bn' ? 'গুগল শীট টেস্ট' : 'Test Google Sheets'}
              </span>
            </button>
            
            <div className="flex items-center space-x-2 text-light-muted text-sm">
              <Calendar className="w-4 h-4" />
              <span className={i18n.language === 'bn' ? 'font-bengali' : 'font-english'}>
                {i18n.language === 'bn' ? 'সর্বশেষ আপডেট' : 'Last updated'}: {lastUpdated.toLocaleTimeString()}
              </span>
            </div>
          </div>
          
          {/* Google Sheets Status */}
          {sheetsStatus && (
            <div className="mt-4 p-4 bg-light-surface rounded-lg border border-light-border">
              <div className={`text-sm ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                {sheetsStatus}
              </div>
            </div>
          )}
        </div>

        {/* Cumulative Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-light-surface rounded-xl p-6 shadow-lg border border-light-border">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-light-muted text-sm ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                  {i18n.language === 'bn' ? 'মোট সুবিধাভোগী' : 'Total Beneficiaries'}
                </p>
                <p className="text-3xl font-bold text-light-text">{formatNumber(cumulativeStats.totalBeneficiaries)}</p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-light-surface rounded-xl p-6 shadow-lg border border-light-border">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-light-muted text-sm ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                  {i18n.language === 'bn' ? 'মোট প্রোগ্রাম' : 'Total Programs'}
                </p>
                <p className="text-3xl font-bold text-light-text">{formatNumber(cumulativeStats.totalPrograms)}</p>
              </div>
              <div className="w-12 h-12 bg-secondary-teal/20 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-secondary-teal" />
              </div>
            </div>
          </div>

          <div className="bg-light-surface rounded-xl p-6 shadow-lg border border-light-border">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-light-muted text-sm ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                  {i18n.language === 'bn' ? 'মোট অনুদান' : 'Total Donations'}
                </p>
                <p className="text-3xl font-bold text-light-text">{formatCurrency(cumulativeStats.totalDonations)}</p>
              </div>
              <div className="w-12 h-12 bg-secondary-orange/20 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-secondary-orange" />
              </div>
            </div>
          </div>

          <div className="bg-light-surface rounded-xl p-6 shadow-lg border border-light-border">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-light-muted text-sm ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                  {i18n.language === 'bn' ? 'মাসিক বৃদ্ধি' : 'Monthly Growth'}
                </p>
                <p className={`text-3xl font-bold ${cumulativeStats.monthlyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {cumulativeStats.monthlyGrowth >= 0 ? '+' : ''}{cumulativeStats.monthlyGrowth.toFixed(1)}%
                </p>
              </div>
              <div className="w-12 h-12 bg-secondary-pink/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-secondary-pink" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Line Chart */}
          <div className="bg-light-surface rounded-xl p-6 shadow-lg border border-light-border">
            <h3 className={`text-xl font-bold text-light-text mb-4 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              {i18n.language === 'bn' ? 'মাসিক অগ্রগতি' : 'Monthly Progress'}
            </h3>
            <div className="h-80">
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-light-surface rounded-xl p-6 shadow-lg border border-light-border">
            <h3 className={`text-xl font-bold text-light-text mb-4 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              {i18n.language === 'bn' ? 'মাসিক অনুদান' : 'Monthly Donations'}
            </h3>
            <div className="h-80">
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Program Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-light-surface rounded-xl p-6 shadow-lg border border-light-border">
            <h3 className={`text-xl font-bold text-light-text mb-4 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              {i18n.language === 'bn' ? 'প্রোগ্রাম বিতরণ' : 'Program Distribution'}
            </h3>
            <div className="h-80">
              <Doughnut data={doughnutChartData} options={chartOptions} />
            </div>
          </div>

          {/* Key Achievements */}
          <div className="bg-light-surface rounded-xl p-6 shadow-lg border border-light-border">
            <h3 className={`text-xl font-bold text-light-text mb-6 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              {i18n.language === 'bn' ? 'মূল অর্জন' : 'Key Achievements'}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <Target className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className={`font-semibold text-light-text ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                    {i18n.language === 'bn' ? 'লক্ষ্য অর্জন' : 'Target Achievement'}
                  </p>
                  <p className={`text-sm text-light-muted ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                    {i18n.language === 'bn' ? '৯৫% লক্ষ্য পূরণ হয়েছে' : '95% of targets achieved'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary-teal/20 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-secondary-teal" />
                </div>
                <div>
                  <p className={`font-semibold text-light-text ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                    {i18n.language === 'bn' ? 'গুণমান' : 'Quality Score'}
                  </p>
                  <p className={`text-sm text-light-muted ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                    {i18n.language === 'bn' ? '৪.৮/৫.০ গড় রেটিং' : '4.8/5.0 average rating'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary-orange/20 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-secondary-orange" />
                </div>
                <div>
                  <p className={`font-semibold text-light-text ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                    {i18n.language === 'bn' ? 'সন্তুষ্টি' : 'Satisfaction'}
                  </p>
                  <p className={`text-sm text-light-muted ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                    {i18n.language === 'bn' ? '৯৮% সন্তুষ্টি হার' : '98% satisfaction rate'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Source Info */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary-teal/10 rounded-xl p-6">
          <div className="text-center mb-6">
            <h3 className={`text-lg font-semibold text-light-text mb-2 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              {i18n.language === 'bn' ? 'ডেটা সোর্স' : 'Data Source'}
            </h3>
            <p className={`text-light-muted ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              {i18n.language === 'bn' 
                ? 'এই ডেটা Google Sheets থেকে সরাসরি আনা হয়েছে এবং প্রতি ৫ মিনিটে আপডেট হয়' 
                : 'This data is fetched directly from Google Sheets and updates every 5 minutes'
              }
            </p>
          </div>
          
          {/* Setup Instructions */}
          <details className="bg-light-bg rounded-lg p-4 border border-light-border">
            <summary className={`cursor-pointer font-semibold text-light-text flex items-center space-x-2 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              <Settings className="w-4 h-4" />
              <span>{i18n.language === 'bn' ? 'Google Sheets সেটআপ নির্দেশনা' : 'Google Sheets Setup Instructions'}</span>
            </summary>
            <div className="mt-4 space-y-2">
              {getSetupInstructions().steps.map((step, index) => (
                <p key={index} className={`text-sm text-light-muted ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                  {step}
                </p>
              ))}
              <p className={`text-sm text-primary font-medium mt-3 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                {getSetupInstructions().note}
              </p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
