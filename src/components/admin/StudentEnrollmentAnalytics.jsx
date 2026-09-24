import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Calendar, 
  Users, 
  UserPlus, 
  Sparkles, 
  Activity, 
  BarChart3, 
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Info
} from 'lucide-react';

// Realistic demo data as requested by user
export const MONTHLY_ENROLLMENT_DATA = [
  { month: 'Jan', fullMonth: 'January 2026', students: 42, basePrev: 38 },
  { month: 'Feb', fullMonth: 'February 2026', students: 55 },
  { month: 'Mar', fullMonth: 'March 2026', students: 48 },
  { month: 'Apr', fullMonth: 'April 2026', students: 67 },
  { month: 'May', fullMonth: 'May 2026', students: 72 },
  { month: 'Jun', fullMonth: 'June 2026', students: 61 },
  { month: 'Jul', fullMonth: 'July 2026', students: 80 },
  { month: 'Aug', fullMonth: 'August 2026', students: 76 },
  { month: 'Sep', fullMonth: 'September 2026', students: 91 },
  { month: 'Oct', fullMonth: 'October 2026', students: 85 },
  { month: 'Nov', fullMonth: 'November 2026', students: 98 },
  { month: 'Dec', fullMonth: 'December 2026', students: 110 },
];

/**
 * Catmull-Rom / Cubic Hermite spline calculator for smooth trading chart curves
 */
function buildSmoothSvgPath(points) {
  if (!points || points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;

  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;

  for (let i = 0; i < points.length - 1; i++) {
    const pPrev = points[i - 1] || points[i];
    const pCurr = points[i];
    const pNext = points[i + 1];
    const pNextNext = points[i + 2] || pNext;

    // Tension factor of 6 produces standard smooth financial curves
    const cp1x = pCurr.x + (pNext.x - pPrev.x) / 6;
    const cp1y = pCurr.y + (pNext.y - pPrev.y) / 6;

    const cp2x = pNext.x - (pNextNext.x - pCurr.x) / 6;
    const cp2y = pNext.y - (pNextNext.y - pCurr.y) / 6;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${pNext.x.toFixed(1)} ${pNext.y.toFixed(1)}`;
  }

  return d;
}

export default function StudentEnrollmentAnalytics() {
  const [timeRange, setTimeRange] = useState('This Year'); // 'This Year' | 'Last 6 Months' | 'Last 12 Months'
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Filter dataset based on selected dropdown
  const chartData = useMemo(() => {
    if (timeRange === 'Last 6 Months') {
      return MONTHLY_ENROLLMENT_DATA.slice(6);
    }
    // 'This Year' and 'Last 12 Months' both show the full 12 months sequence
    return MONTHLY_ENROLLMENT_DATA;
  }, [timeRange]);

  // Default active index to the latest month if user is not hovering
  const activeIndex = hoveredIdx !== null ? hoveredIdx : chartData.length - 1;
  const activeItem = chartData[activeIndex] || chartData[chartData.length - 1];

  // Helper to compute change vs previous month
  const getMonthComparison = (index, dataList) => {
    const item = dataList[index];
    if (!item) return { diff: 0, pct: '0.0', type: 'neutral', prevStudents: 0 };

    let prevCount = 0;
    if (index > 0) {
      prevCount = dataList[index - 1].students;
    } else {
      // Baseline prior month comparison (Dec 2025: 38)
      prevCount = item.basePrev || 38;
    }

    const diff = item.students - prevCount;
    const pctVal = prevCount > 0 ? (diff / prevCount) * 100 : 0;
    const pct = Math.abs(pctVal).toFixed(1);

    if (diff > 0) return { diff, pct, type: 'up', prevStudents: prevCount, sign: '+' };
    if (diff < 0) return { diff, pct, type: 'down', prevStudents: prevCount, sign: '-' };
    return { diff: 0, pct: '0.0', type: 'neutral', prevStudents: prevCount, sign: '' };
  };

  const activeComparison = getMonthComparison(activeIndex, chartData);

  // SVG dimensions
  const svgWidth = 960;
  const svgHeight = 360;
  const padLeft = 65;
  const padRight = 45;
  const padTop = 45;
  const padBottom = 55;

  const plotWidth = svgWidth - padLeft - padRight;
  const plotHeight = svgHeight - padTop - padBottom;

  // Dynamic Y Scale based on current data
  const maxVal = Math.max(...chartData.map(d => d.students), 110);
  const minVal = 0;
  const yCeiling = Math.ceil(maxVal / 20) * 20 + 10; // e.g. 130 for 110 max

  // Calculate coordinates for each point
  const points = useMemo(() => {
    const n = chartData.length;
    return chartData.map((d, i) => {
      const x = padLeft + (n > 1 ? (i / (n - 1)) * plotWidth : plotWidth / 2);
      const y = padTop + (1 - (d.students - minVal) / (yCeiling - minVal)) * plotHeight;
      return { x, y, data: d, index: i };
    });
  }, [chartData, plotWidth, plotHeight, yCeiling]);

  // Generate smooth cubic bezier line path and area path
  const smoothLinePath = useMemo(() => buildSmoothSvgPath(points), [points]);
  
  const smoothAreaPath = useMemo(() => {
    if (points.length === 0) return '';
    const bottomY = padTop + plotHeight;
    return `${smoothLinePath} L ${points[points.length - 1].x.toFixed(1)} ${bottomY.toFixed(1)} L ${points[0].x.toFixed(1)} ${bottomY.toFixed(1)} Z`;
  }, [smoothLinePath, points, padTop, plotHeight]);

  // Y-Axis tick intervals: e.g. [0, 30, 60, 90, 120]
  const yTicks = [0, 30, 60, 90, 120];

  // Mouse move handler over SVG to find nearest data point
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * svgWidth;

    let closestIdx = 0;
    let minDistance = Infinity;

    points.forEach((pt, idx) => {
      const dist = Math.abs(pt.x - mouseX);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }
    });

    setHoveredIdx(closestIdx);
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
  };

  const currentHoveredPoint = points[activeIndex] || points[points.length - 1];

  // Summary Metrics calculations
  const totalEnrolledLearners = MONTHLY_ENROLLMENT_DATA.reduce((acc, curr) => acc + curr.students, 0); // 885
  const latestMonthIntake = MONTHLY_ENROLLMENT_DATA[MONTHLY_ENROLLMENT_DATA.length - 1].students; // 110
  const prevMonthIntake = MONTHLY_ENROLLMENT_DATA[MONTHLY_ENROLLMENT_DATA.length - 2].students; // 98
  const thisMonthGrowthPct = (((latestMonthIntake - prevMonthIntake) / prevMonthIntake) * 100).toFixed(1); // 12.2%
  const annualFirstMonth = MONTHLY_ENROLLMENT_DATA[0].students; // 42
  const overallYearlyGrowthPct = (((latestMonthIntake - annualFirstMonth) / annualFirstMonth) * 100).toFixed(1); // +161.9%
  const quarterlyNewIntake = MONTHLY_ENROLLMENT_DATA.slice(-3).reduce((acc, c) => acc + c.students, 0); // 85+98+110 = 293

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION HEADER                                                */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-600/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <h3 className="text-base font-black text-slate-950 tracking-tight">
              Student Enrollment Analytics
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Velocity
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-600 mt-1">
            Month-wise admission intake performance, cohort acceleration, and intake velocity trajectories.
          </p>
        </div>

        {/* TIME RANGE FILTER DROPDOWN */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-1.5 text-xs">
              <Calendar className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <select
                value={timeRange}
                onChange={(e) => {
                  setTimeRange(e.target.value);
                  setHoveredIdx(null);
                }}
                className="bg-transparent font-bold text-slate-700 dark:text-slate-200 outline-none cursor-pointer pr-1"
              >
                <option value="This Year" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">This Year (Jan - Dec)</option>
                <option value="Last 6 Months" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Last 6 Months (Jul - Dec)</option>
                <option value="Last 12 Months" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Last 12 Months</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 1. ANALYTICS SUMMARY CARDS (WITH TREND INDICATORS)             */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* CARD 1: Total Students */}
        <div className="bg-white dark:bg-slate-900/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs relative overflow-hidden group hover:border-purple-500/40 transition-all">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Total Students
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {totalEnrolledLearners.toLocaleString()}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1 font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-lg text-[11px]">
              <ArrowUpRight className="w-3 h-3" /> ↑ 14.8%
            </span>
            <span className="text-[11px] text-slate-400">vs prev. calendar year</span>
          </div>
        </div>

        {/* CARD 2: New Enrollments */}
        <div className="bg-white dark:bg-slate-900/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs relative overflow-hidden group hover:border-indigo-500/40 transition-all">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                New Enrollments
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {quarterlyNewIntake}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <UserPlus className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1 font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-lg text-[11px]">
              <ArrowUpRight className="w-3 h-3" /> ↑ 12.5%
            </span>
            <span className="text-[11px] text-slate-400">Q4 active enrollment surge</span>
          </div>
        </div>

        {/* CARD 3: This Month's Enrollment */}
        <div className="bg-white dark:bg-slate-900/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                This Month's Enrollment
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-baseline gap-1.5">
                {latestMonthIntake}
                <span className="text-xs font-semibold text-slate-400">Students</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1 font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-lg text-[11px]">
              <ArrowUpRight className="w-3 h-3" /> ↑ {thisMonthGrowthPct}%
            </span>
            <span className="text-[11px] text-slate-400">vs Nov (98 students)</span>
          </div>
        </div>

        {/* CARD 4: Enrollment Growth % */}
        <div className="bg-white dark:bg-slate-900/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs relative overflow-hidden group hover:border-purple-500/40 transition-all">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Enrollment Growth %
              </span>
              <div className="text-2xl font-black text-purple-600 dark:text-purple-400 tracking-tight">
                +{overallYearlyGrowthPct}%
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1 font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-lg text-[11px]">
              <ArrowUpRight className="w-3 h-3" /> ↑ 161.9%
            </span>
            <span className="text-[11px] text-slate-400">Jan (42) → Dec (110)</span>
          </div>
        </div>

      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2. TRADING-STYLE STUDENT ENROLLMENT CHART                     */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        
        {/* Subtle radial backdrop glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Chart Header Bar */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-wider text-purple-400 uppercase">
                ACADEMY INTAKE INDEX (M-E-I)
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">1M Interval</span>
            </div>
            <div className="flex items-baseline gap-3 mt-1">
              <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {activeItem?.students} <span className="text-sm font-semibold text-slate-400">Enrolled Students</span>
              </h4>

              {/* DYNAMIC PERCENTAGE CHANGE BADGE */}
              <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-black border transition-all ${
                activeComparison.type === 'up'
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                  : activeComparison.type === 'down'
                  ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                  : 'bg-slate-700/40 text-slate-300 border-slate-600/30'
              }`}>
                {activeComparison.type === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
                {activeComparison.type === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
                {activeComparison.type === 'neutral' && <Minus className="w-3.5 h-3.5" />}
                <span>
                  {activeComparison.type === 'up' ? `↑ +${activeComparison.pct}%` : activeComparison.type === 'down' ? `↓ -${activeComparison.pct}%` : `→ 0.0%`}
                </span>
                <span className="text-[10px] opacity-75 font-normal ml-0.5">
                  ({activeItem?.fullMonth})
                </span>
              </div>
            </div>
          </div>

          {/* Quick Legend / Info */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-violet-400 rounded-full" />
              <span>Intake Momentum Curve</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Surge Month (↑)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span>Dip Month (↓)</span>
            </div>
          </div>
        </div>

        {/* ─── SVG CHART CANVAS ────────────────────────────────────────── */}
        <div className="relative mt-6 select-none">
          
          {/* FLOATING HOVER TOOLTIP */}
          {currentHoveredPoint && (
            <div 
              className="absolute pointer-events-none z-30 transition-all duration-150 ease-out"
              style={{
                left: `${(currentHoveredPoint.x / svgWidth) * 100}%`,
                top: `${(currentHoveredPoint.y / svgHeight) * 100}%`,
                transform: 'translate(-50%, -125%)'
              }}
            >
              <div className="bg-slate-950/95 backdrop-blur-md border border-purple-500/40 shadow-2xl rounded-2xl p-3 w-56 text-left space-y-1.5 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-[11px] font-extrabold text-white">
                    {currentHoveredPoint.data.fullMonth}
                  </span>
                  <span className="text-[10px] font-mono text-purple-400 font-bold">
                    #{currentHoveredPoint.index + 1}
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-0.5">
                  <span className="text-xs text-slate-400">Enrollments:</span>
                  <span className="text-sm font-black text-white">
                    {currentHoveredPoint.data.students} Learners
                  </span>
                </div>

                {/* Status indicator with explicit user requirements */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-400">MoM Change:</span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-black ${
                    activeComparison.type === 'up'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : activeComparison.type === 'down'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {activeComparison.type === 'up' && <>↑ +{activeComparison.pct}%</>}
                    {activeComparison.type === 'down' && <>↓ -{activeComparison.pct}%</>}
                    {activeComparison.type === 'neutral' && <>→ 0.0%</>}
                  </span>
                </div>

                <div className="text-[10px] text-slate-400 text-right pt-0.5">
                  {activeComparison.type === 'up' && (
                    <span className="text-emerald-400 font-medium">+{activeComparison.diff} from prev month ({activeComparison.prevStudents})</span>
                  )}
                  {activeComparison.type === 'down' && (
                    <span className="text-rose-400 font-medium">-{Math.abs(activeComparison.diff)} from prev month ({activeComparison.prevStudents})</span>
                  )}
                  {activeComparison.type === 'neutral' && (
                    <span className="text-slate-400 font-medium">Matched previous month</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SVG Container */}
          <div className="w-full overflow-x-auto custom-scrollbar">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto min-w-[700px] overflow-visible cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <defs>
                {/* Area Gradient (Trading-style smooth fade) */}
                <linearGradient id="tradingAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.45" />
                  <stop offset="45%" stopColor="#6366f1" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="0.0" />
                </linearGradient>

                {/* Line Gradient (Glowing cyan-to-purple neon) */}
                <linearGradient id="tradingLineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="35%" stopColor="#818cf8" />
                  <stop offset="70%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>

                {/* Neon Glow Filter */}
                <filter id="tradingGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#a855f7" floodOpacity="0.6" />
                </filter>
              </defs>

              {/* ─── HORIZONTAL GRID LINES & Y-AXIS LABELS ───────────────── */}
              {yTicks.map((val) => {
                const yPos = padTop + (1 - (val - minVal) / (yCeiling - minVal)) * plotHeight;
                return (
                  <g key={val} className="text-slate-700/60">
                    <line
                      x1={padLeft}
                      y1={yPos}
                      x2={padLeft + plotWidth}
                      y2={yPos}
                      stroke="currentColor"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                    <text
                      x={padLeft - 14}
                      y={yPos + 4}
                      textAnchor="end"
                      fill="#94a3b8"
                      fontSize="11"
                      fontFamily="monospace"
                      fontWeight="600"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* ─── VERTICAL GUIDELINES FOR EACH MONTH ──────────────────── */}
              {points.map((pt, i) => (
                <line
                  key={i}
                  x1={pt.x}
                  y1={padTop}
                  x2={pt.x}
                  y2={padTop + plotHeight}
                  stroke={i === activeIndex ? '#475569' : '#1e293b'}
                  strokeDasharray={i === activeIndex ? '2 2' : '1 5'}
                  strokeWidth="1"
                />
              ))}

              {/* ─── AREA UNDER THE CURVE ─────────────────────────────────── */}
              <path
                d={smoothAreaPath}
                fill="url(#tradingAreaGrad)"
                className="transition-all duration-300"
              />

              {/* ─── SMOOTH CURVED LINE (THE TRADING TREND) ───────────────── */}
              <path
                d={smoothLinePath}
                fill="none"
                stroke="url(#tradingLineGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#tradingGlow)"
                className="transition-all duration-300"
              />

              {/* ─── DATA POINTS ON THE LINE ──────────────────────────────── */}
              {points.map((pt, i) => {
                const comp = getMonthComparison(i, chartData);
                const isHovered = i === activeIndex;

                // Point styling: green for up, red for down
                const dotColor = comp.type === 'up' ? '#10b981' : comp.type === 'down' ? '#f43f5e' : '#a855f7';

                return (
                  <g key={i} className="transition-all duration-200">
                    {/* Hover Pulse Ring */}
                    {isHovered && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="12"
                        fill={dotColor}
                        fillOpacity="0.25"
                        className="animate-ping"
                      />
                    )}

                    {/* Outer Circle */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? '6.5' : '4'}
                      fill="#0f172a"
                      stroke={dotColor}
                      strokeWidth={isHovered ? '3' : '2'}
                      className="cursor-pointer"
                    />

                    {/* Center Core */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? '3' : '1.8'}
                      fill="#ffffff"
                    />
                  </g>
                );
              })}

              {/* ─── CROSSHAIR AT CURRENT ACTIVE POINT ────────────────────── */}
              {currentHoveredPoint && (
                <g className="pointer-events-none">
                  {/* Vertical crosshair */}
                  <line
                    x1={currentHoveredPoint.x}
                    y1={padTop}
                    x2={currentHoveredPoint.x}
                    y2={padTop + plotHeight}
                    stroke="#a855f7"
                    strokeDasharray="3 3"
                    strokeWidth="1.5"
                  />

                  {/* Horizontal crosshair */}
                  <line
                    x1={padLeft}
                    y1={currentHoveredPoint.y}
                    x2={padLeft + plotWidth}
                    y2={currentHoveredPoint.y}
                    stroke="#64748b"
                    strokeDasharray="2 3"
                    strokeWidth="1"
                    strokeOpacity="0.6"
                  />

                  {/* Y-Axis Value Pill */}
                  <rect
                    x={padLeft - 50}
                    y={currentHoveredPoint.y - 10}
                    width="44"
                    height="20"
                    rx="6"
                    fill="#8b5cf6"
                  />
                  <text
                    x={padLeft - 28}
                    y={currentHoveredPoint.y + 4}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="800"
                  >
                    {currentHoveredPoint.data.students}
                  </text>
                </g>
              )}

              {/* ─── X-AXIS MONTH LABELS ──────────────────────────────────── */}
              {points.map((pt, i) => {
                const isHovered = i === activeIndex;
                const comp = getMonthComparison(i, chartData);

                return (
                  <g key={i}>
                    {/* Month Text */}
                    <text
                      x={pt.x}
                      y={padTop + plotHeight + 22}
                      textAnchor="middle"
                      fill={isHovered ? '#ffffff' : '#94a3b8'}
                      fontSize={isHovered ? '12' : '11'}
                      fontWeight={isHovered ? '800' : '600'}
                      className="cursor-pointer"
                    >
                      {pt.data.month}
                    </text>

                    {/* Small trend arrow indicator below month label */}
                    <text
                      x={pt.x}
                      y={padTop + plotHeight + 36}
                      textAnchor="middle"
                      fill={comp.type === 'up' ? '#10b981' : comp.type === 'down' ? '#f43f5e' : '#64748b'}
                      fontSize="9"
                      fontWeight="bold"
                    >
                      {comp.type === 'up' ? '▲' : comp.type === 'down' ? '▼' : '—'}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* ─── MONTH SELECTOR TAPE (CLICK OR HOVER ANY MONTH) ───────── */}
        <div className="mt-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
              Monthly Data Tape & MoM Changes
            </span>
            <span className="text-[10px] text-slate-500">
              Click or hover any month to highlight
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-1.5">
            {chartData.map((item, idx) => {
              const comp = getMonthComparison(idx, chartData);
              const isSelected = idx === activeIndex;

              return (
                <button
                  key={item.month}
                  onClick={() => setHoveredIdx(idx)}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-600/20 border-purple-500 text-white shadow-md ring-1 ring-purple-500/50'
                      : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="text-[11px] font-bold">{item.month}</div>
                  <div className="text-xs font-black text-white mt-0.5">{item.students}</div>
                  <div className={`text-[9px] font-extrabold mt-0.5 ${
                    comp.type === 'up' ? 'text-emerald-400' : comp.type === 'down' ? 'text-rose-400' : 'text-slate-400'
                  }`}>
                    {comp.type === 'up' ? `↑+${comp.pct}%` : comp.type === 'down' ? `↓-${comp.pct}%` : `0%`}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── TRADING HIGHLIGHTS / TERMINAL METRICS ROW ─────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800/80 text-xs">
          
          <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Peak Month (ATH)
            </span>
            <div className="font-extrabold text-white text-sm mt-0.5 flex items-center justify-between">
              <span>December</span>
              <span className="text-emerald-400 font-mono">110 Students</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-medium">+12.2% monthly gain</span>
          </div>

          <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Lowest Intake (ATL)
            </span>
            <div className="font-extrabold text-white text-sm mt-0.5 flex items-center justify-between">
              <span>January</span>
              <span className="text-amber-400 font-mono">42 Students</span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Q1 baseline cohort</span>
          </div>

          <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Monthly Average Run-Rate
            </span>
            <div className="font-extrabold text-white text-sm mt-0.5 flex items-center justify-between">
              <span>Intake Pace</span>
              <span className="text-purple-400 font-mono">73.8 / Month</span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Consistently above 70 after Jun</span>
          </div>

          <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Greatest Single Dip
            </span>
            <div className="font-extrabold text-white text-sm mt-0.5 flex items-center justify-between">
              <span>June</span>
              <span className="text-rose-400 font-mono">61 (-15.3%)</span>
            </div>
            <span className="text-[10px] text-rose-400 font-medium">-11 students vs May (72)</span>
          </div>

        </div>

      </div>

    </div>
  );
}
