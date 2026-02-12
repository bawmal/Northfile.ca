'use client';

import { useState, useEffect } from 'react';
import { 
  Upload, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Download, 
  Lock, 
  Clock, 
  Target,
  Users,
  ArrowLeft,
  Home,
  Calculator
} from 'lucide-react';
import Link from 'next/link';

interface YearEndMortgage {
  id: string;
  propertyId: string;
  propertyAddress: string;
  taxYear: number;
  originalLoan: number;
  interestRate: number;
  startDate: string;
  amortizationYears: number;
  
  // Estimated totals (in-year calculations)
  estimatedTotals: {
    interestPaid: number;
    principalPaid: number;
    totalPaid: number;
    endingBalance: number;
  };
  
  // Official totals (from lender statement)
  officialTotals?: {
    interestPaid: number;
    principalPaid: number;
    totalPaid: number;
    endingBalance: number;
    statementDate: string;
    fileName: string;
  };
  
  reconciliation: {
    status: 'pending' | 'reconciled' | 'variance_detected' | 'locked';
    variance: {
      interest: number;
      principal: number;
      total: number;
    };
    lastReconciled?: string;
    lockedAt?: string;
    notes?: string;
  };
  
  t776Impact: {
    deductibleInterest: number;
    ccaEligible: boolean;
    maxCCAClaim: number;
  };
}

export default function YearEndMortgagesPage() {
  const [mortgages, setMortgages] = useState<YearEndMortgage[]>([
    {
      id: 'ye_mortgage_1',
      propertyId: 'prop_1',
      propertyAddress: '123 Main Street, Toronto',
      taxYear: 2024,
      originalLoan: 450000,
      interestRate: 3.5,
      startDate: '2020-03-15',
      amortizationYears: 30,
      
      estimatedTotals: {
        interestPaid: 14940.90,
        principalPaid: 9854.58,
        totalPaid: 24795.48,
        endingBalance: 385420.50
      },
      
      officialTotals: {
        interestPaid: 14885.25,
        principalPaid: 9910.23,
        totalPaid: 24795.48,
        endingBalance: 385420.50,
        statementDate: '2024-12-31',
        fileName: 'mortgage_statement_2024.pdf'
      },
      
      reconciliation: {
        status: 'reconciled',
        variance: {
          interest: 55.65,
          principal: -55.65,
          total: 0
        },
        lastReconciled: '2025-01-15',
        notes: 'Minor variance due to rounding differences'
      },
      
      t776Impact: {
        deductibleInterest: 14885.25,
        ccaEligible: true,
        maxCCAClaim: 43250.00
      }
    },
    {
      id: 'ye_mortgage_2',
      propertyId: 'prop_2',
      propertyAddress: '456 Elm Avenue, Toronto',
      taxYear: 2024,
      originalLoan: 625000,
      interestRate: 4.1,
      startDate: '2019-06-01',
      amortizationYears: 25,
      
      estimatedTotals: {
        interestPaid: 22734.36,
        principalPaid: 12284.01,
        totalPaid: 35018.37,
        endingBalance: 512890.25
      },
      
      reconciliation: {
        status: 'pending',
        variance: {
          interest: 0,
          principal: 0,
          total: 0
        }
      },
      
      t776Impact: {
        deductibleInterest: 22734.36,
        ccaEligible: true,
        maxCCAClaim: 62500.00
      }
    },
    {
      id: 'ye_mortgage_3',
      propertyId: 'prop_3',
      propertyAddress: '789 Oak Road, Mississauga',
      taxYear: 2024,
      originalLoan: 320000,
      interestRate: 2.9,
      startDate: '2021-09-20',
      amortizationYears: 30,
      
      estimatedTotals: {
        interestPaid: 9468.54,
        principalPaid: 7851.84,
        totalPaid: 17320.38,
        endingBalance: 289456.78
      },
      
      officialTotals: {
        interestPaid: 9580.75,
        principalPaid: 7739.63,
        totalPaid: 17320.38,
        endingBalance: 289456.78,
        statementDate: '2024-12-31',
        fileName: 'annual_statement_2024.pdf'
      },
      
      reconciliation: {
        status: 'variance_detected',
        variance: {
          interest: -112.21,
          principal: 112.21,
          total: 0
        },
        lastReconciled: '2025-01-20',
        notes: 'Significant variance - requires investigation'
      },
      
      t776Impact: {
        deductibleInterest: 9580.75,
        ccaEligible: true,
        maxCCAClaim: 32000.00
      }
    }
  ]);

  const [selectedYear, setSelectedYear] = useState('2024');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showReconciliationModal, setShowReconciliationModal] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [reconciliationNotes, setReconciliationNotes] = useState('');

  const filteredMortgages = mortgages.filter(mortgage => mortgage.taxYear.toString() === selectedYear);

  const totalEstimatedInterest = filteredMortgages.reduce((sum, m) => sum + m.estimatedTotals.interestPaid, 0);
  const totalOfficialInterest = filteredMortgages.reduce((sum, m) => sum + (m.officialTotals?.interestPaid || 0), 0);
  const totalVariance = Math.abs(totalEstimatedInterest - totalOfficialInterest);
  const pendingReconciliation = filteredMortgages.filter(m => m.reconciliation.status === 'pending').length;
  const varianceDetected = filteredMortgages.filter(m => m.reconciliation.status === 'variance_detected').length;
  const lockedReconciliations = filteredMortgages.filter(m => m.reconciliation.status === 'locked').length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(amount);
  };

  const handleUploadAnnualStatement = async (files: FileList) => {
    setIsUploading(true);
    setUploadProgress(0);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const progress = ((i + 1) / files.length) * 100;
      setUploadProgress(progress);

      // Simulate OCR processing of annual mortgage statement
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Find pending mortgage to reconcile
      const pendingMortgage = mortgages.find(m => 
        m.reconciliation.status === 'pending' && m.taxYear.toString() === selectedYear
      );

      if (pendingMortgage) {
        // In production, this would extract official totals from lender statement
        const officialData = {
          interestPaid: pendingMortgage.estimatedTotals.interestPaid + (Math.random() - 0.5) * 500,
          principalPaid: pendingMortgage.estimatedTotals.principalPaid - (Math.random() - 0.5) * 500,
          totalPaid: pendingMortgage.estimatedTotals.totalPaid,
          endingBalance: pendingMortgage.estimatedTotals.endingBalance,
          statementDate: `${selectedYear}-12-31`,
          fileName: file.name
        };

        // Update mortgage with official data
        setMortgages(prev => prev.map(mortgage => 
          mortgage.id === pendingMortgage.id
            ? {
                ...mortgage,
                officialTotals: officialData,
                reconciliation: {
                  ...mortgage.reconciliation,
                  status: Math.abs(officialData.interestPaid - mortgage.estimatedTotals.interestPaid) > 100 
                    ? 'variance_detected' 
                    : 'reconciled',
                  variance: {
                    interest: officialData.interestPaid - mortgage.estimatedTotals.interestPaid,
                    principal: officialData.principalPaid - mortgage.estimatedTotals.principalPaid,
                    total: officialData.totalPaid - mortgage.estimatedTotals.totalPaid
                  },
                  lastReconciled: new Date().toISOString().split('T')[0]
                },
                t776Impact: {
                  ...mortgage.t776Impact,
                  deductibleInterest: officialData.interestPaid
                }
              }
            : mortgage
        ));
      }
    }

    setIsUploading(false);
    setUploadProgress(0);
    setShowUploadModal(false);
  };

  const handleLockReconciliation = (mortgageId: string) => {
    setMortgages(prev => prev.map(mortgage => 
      mortgage.id === mortgageId
        ? {
            ...mortgage,
            reconciliation: {
              ...mortgage.reconciliation,
              status: 'locked',
              lockedAt: new Date().toISOString(),
              notes: reconciliationNotes || 'Reconciliation locked for tax filing'
            }
          }
        : mortgage
    ));
    setReconciliationNotes('');
    setShowReconciliationModal(null);
  };

  const handleApproveVariance = (mortgageId: string) => {
    setMortgages(prev => prev.map(mortgage => 
      mortgage.id === mortgageId
        ? {
            ...mortgage,
            reconciliation: {
              ...mortgage.reconciliation,
              status: 'reconciled',
              lastReconciled: new Date().toISOString().split('T')[0],
              notes: 'Variance approved and reconciled'
            }
          }
        : mortgage
    ));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/mortgages" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-3xl font-light text-slate-900" style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.02em' }}>
                Northfile
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-slate-600 hover:text-slate-900 transition-colors">Dashboard</Link>
              <Link href="/mortgages" className="text-slate-600 hover:text-slate-900 transition-colors">Mortgages</Link>
              <Link href="/mortgages/year-end" className="text-blue-600 font-medium">Year-End</Link>
              <Link href="/reports" className="text-slate-600 hover:text-slate-900 transition-colors">Reports</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Year-End Mortgage Reconciliation</h1>
            <p className="text-slate-500 text-lg">Upload lender annual statements and reconcile with estimated amounts</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2">
              <Calendar className="w-4 h-4 text-slate-500" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="border-none focus:outline-none text-sm font-medium text-slate-700"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Upload Annual Statements
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-blue-700">Total Estimated Interest</p>
              <Calculator className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-800 mb-1">{formatCurrency(totalEstimatedInterest)}</p>
            <p className="text-sm text-blue-600">Based on amortization</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-green-700">Total Official Interest</p>
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-800 mb-1">{formatCurrency(totalOfficialInterest)}</p>
            <p className="text-sm text-green-600">From lender statements</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-orange-700">Total Variance</p>
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-orange-800 mb-1">{formatCurrency(totalVariance)}</p>
            <p className="text-sm text-orange-600">Difference detected</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-purple-700">Reconciliation Status</p>
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-800 mb-1">{pendingReconciliation}</p>
            <p className="text-sm text-purple-600">Pending reconciliation</p>
          </div>
        </div>

        {/* Status Overview */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Reconciliation Overview</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <p className="text-2xl font-bold text-slate-900 mb-1">{filteredMortgages.length}</p>
              <p className="text-sm text-slate-600">Total Mortgages</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-700 mb-1">{pendingReconciliation}</p>
              <p className="text-sm text-yellow-600">Pending</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-700 mb-1">{filteredMortgages.filter(m => m.reconciliation.status === 'reconciled').length}</p>
              <p className="text-sm text-green-600">Reconciled</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-700 mb-1">{varianceDetected}</p>
              <p className="text-sm text-red-600">Variance Detected</p>
            </div>
          </div>
        </div>

        {/* Mortgages List */}
        <div className="space-y-6">
          {filteredMortgages.map((mortgage) => (
            <div key={mortgage.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-6 border-b border-slate-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{mortgage.propertyAddress}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-slate-600">Tax Year: {mortgage.taxYear}</span>
                      <span className="text-sm text-slate-400">•</span>
                      <span className="text-sm text-slate-600">Rate: {mortgage.interestRate}%</span>
                      <span className="text-sm text-slate-400">•</span>
                      <span className="text-sm text-slate-600">Loan: {formatCurrency(mortgage.originalLoan)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {mortgage.reconciliation.status === 'pending' && (
                        <span className="flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                          <Clock className="w-3 h-3" />
                          Pending
                        </span>
                      )}
                      {mortgage.reconciliation.status === 'reconciled' && (
                        <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          Reconciled
                        </span>
                      )}
                      {mortgage.reconciliation.status === 'variance_detected' && (
                        <span className="flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                          <AlertCircle className="w-3 h-3" />
                          Variance Detected
                        </span>
                      )}
                      {mortgage.reconciliation.status === 'locked' && (
                        <span className="flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          <Lock className="w-3 h-3" />
                          Locked
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowReconciliationModal(mortgage.id)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      title="View reconciliation details"
                    >
                      <Eye className="w-4 h-4 text-slate-600" />
                    </button>
                    {mortgage.reconciliation.status === 'variance_detected' && (
                      <button
                        onClick={() => handleApproveVariance(mortgage.id)}
                        className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                      >
                        Approve
                      </button>
                    )}
                    {mortgage.reconciliation.status === 'reconciled' && (
                      <button
                        onClick={() => setShowReconciliationModal(mortgage.id)}
                        className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium"
                      >
                        Lock
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="p-6">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Estimated vs Official Comparison</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Category</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-slate-700">Estimated</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-slate-700">Official</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-slate-700">Variance</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100">
                        <td className="py-3 px-4 text-sm text-slate-900">Interest Paid</td>
                        <td className="text-right py-3 px-4 text-sm font-medium text-slate-900">
                          {formatCurrency(mortgage.estimatedTotals.interestPaid)}
                        </td>
                        <td className="text-right py-3 px-4 text-sm font-medium text-green-700">
                          {mortgage.officialTotals ? formatCurrency(mortgage.officialTotals.interestPaid) : '—'}
                        </td>
                        <td className={`text-right py-3 px-4 text-sm font-medium ${
                          Math.abs(mortgage.reconciliation.variance.interest) > 100 ? 'text-red-700' : 'text-green-700'
                        }`}>
                          {mortgage.officialTotals ? formatCurrency(mortgage.reconciliation.variance.interest) : '—'}
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-3 px-4 text-sm text-slate-900">Principal Paid</td>
                        <td className="text-right py-3 px-4 text-sm font-medium text-slate-900">
                          {formatCurrency(mortgage.estimatedTotals.principalPaid)}
                        </td>
                        <td className="text-right py-3 px-4 text-sm font-medium text-green-700">
                          {mortgage.officialTotals ? formatCurrency(mortgage.officialTotals.principalPaid) : '—'}
                        </td>
                        <td className={`text-right py-3 px-4 text-sm font-medium ${
                          Math.abs(mortgage.reconciliation.variance.principal) > 100 ? 'text-red-700' : 'text-green-700'
                        }`}>
                          {mortgage.officialTotals ? formatCurrency(mortgage.reconciliation.variance.principal) : '—'}
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-3 px-4 text-sm text-slate-900">Total Paid</td>
                        <td className="text-right py-3 px-4 text-sm font-medium text-slate-900">
                          {formatCurrency(mortgage.estimatedTotals.totalPaid)}
                        </td>
                        <td className="text-right py-3 px-4 text-sm font-medium text-green-700">
                          {mortgage.officialTotals ? formatCurrency(mortgage.officialTotals.totalPaid) : '—'}
                        </td>
                        <td className={`text-right py-3 px-4 text-sm font-medium ${
                          Math.abs(mortgage.reconciliation.variance.total) > 100 ? 'text-red-700' : 'text-green-700'
                        }`}>
                          {mortgage.officialTotals ? formatCurrency(mortgage.reconciliation.variance.total) : '—'}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm font-medium text-slate-900">Ending Balance</td>
                        <td className="text-right py-3 px-4 text-sm font-medium text-slate-900">
                          {formatCurrency(mortgage.estimatedTotals.endingBalance)}
                        </td>
                        <td className="text-right py-3 px-4 text-sm font-medium text-green-700">
                          {mortgage.officialTotals ? formatCurrency(mortgage.officialTotals.endingBalance) : '—'}
                        </td>
                        <td className="text-right py-3 px-4 text-sm font-medium text-slate-600">
                          {mortgage.officialTotals ? formatCurrency(
                            mortgage.officialTotals.endingBalance - mortgage.estimatedTotals.endingBalance
                          ) : '—'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* T776 Impact */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h5 className="text-sm font-semibold text-blue-900 mb-2">T776 Tax Impact</h5>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-blue-700">Deductible Interest</p>
                      <p className="text-lg font-bold text-blue-900">
                        {formatCurrency(mortgage.t776Impact.deductibleInterest)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-700">CCA Eligible</p>
                      <p className="text-lg font-bold text-blue-900">
                        {mortgage.t776Impact.ccaEligible ? 'Yes' : 'No'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-700">Max CCA Claim</p>
                      <p className="text-lg font-bold text-blue-900">
                        {formatCurrency(mortgage.t776Impact.maxCCAClaim)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {mortgage.reconciliation.notes && (
                  <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm font-medium text-slate-700 mb-1">Notes</p>
                    <p className="text-sm text-slate-600">{mortgage.reconciliation.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Upload Annual Mortgage Statements</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <AlertCircle className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center">
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-slate-900 mb-2">Drop annual statements here</p>
              <p className="text-sm text-slate-500 mb-4">Upload annual mortgage statements from your lenders for {selectedYear} tax year reconciliation</p>
              
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => e.target.files && handleUploadAnnualStatement(e.target.files)}
                className="hidden"
                id="annual-statement-upload"
              />
              <label
                htmlFor="annual-statement-upload"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium cursor-pointer"
              >
                Select Statements
              </label>
            </div>

            {isUploading && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Processing statements...</span>
                  <span className="text-sm font-medium text-blue-600">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900 mb-2">📋 Annual Statement Processing</p>
              <p className="text-sm text-blue-700">
                Annual statements will be processed using OCR to extract official year-end totals. 
                This will reconcile with your estimated payments and automatically update T776 deductible amounts.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Reconciliation Modal */}
      {showReconciliationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Reconciliation Details</h3>
              <button
                onClick={() => setShowReconciliationModal(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <AlertCircle className="w-5 h-5 text-slate-600" />
              </button>
            </div>
            
            <div className="p-6">
              {(() => {
                const mortgage = mortgages.find(m => m.id === showReconciliationModal);
                if (!mortgage) return null;
                
                return (
                  <div className="space-y-6">
                    {/* Variance Analysis */}
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-4">Variance Analysis</h4>
                      <div className={`rounded-lg p-4 ${
                        mortgage.reconciliation.status === 'reconciled' 
                          ? 'bg-green-50 border border-green-200' 
                          : mortgage.reconciliation.status === 'variance_detected'
                          ? 'bg-red-50 border border-red-200'
                          : 'bg-yellow-50 border border-yellow-200'
                      }`}>
                        <p className="text-sm font-medium mb-2">
                          {mortgage.reconciliation.status === 'reconciled' ? '✅ Reconciled' : 
                           mortgage.reconciliation.status === 'variance_detected' ? '⚠️ Variance Detected' : '⏳ Pending'}
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-600">Interest Variance:</span>
                            <span className={`text-sm font-bold ${
                              Math.abs(mortgage.reconciliation.variance.interest) > 100 ? 'text-red-700' : 'text-green-700'
                            }`}>
                              {formatCurrency(Math.abs(mortgage.reconciliation.variance.interest))}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-600">Principal Variance:</span>
                            <span className={`text-sm font-bold ${
                              Math.abs(mortgage.reconciliation.variance.principal) > 100 ? 'text-red-700' : 'text-green-700'
                            }`}>
                              {formatCurrency(Math.abs(mortgage.reconciliation.variance.principal))}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Lock Reconciliation */}
                    {mortgage.reconciliation.status === 'reconciled' && (
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-4">Lock Reconciliation</h4>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <p className="text-sm font-medium text-purple-900 mb-2">
                            <Lock className="w-4 h-4 inline mr-1" />
                            Lock for Tax Filing
                          </p>
                          <p className="text-sm text-purple-700 mb-4">
                            Lock this reconciliation to prevent further changes. This will mark the mortgage as ready for T776 generation.
                          </p>
                          <textarea
                            value={reconciliationNotes}
                            onChange={(e) => setReconciliationNotes(e.target.value)}
                            placeholder="Add notes for audit trail..."
                            className="w-full p-3 border border-purple-200 rounded-lg text-sm focus:border-purple-500 focus:outline-none"
                            rows={3}
                          />
                          <div className="mt-4 flex gap-3">
                            <button
                              onClick={() => handleLockReconciliation(mortgage.id)}
                              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
                            >
                              Lock Reconciliation
                            </button>
                            <button
                              onClick={() => setShowReconciliationModal(null)}
                              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Audit Trail */}
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-4">Audit Trail</h4>
                      <div className="bg-slate-50 rounded-lg p-4">
                        <div className="space-y-2">
                          {mortgage.reconciliation.lastReconciled && (
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-600">Last Reconciled:</span>
                              <span className="font-medium text-slate-900">
                                {new Date(mortgage.reconciliation.lastReconciled).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          {mortgage.reconciliation.lockedAt && (
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-600">Locked At:</span>
                              <span className="font-medium text-slate-900">
                                {new Date(mortgage.reconciliation.lockedAt).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          {mortgage.officialTotals && (
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-600">Statement File:</span>
                              <span className="font-medium text-slate-900">
                                {mortgage.officialTotals.fileName}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
