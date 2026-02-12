'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Home, 
  Calendar, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Target, 
  PieChart, 
  FileText, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity,
  BarChart3,
  CreditCard,
  Receipt,
  Building,
  Calculator,
  Bell,
  Settings,
  Download,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import { useApi } from '@/lib/api';
import { Property } from '@/lib/data';

interface DashboardMetric {
  title: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'orange' | 'purple' | 'red';
}


interface Task {
  id: string;
  title: string;
  type: 'urgent' | 'warning' | 'info';
  dueDate: string;
  completed: boolean;
  action: string;
  actionUrl: string;
}

interface ReconciliationStatus {
  category: string;
  total: number;
  completed: number;
  pending: number;
  variance: number;
  status: 'complete' | 'in-progress' | 'attention';
}

export default function DashboardPage() {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [reconciliationStatus, setReconciliationStatus] = useState<ReconciliationStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const api = useApi();

  // Check for URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const skipOnboarding = urlParams.get('skipOnboarding');
    const reminder = urlParams.get('reminder');
    
    if (skipOnboarding === 'true' && reminder === 'bankStatements') {
      setShowReminder(true);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [selectedYear, selectedPeriod]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load dashboard metrics
      const metricsResponse = await api.getMetrics();
      if (metricsResponse.success && metricsResponse.data) {
        setMetrics(metricsResponse.data);
      }

      // Load properties
      const propertiesResponse = await api.getProperties();
      if (propertiesResponse.success && propertiesResponse.data) {
        setProperties(propertiesResponse.data.items);
      }

      // Load reconciliation status
      const reconciliationResponse = await api.getReconciliationItems();
      if (reconciliationResponse.success && reconciliationResponse.data) {
        setReconciliationStatus(reconciliationResponse.data);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const dashboardProperties: Property[] = [];

  const tasks: Task[] = [
    {
      id: 'task_1',
      title: 'Upload bank statements',
      type: 'urgent',
      dueDate: '2025-01-31',
      completed: false,
      action: 'Upload Statements',
      actionUrl: '/transactions'
    },
    {
      id: 'task_2',
      title: 'Reconcile 3 transactions with variance',
      type: 'warning',
      dueDate: '2025-01-25',
      completed: false,
      action: 'Review Transactions',
      actionUrl: '/transactions'
    },
    {
      id: 'task_3',
      title: 'Match 12 receipts to transactions',
      type: 'info',
      dueDate: '2025-01-20',
      completed: true,
      action: 'View Receipts',
      actionUrl: '/receipts'
    },
    {
      id: 'task_4',
      title: 'Generate Q4 T776 drafts',
      type: 'info',
      dueDate: '2025-01-28',
      completed: false,
      action: 'Generate Reports',
      actionUrl: '/reports'
    }
  ];

  const dashboardReconciliationStatus: ReconciliationStatus[] = [
    {
      category: 'Mortgage Interest',
      total: 3,
      completed: 2,
      pending: 1,
      variance: 156.80,
      status: 'in-progress'
    },
    {
      category: 'Transaction Matching',
      total: 156,
      completed: 144,
      pending: 12,
      variance: 0,
      status: 'in-progress'
    },
    {
      category: 'Receipt Uploads',
      total: 89,
      completed: 77,
      pending: 12,
      variance: 0,
      status: 'in-progress'
    },
    {
      category: 'T776 Generation',
      total: 3,
      completed: 0,
      pending: 3,
      variance: 0,
      status: 'attention'
    }
  ];

  const totalCashflow = properties.reduce((sum, prop) => sum + (prop.cashflow || 0), 0);
  const totalRent = properties.reduce((sum, prop) => sum + (prop.monthlyRent || 0), 0);
  const totalExpenses = properties.reduce((sum, prop) => sum + (prop.monthlyExpenses || 0), 0);
  const avgOccupancy = properties.length > 0 ? properties.reduce((sum, prop) => sum + (prop.occupancyRate || 0), 0) / properties.length : 0;
  const activeProperties = properties.filter(prop => prop.status === 'active').length;

  const readinessScore = Math.round(
    (reconciliationStatus.reduce((sum, cat) => sum + (cat.completed / cat.total) * 100, 0) / reconciliationStatus.length)
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(amount);
  };

  const getMetricColor = (color: string) => {
    const colors = {
      blue: 'from-blue-50 to-blue-100 border-blue-200',
      green: 'from-green-50 to-green-100 border-green-200',
      orange: 'from-orange-50 to-orange-100 border-orange-200',
      purple: 'from-purple-50 to-purple-100 border-purple-200',
      red: 'from-red-50 to-red-100 border-red-200'
    };
    return colors[color as keyof typeof colors];
  };

  const getTaskIcon = (type: string) => {
    const icons = {
      urgent: <AlertCircle className="w-4 h-4 text-red-600" />,
      warning: <Clock className="w-4 h-4 text-yellow-600" />,
      info: <CheckCircle className="w-4 h-4 text-blue-600" />
    };
    return icons[type as keyof typeof icons];
  };

  const getTaskColor = (type: string) => {
    const colors = {
      urgent: 'bg-red-50 border-red-200',
      warning: 'bg-yellow-50 border-yellow-200',
      info: 'bg-blue-50 border-blue-200'
    };
    return colors[type as keyof typeof colors];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      complete: 'text-green-700 bg-green-100',
      'in-progress': 'text-yellow-700 bg-yellow-100',
      attention: 'text-red-700 bg-red-100'
    };
    return colors[status as keyof typeof colors];
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Bank Statement Reminder */}
      {showReminder && (
        <div className="bg-blue-50 border-b-2 border-blue-200 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <div>
                <h4 className="text-blue-900 font-semibold">Don't forget to upload your bank statements!</h4>
                <p className="text-blue-700 text-sm">Upload your bank statements to automatically import transactions and categorize expenses.</p>
              </div>
            </div>
            <button
              onClick={() => setShowReminder(false)}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-3xl font-light text-slate-900" style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.02em' }}>
              Northfile
            </span>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-blue-600 font-medium">Dashboard</Link>
              <Link href="/properties" className="text-slate-600 hover:text-slate-900 transition-colors">Properties</Link>
              <Link href="/transactions" className="text-slate-600 hover:text-slate-900 transition-colors">Transactions</Link>
              <Link href="/receipts" className="text-slate-600 hover:text-slate-900 transition-colors">Receipts</Link>
              <Link href="/mortgages" className="text-slate-600 hover:text-slate-900 transition-colors">Mortgages</Link>
              <Link href="/reports" className="text-slate-600 hover:text-slate-900 transition-colors">Reports</Link>
              <Link href="/notices" className="text-slate-600 hover:text-slate-900 transition-colors">Notices</Link>
              <Link href="/collaboration" className="text-slate-600 hover:text-slate-900 transition-colors">Collaboration</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2">
              <Calendar className="w-4 h-4 text-slate-500" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="border-none focus:outline-none text-sm font-medium text-slate-700"
              >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="all">All Years</option>
              </select>
            </div>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button 
              onClick={() => {
                // Clear session and redirect to sign-in
                if (typeof window !== 'undefined') {
                  localStorage.removeItem('northfile_token');
                  localStorage.removeItem('northfile_user');
                  window.location.href = '/signin';
                }
              }}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Portfolio Dashboard</h1>
            <p className="text-slate-500 text-lg">Real-time insights and year-end readiness tracking</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2">
              <Activity className="w-4 h-4 text-slate-500" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border-none focus:outline-none text-sm font-medium text-slate-700"
              >
                <option value="month">Monthly</option>
                <option value="quarter">Quarterly</option>
                <option value="year">Yearly</option>
              </select>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export Report
            </button>
          </div>
        </div>

        {/* Readiness Meter */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Year-End Readiness</h2>
              <p className="text-blue-100">Track your progress toward tax filing completion</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold mb-1">{readinessScore}%</div>
              <p className="text-blue-100">Complete</p>
            </div>
          </div>
          <div className="w-full bg-blue-800 bg-opacity-50 rounded-full h-4 mb-6">
            <div 
              className="bg-white h-4 rounded-full transition-all duration-500"
              style={{ width: `${readinessScore}%` }}
            ></div>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {reconciliationStatus.map((status, index) => (
              <div key={index} className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-100">{status.category}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(status.status)}`}>
                    {status.status === 'complete' ? 'Done' : status.status === 'in-progress' ? 'In Progress' : 'Attention'}
                  </span>
                </div>
                <div className="text-lg font-bold mb-1">
                  {status.completed}/{status.total}
                </div>
                <div className="w-full bg-blue-800 bg-opacity-50 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full"
                    style={{ width: `${(status.completed / status.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className={`bg-gradient-to-br ${getMetricColor(metric.color)} border rounded-2xl p-6`}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-slate-700">{metric.title}</p>
                <div className={`p-2 rounded-lg bg-white bg-opacity-50`}>
                  {metric.icon}
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-1">{metric.value}</p>
              <div className="flex items-center gap-1">
                {metric.changeType === 'increase' ? (
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${
                  metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {Math.abs(metric.change)}%
                </span>
                <span className="text-sm text-slate-600">vs last period</span>
              </div>
            </div>
          ))}
        </div>

        {/* Reconciliation Banner */}
        {tasks.filter(task => !task.completed && task.type === 'urgent').length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-red-900 mb-1">Action Required</h3>
                <p className="text-red-700">
                  {tasks.filter(task => !task.completed && task.type === 'urgent').length} urgent task{tasks.filter(task => !task.completed && task.type === 'urgent').length > 1 ? 's' : ''} require immediate attention for year-end reconciliation.
                </p>
              </div>
              <Link
                href="/mortgages/year-end"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
              >
                Review Now
              </Link>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {/* Properties Overview */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">Properties Performance</h3>
                <Link
                  href="/properties"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                >
                  View All
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {properties.map((property) => (
                  <div key={property.id} className="border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-slate-900">{property.address}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            property.status === 'active' ? 'bg-green-100 text-green-700' :
                            property.status === 'vacant' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {property.status === 'active' ? 'Occupied' : 
                             property.status === 'vacant' ? 'Vacant' : 'Maintenance'}
                          </span>
                          <span className="text-xs text-slate-500">
                            {property.occupancyRate}% occupied
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${
                          (property.cashflow || 0) >= 0 ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {formatCurrency(property.cashflow || 0)}
                        </p>
                        <p className="text-xs text-slate-500">Monthly cashflow</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-slate-500">Rent</p>
                        <p className="font-semibold text-slate-900">{formatCurrency(property.monthlyRent || 0)}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Expenses</p>
                        <p className="font-semibold text-slate-900">{formatCurrency(property.monthlyExpenses || 0)}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">ROI</p>
                        <p className={`font-semibold ${
                          (property.roi || 0) >= 0 ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {property.roi || 0}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Portfolio Summary */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Total Monthly Cashflow</p>
                    <p className={`text-2xl font-bold ${
                      totalCashflow >= 0 ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {formatCurrency(totalCashflow)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Average Occupancy</p>
                    <p className="text-2xl font-bold text-slate-900">{avgOccupancy.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tasks & Checklist */}
          <div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">Year-End Checklist</h3>
                <span className="text-sm text-slate-500">
                  {tasks.filter(t => t.completed).length}/{tasks.length} complete
                </span>
              </div>
              
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className={`border rounded-lg p-4 ${getTaskColor(task.type)}`}>
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getTaskIcon(task.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium text-slate-900 ${task.completed ? 'line-through opacity-60' : ''}`}>
                          {task.title}
                        </h4>
                        <p className="text-sm text-slate-600 mb-2">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                        {!task.completed && (
                          <Link
                            href={task.actionUrl}
                            className="text-sm font-medium text-blue-600 hover:text-blue-700"
                          >
                            {task.action} →
                          </Link>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => {}}
                        className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        readOnly
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 mt-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">Active Properties</span>
                  </div>
                  <span className="font-semibold text-slate-900">{activeProperties}/{properties.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">Monthly Revenue</span>
                  </div>
                  <span className="font-semibold text-slate-900">{formatCurrency(totalRent)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">Monthly Expenses</span>
                  </div>
                  <span className="font-semibold text-slate-900">{formatCurrency(totalExpenses)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">Pending Receipts</span>
                  </div>
                  <span className="font-semibold text-slate-900">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">Mortgage Variance</span>
                  </div>
                  <span className="font-semibold text-red-700">{formatCurrency(156.80)}</span>
                </div>
              </div>
            </div>

            {/* Tax Season Resources */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mt-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">📊 Tax Season Resources</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <h4 className="font-semibold text-slate-900 mb-2">T776 Form Preparation</h4>
                  <p className="text-sm text-slate-600 mb-3">
                    Learn how to prepare your T776 rental income form without the year-end stress.
                  </p>
                  <Link 
                    href="/blog/how-to-prepare-t776-ontario-rental-taxes" 
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    Read Complete Guide →
                  </Link>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <h4 className="font-semibold text-slate-900 mb-2">Quick Tips</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Keep all receipts organized monthly</li>
                    <li>• Separate mortgage interest from principal</li>
                    <li>• Track partial-year rental periods</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
