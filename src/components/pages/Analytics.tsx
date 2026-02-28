import React, { useState, useEffect } from 'react';
import { 
  Award, Target, Users, TrendingUp, RefreshCw, Calendar, 
  ChevronDown, BookOpen, UserPlus, Mic2, Activity, Layout, 
  DollarSign, Heart, ChevronRight, ArrowLeft
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
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
import { Line, Bar } from 'react-chartjs-2';
import { fetchImpactMetrics, fetchPublicImpactMetrics } from '@/lib/googleSheets';
import type { ImpactMetric, PublicImpactMetrics } from '@/lib/googleSheets';

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

type ViewMode = 'summary' | 'detailed';

const Analytics = () => {
  const { i18n, t } = useTranslation();
  const [viewMode, setViewMode] = useState<ViewMode>('summary');
  const [impactMetrics, setImpactMetrics] = useState<ImpactMetric[]>([]);
  const [publicMetrics, setPublicMetrics] = useState<PublicImpactMetrics | null>(null);
  const [selectedMetricIndex, setSelectedMetricIndex] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<string>('2025');
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);

  const years = ['2025', '2024', '2023'];

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch public metrics always for the summary
      const pData = await fetchPublicImpactMetrics();
      setPublicMetrics(pData);

      // Fetch detailed metrics for the detailed view
      const dData = await fetchImpactMetrics(selectedYear);
      setImpactMetrics(dData);
      
      setLastUpdated(new Date());
      if (selectedMetricIndex >= dData.length) {
        setSelectedMetricIndex(0);
      }
    } catch (err) {
      console.error('Error fetching metrics:', err);
      setError('Failed to fetch data from Google Sheets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [selectedYear]);

  const toggleView = () => {
    setViewMode(viewMode === 'summary' ? 'detailed' : 'summary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedMetric = impactMetrics[selectedMetricIndex];

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
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: { font: { family: i18n.language === 'bn' ? 'Bornomala' : 'Ubuntu Sans' } },
      },
      x: {
        grid: { display: false },
        ticks: { font: { family: i18n.language === 'bn' ? 'Bornomala' : 'Ubuntu Sans' } },
      },
    },
  };

  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: i18n.language === 'bn' ? 'প্রকৃত পরিমাণ' : 'Actual Amount',
        data: selectedMetric?.monthlyActuals || [],
        borderColor: 'rgb(14, 165, 233)',
        backgroundColor: 'rgba(14, 165, 233, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: 'rgb(14, 165, 233)',
      },
    ],
  };

  const quarterlyData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: i18n.language === 'bn' ? 'অর্জনের হার (%)' : 'Achievement Rate (%)',
        data: selectedMetric?.quarterlyAchievement || [],
        backgroundColor: [
          'rgba(20, 184, 166, 0.7)',
          'rgba(14, 165, 233, 0.7)',
          'rgba(249, 115, 22, 0.7)',
          'rgba(236, 72, 153, 0.7)',
        ],
        borderRadius: 8,
        borderWidth: 0,
      },
    ],
  };

  const SummaryCard = ({ title, desc, value, icon: Icon, color }: any) => (
    <motion.div 
      whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      className="bg-white rounded-2xl p-6 shadow-md border border-light-border flex flex-col items-center text-center transition-all h-full"
    >
      <div className={`p-4 rounded-2xl mb-4 bg-${color}/10`}>
        <Icon className={`w-8 h-8 text-${color}`} />
      </div>
      <h4 className={`text-3xl font-black mb-1 text-light-text tracking-tight ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
        {value}
      </h4>
      <p className={`font-bold text-light-text mb-2 text-sm leading-tight ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
        {title}
      </p>
      <p className={`text-xs text-light-muted leading-snug ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
        {desc}
      </p>
    </motion.div>
  );

  const SummaryView = () => {
    if (!publicMetrics && loading) return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-12 animate-pulse">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-48 bg-white rounded-2xl border border-light-border shadow-sm"></div>
        ))}
      </div>
    );

    if (!publicMetrics) return null;

    return (
      <div className="mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <SummaryCard 
            title={i18n.language === 'bn' ? 'পরিবার উপকৃত' : 'Families Served'} 
            desc={i18n.language === 'bn' ? 'সরাসরি কর্মসূচির মাধ্যমে উপকৃত পরিবার' : 'Families directly served through SHOMAJGORI programs'} 
            value={publicMetrics.familiesServed} 
            icon={Users} 
            color="primary" 
          />
          <SummaryCard 
            title={i18n.language === 'bn' ? 'শিক্ষার্থী তালিকাভুক্তি' : 'Tutoring Enrollment'} 
            desc={i18n.language === 'bn' ? 'টিউরিং প্রোগ্রামে শিক্ষার্থীর সংখ্যা' : 'Number of students enrolled in tutoring programs'} 
            value={publicMetrics.tutoringEnrollment} 
            icon={BookOpen} 
            color="secondary-teal" 
          />
          <SummaryCard 
            title={i18n.language === 'bn' ? 'শিক্ষার্থীদের উন্নতি' : 'Student Improvement'} 
            desc={i18n.language === 'bn' ? 'একাডেমিক উন্নতি প্রদর্শনকারী শিক্ষার্থী' : 'Percentage of students showing academic improvement'} 
            value={publicMetrics.studentImprovement} 
            icon={TrendingUp} 
            color="secondary-orange" 
          />
          <SummaryCard 
            title={i18n.language === 'bn' ? 'মেন্টরিং প্রাপ্ত যুব' : 'Youth Mentored'} 
            desc={i18n.language === 'bn' ? 'মেন্টরিং এবং নির্দেশনা প্রাপ্ত তরুণ' : 'Young people receiving ongoing mentoring and guidance'} 
            value={publicMetrics.youthMentored} 
            icon={UserPlus} 
            color="secondary-pink" 
          />
          <SummaryCard 
            title={i18n.language === 'bn' ? 'সম্পৃক্ত নেতৃবৃন্দ' : 'Local Leaders'} 
            desc={i18n.language === 'bn' ? 'নেতৃত্বে কাজ করা স্থানীয় সদস্য' : 'Community members serving in leadership roles'} 
            value={publicMetrics.localLeadersEmpowered} 
            icon={Award} 
            color="primary" 
          />
          <SummaryCard 
            title={i18n.language === 'bn' ? 'রোলপ্লে সেশন' : 'Roleplay Sessions'} 
            desc={i18n.language === 'bn' ? 'সৃজনশীল সংলাপ ও সচেতনতামূলক সেশন' : 'Creative dialogues building awareness and talent'} 
            value={publicMetrics.roleplaySessions} 
            icon={Mic2} 
            color="secondary-teal" 
          />
          <SummaryCard 
            title={i18n.language === 'bn' ? 'স্বাস্থ্য সুবিধাপ্রাপ্ত' : 'Health Participants'} 
            desc={i18n.language === 'bn' ? 'স্বাস্থ্য সচেতনতামূলক কর্মসূচির সদস্য' : 'Community members reached through health activities'} 
            value={publicMetrics.healthParticipants} 
            icon={Activity} 
            color="secondary-orange" 
          />
          <SummaryCard 
            title={i18n.language === 'bn' ? 'সামাজিক কর্মসূচি' : 'Community Programs'} 
            desc={i18n.language === 'bn' ? 'বাস্তবায়িত মোট সামাজিক কর্মসূচি' : 'Community programs initiated and implemented'} 
            value={publicMetrics.communityPrograms} 
            icon={Layout} 
            color="secondary-pink" 
          />
          <SummaryCard 
            title={i18n.language === 'bn' ? 'আর্থিক স্বনির্ভরতা' : 'Financial Sustainability'} 
            desc={i18n.language === 'bn' ? 'স্থানীয় আয়ের মাধ্যমে পরিচালিত ব্যয়' : '% of operational costs covered by local income'} 
            value={publicMetrics.financialSustainability} 
            icon={DollarSign} 
            color="primary" 
          />
          <SummaryCard 
            title={i18n.language === 'bn' ? 'প্রভাবিত জীবন' : 'Lives Impacted'} 
            desc={i18n.language === 'bn' ? 'কর্মসূচির মাধ্যমে উপকৃত মোট মানুষ' : 'Total community members reached through all programs'} 
            value={publicMetrics.livesImpacted} 
            icon={Heart} 
            color="secondary-teal" 
          />
        </div>

        <div className="mt-16 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleView}
            className="flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-primary to-primary/80 text-white rounded-2xl shadow-2xl hover:shadow-primary/30 transition-all font-bold text-lg"
          >
            <span>{i18n.language === 'bn' ? 'বিস্তারিত পরিসংখ্যান দেখুন' : 'Get More Detailed View'}</span>
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    );
  };

  const DetailedView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center justify-between mb-10">
        <button 
          onClick={toggleView}
          className="flex items-center space-x-2 text-light-muted hover:text-primary transition-colors font-bold group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className={i18n.language === 'bn' ? 'font-bengali' : 'font-english'}>
            {i18n.language === 'bn' ? 'পূর্বের পাতায় ফিরে যান' : 'Back to Summary'}
          </span>
        </button>
      </div>

      {/* Selectors */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-light-border mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <label className={`block text-xs font-bold text-light-muted uppercase tracking-wider mb-2 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              {i18n.language === 'bn' ? 'বছর নির্বাচন' : 'Target Year'}
            </label>
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                disabled={loading}
                className="w-full appearance-none bg-light-bg border border-light-border rounded-xl px-4 py-3.5 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-light-text font-semibold transition-all cursor-pointer disabled:opacity-60"
              >
                {years.map(year => <option key={year} value={year}>{year}</option>)}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown className="w-5 h-5 text-light-muted" />
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className={`block text-xs font-bold text-light-muted uppercase tracking-wider mb-2 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              {i18n.language === 'bn' ? 'মেট্রিক বিশ্লেষণ' : 'Impact Metric'}
            </label>
            <div className="relative">
              <select
                value={selectedMetricIndex}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedMetricIndex(parseInt(e.target.value))}
                disabled={loading || impactMetrics.length === 0}
                className="w-full appearance-none bg-light-bg border border-light-border rounded-xl px-4 py-3.5 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-light-text font-semibold transition-all cursor-pointer disabled:opacity-60 overflow-hidden text-ellipsis"
              >
                {impactMetrics.length > 0 ? (
                  impactMetrics.map((item, index) => (
                    <option key={index} value={index}>[{item.domain}] {item.metric}</option>
                  ))
                ) : (
                  <option>{loading ? 'Loading...' : 'No data available'}</option>
                )}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown className="w-5 h-5 text-light-muted" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      {!loading && selectedMetric && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-light-border hover:shadow-xl transition-shadow group">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-light-muted text-xs font-bold uppercase tracking-tight mb-1 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>{i18n.language === 'bn' ? 'বার্ষিক লক্ষ্য' : 'Annual Target'}</p>
                <p className="text-3xl font-bold text-light-text tracking-tight">{selectedMetric.annualTarget.toFixed(1)}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-light-border hover:shadow-xl transition-shadow group">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-light-muted text-xs font-bold uppercase tracking-tight mb-1 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>{i18n.language === 'bn' ? 'মোট অর্জন' : 'Total Achieved'}</p>
                <p className="text-3xl font-bold text-light-text tracking-tight">{selectedMetric.monthlyActuals.reduce((a, b) => a + b, 0).toFixed(1)}</p>
              </div>
              <div className="w-12 h-12 bg-secondary-teal/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-secondary-teal" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-light-border hover:shadow-xl transition-shadow group">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-light-muted text-xs font-bold uppercase tracking-tight mb-1 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>{i18n.language === 'bn' ? 'অর্জনের হার' : 'Success Rate'}</p>
                <p className="text-3xl font-bold text-primary">{selectedMetric.annualAchievement}%</p>
              </div>
              <div className="w-12 h-12 bg-secondary-orange/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6 text-secondary-orange" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-light-border hover:shadow-xl transition-shadow group">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-light-muted text-xs font-bold uppercase tracking-tight mb-1 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>{i18n.language === 'bn' ? 'ডোমেইন' : 'Focus Area'}</p>
                <p className="text-lg font-bold text-light-text truncate max-w-[140px]">{selectedMetric.domain}</p>
              </div>
              <div className="w-12 h-12 bg-secondary-pink/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-secondary-pink" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Charts */}
      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-light-border">
            <h3 className="text-xl font-bold text-light-text mb-6 flex items-center">
              <div className="w-2 h-6 bg-primary rounded-full mr-3"></div>
              {i18n.language === 'bn' ? 'মাসিক অগ্রগতি' : 'Monthly Performance'}
            </h3>
            <div className="h-80"><Line data={monthlyData} options={chartOptions} /></div>
          </div>
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-light-border">
            <h3 className="text-xl font-bold text-light-text mb-6 flex items-center">
              <div className="w-2 h-6 bg-secondary-teal rounded-full mr-3"></div>
              {i18n.language === 'bn' ? 'ত্রৈমাসিক অর্জন (%)' : 'Quarterly Achievement (%)'}
            </h3>
            <div className="h-80"><Bar data={quarterlyData} options={chartOptions} /></div>
          </div>
        </div>
      )}

      {/* Annual Progress */}
      {!loading && selectedMetric && (
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-light-border relative overflow-hidden">
            <h3 className="text-2xl font-bold text-light-text text-center mb-8">
              {i18n.language === 'bn' ? `${selectedYear} বার্ষিক লক্ষ্য অর্জন` : `${selectedYear} Annual Target Progress`}
            </h3>
            <div className="relative pt-1 max-w-2xl mx-auto">
              <div className="flex mb-3 items-center justify-between">
                <span className="text-xs font-bold uppercase rounded-full text-primary bg-primary/10 px-3 py-1.5">
                  {i18n.language === 'bn' ? 'অগ্রগতি' : 'Progress'}
                </span>
                <span className="text-3xl font-black text-primary">{selectedMetric.annualAchievement}%</span>
              </div>
              <div className="h-6 rounded-full bg-light-bg border border-light-border p-1 overflow-hidden">
                <div 
                  style={{ width: `${Math.min(selectedMetric.annualAchievement, 100)}%` }} 
                  className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-1000 ease-out"
                ></div>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="p-6 bg-light-bg/50 rounded-2xl border border-light-border text-center">
                <p className="text-xs font-bold text-light-muted uppercase tracking-widest mb-1">{i18n.language === 'bn' ? 'লক্ষ্যমাত্রা' : 'Annual Goal'}</p>
                <p className="text-2xl font-bold text-light-text">{selectedMetric.annualTarget.toFixed(1)}</p>
              </div>
              <div className="p-6 bg-light-bg/50 rounded-2xl border border-light-border text-center">
                <p className="text-xs font-bold text-light-muted uppercase tracking-widest mb-1">{i18n.language === 'bn' ? 'অর্জিত' : 'Current Total'}</p>
                <p className="text-2xl font-bold text-light-text">{selectedMetric.monthlyActuals.reduce((a, b) => a + b, 0).toFixed(1)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Embedded Chart */}
      <div className='bg-white p-6 rounded-3xl shadow-xl border border-light-border mb-12 flex flex-col items-center'>
        <h3 className="text-xl font-bold text-light-text mb-6">
          {i18n.language === 'bn' ? 'ইমপ্যাক্ট ম্যাট্রিক্স চার্ট (লাইভ)' : 'Interactive Impact Matrix'}
        </h3>
        <div className="w-full overflow-x-auto rounded-xl">
          <iframe 
            width="100%" height="568" className="min-w-[800px]" seamless frameBorder="0" scrolling="no" 
            src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSdXkCAqK0oUxU4lfay0EcgqpfcjqWwyrw1RHc1lH-M269fp_F1QhZTQvUpJoTgKtholmzeNroa8cKo/pubchart?oid=1470004999&amp;format=interactive" 
            title="Impact Matrix Chart"
          ></iframe>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-light-bg pt-24 pb-12">
      <div className="container-custom section-padding">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className={`text-4xl md:text-5xl font-bold text-light-text mb-4 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
            {i18n.language === 'bn' ? 'বিশ্লেষণ ও পরিসংখ্যান' : 'Impact Analytics'}
          </h1>
          <p className={`text-lg text-light-muted max-w-2xl mx-auto ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
            {i18n.language === 'bn' 
              ? 'আমাদের কাজের প্রভাব এবং অগ্রগতি রিয়েল-টাইমে দেখুন' 
              : 'Real-time monitoring of our programs and community impact'
            }
          </p>
          
          <div className="flex flex-wrap items-center justify-center mt-8 gap-4">
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center space-x-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className={`font-medium ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                {i18n.language === 'bn' ? 'রিফ্রেশ' : 'Refresh Data'}
              </span>
            </button>
            <div className="flex items-center space-x-3 text-light-muted text-sm px-5 py-2.5 bg-white rounded-xl border border-light-border shadow-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span className={`font-medium ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                {i18n.language === 'bn' ? 'আপডেট' : 'Refreshed'}: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'summary' ? (
            <motion.div
              key="summary"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <SummaryView />
            </motion.div>
          ) : (
            <motion.div
              key="detailed"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DetailedView />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Analytics;
