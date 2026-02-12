'use client';

import { useState, useEffect } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle, 
  Home, 
  Calendar, 
  DollarSign, 
  FileText, 
  Upload, 
  Eye, 
  Edit2, 
  Trash2,
  PieChart,
  Target,
  Clock,
  Users
} from 'lucide-react';
import Link from 'next/link';

interface Mortgage {
  id: string;
  propertyId: string;
  propertyAddress: string;
  totalLoan: number;
  interestRate: number;
  startDate: string;
  amortizationYears: number;
  currentBalance: number;
  estimated: boolean;
  monthlyPayment: number;
  yearToDate: {
    interestPaid: number;
    principalPaid: number;
    totalPaid: number;
    remainingBalance: number;
  };
  reconciliation: {
    lastReconciled: string;
    variance: number;
    officialInterest: number;
    estimatedInterest: number;
    status: 'pending' | 'reconciled' | 'variance_detected';
  };
}

export default function MortgagesPage() {
  const [mortgages, setMortgages] = useState<Mortgage[]>([
    {
      id: 'mortgage_1',
      propertyId: 'prop_1',
      propertyAddress: '123 Main Street, Toronto',
      totalLoan: 450000,
      interestRate: 3.5,
      startDate: '2020-03-15',
      amortizationYears: 30,
      currentBalance: 385420.50,
      estimated: true,
      monthlyPayment: 2019.32,
      yearToDate: {
        interestPaid: 12450.75,
        principalPaid: 8212.18,
        totalPaid: 20662.93,
        remainingBalance: 385420.50
      },
      reconciliation: {
        lastReconciled: '2024-12-31',
        variance: 0,
        officialInterest: 12450.75,
        estimatedInterest: 12450.75,
        status: 'reconciled'
      }
    },
    {
      id: 'mortgage_2',
      propertyId: 'prop_2',
      propertyAddress: '456 Elm Avenue, Toronto',
      totalLoan: 625000,
      interestRate: 4.1,
      startDate: '2019-06-01',
      amortizationYears: 25,
      currentBalance: 512890.25,
      estimated: true,
      monthlyPayment: 3328.67,
      yearToDate: {
        interestPaid: 18945.30,
        principalPaid: 10234.67,
        totalPaid: 29179.97,
        remainingBalance: 512890.25
      },
      reconciliation: {
        lastReconciled: '2024-12-31',
        variance: 156.80,
        officialInterest: 18788.50,
        estimatedInterest: 18945.30,
        status: 'variance_detected'
      }
    },
    {
      id: 'mortgage_3',
      propertyId: 'prop_3',
      propertyAddress: '789 Oak Road, Mississauga',
      totalLoan: 320000,
      interestRate: 2.9,
      startDate: '2021-09-20',
      amortizationYears: 30,
      currentBalance: 289456.78,
      estimated: true,
      monthlyPayment: 1332.89,
      yearToDate: {
        interestPaid: 7890.45,
        principalPaid: 6543.22,
        totalPaid: 14433.67,
        remainingBalance: 289456.78
      },
      reconciliation: {
        lastReconciled: '2024-12-31',
        variance: 0,
        officialInterest: 7890.45,
        estimatedInterest: 7890.45,
        status: 'reconciled'
      }
    }
  ]);

  const [selectedYear, setSelectedYear] = useState('2025');
  const [showReconciliationModal, setShowReconciliationModal] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const filteredMortgages = mortgages.filter(mortgage => {
    const mortgageYear = new Date(mortgage.startDate).getFullYear();
    return selectedYear === 'all' || mortgageYear.toString() === selectedYear;
  });

  const totalLoanAmount = filteredMortgages.reduce((sum, m) => sum + m.totalLoan, 0);
  const totalEstimatedInterest = filteredMortgages.reduce((sum, m) => sum + m.yearToDate.interestPaid, 0);
  const totalPrincipalPaid = filteredMortgages.reduce((sum, m) => sum + m.yearToDate.principalPaid, 0);
  const totalRemainingBalance = filteredMortgages.reduce((sum, m) => sum + m.currentBalance, 0);
  const mortgagesWithVariance = filteredMortgages.filter(m => m.reconciliation.status === 'variance_detected').length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(amount);
  };

  const calculateAmortizationSchedule = (principal: number, annualRate: number, years: number) => {
    const monthlyRate = annualRate / 100 / 12;
    const totalPayments = years * 12;
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    let balance = principal;
    const schedule = [];
    
    for (let month = 1; month <= Math.min(12, totalPayments); month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      
      if (month <= 12) {
        schedule.push({
          month,
          payment: monthlyPayment,
          principal: principalPayment,
          interest: interestPayment,
          balance: Math.max(0, balance)
        });
      }
    }
    
    return schedule;
  };

  const handleUploadStatement = async (files: FileList) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Get available mortgages for matching
    const availableMortgages = mortgages.filter(m => m.reconciliation.status !== 'reconciled');
    
    for (let i = 0; i < Math.min(files.length, availableMortgages.length); i++) {
      const file = files[i];
      const progress = ((i + 1) / files.length) * 100;
      setUploadProgress(progress);

      // Simulate OCR processing of mortgage statement
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Match file to available mortgage
      const targetMortgage = availableMortgages[i];
      
      // In production, this would extract official totals from lender statement
      const officialData = {
        mortgageId: targetMortgage.id,
        fileName: file.name,
        officialInterestPaid: Math.random() * 20000 + 5000,
        officialPrincipalPaid: Math.random() * 10000 + 2000,
        statementDate: new Date().toISOString().split('T')[0]
      };

      // Update mortgage reconciliation data
      setMortgages(prev => prev.map(mortgage => 
        mortgage.id === officialData.mortgageId
          ? {
              ...mortgage,
              reconciliation: {
                ...mortgage.reconciliation,
                lastReconciled: officialData.statementDate,
                officialInterest: officialData.officialInterestPaid,
                variance: Math.abs(mortgage.yearToDate.interestPaid - officialData.officialInterestPaid),
                status: Math.abs(mortgage.yearToDate.interestPaid - officialData.officialInterestPaid) > 50 ? 'variance_detected' : 'reconciled'
              }
            }
          : mortgage
      ));
    }

    setIsUploading(false);
    setUploadProgress(0);
    setShowUploadModal(false);
  };

  const handleRecalculate = (mortgageId: string) => {
    setMortgages(prev => prev.map(mortgage => {
      if (mortgage.id === mortgageId) {
        const schedule = calculateAmortizationSchedule(
          mortgage.totalLoan,
          mortgage.interestRate,
          mortgage.amortizationYears
        );
        
        const ytdInterest = schedule.slice(0, 6).reduce((sum, payment) => sum + payment.interest, 0);
        const ytdPrincipal = schedule.slice(0, 6).reduce((sum, payment) => sum + payment.principal, 0);
        
        return {
          ...mortgage,
          yearToDate: {
            ...mortgage.yearToDate,
            interestPaid: ytdInterest,
            principalPaid: ytdPrincipal,
            totalPaid: ytdInterest + ytdPrincipal
          }
        };
      }
      return mortgage;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
              <span className="text-3xl font-light text-slate-900" style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.02em' }}>
                Northfile
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-slate-600 hover:text-slate-900 transition-colors">Dashboard</Link>
              <Link href="/properties" className="text-slate-600 hover:text-slate-900 transition-colors">Properties</Link>
              <Link href="/transactions" className="text-slate-600 hover:text-slate-900 transition-colors">Transactions</Link>
              <Link href="/receipts" className="text-slate-600 hover:text-slate-900 transition-colors">Receipts</Link>
              <Link href="/mortgages" className="text-blue-600 font-medium">Mortgages</Link>
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
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Mortgage Handling</h1>
            <p className="text-slate-500 text-lg">In-year amortization-based splits and reconciliation</p>
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
              onClick={() => setShowUploadModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Upload Statements
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-blue-700">Total Loans</p>
              <Home className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-800 mb-1">{formatCurrency(totalLoanAmount)}</p>
            <p className="text-sm text-blue-600">Active mortgages</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-green-700">YTD Interest</p>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-800 mb-1">{formatCurrency(totalEstimatedInterest)}</p>
            <p className="text-sm text-green-600">Estimated payments</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-orange-700">YTD Principal</p>
              <TrendingDown className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-orange-800 mb-1">{formatCurrency(totalPrincipalPaid)}</p>
            <p className="text-sm text-orange-600">Principal reduction</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-purple-700">Remaining Balance</p>
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-800 mb-1">{formatCurrency(totalRemainingBalance)}</p>
            <p className="text-sm text-purple-600">Outstanding</p>
          </div>
        </div>

        {/* Variance Alert */}
        {mortgagesWithVariance > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-red-900 mb-1">Reconciliation Required</h3>
                <p className="text-red-700">
                  {mortgagesWithVariance} mortgage{mortgagesWithVariance > 1 ? 's' : ''} have variance between estimated and official amounts. 
                  Upload lender statements to reconcile.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Mortgages Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredMortgages.map((mortgage) => (
            <div key={mortgage.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-6 border-b border-slate-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{mortgage.propertyAddress}</h3>
                    <div className="flex items-center gap-2">
                      {mortgage.estimated && (
                        <span className="flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                          <Target className="w-3 h-3" />
                          Estimated
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
                          Variance
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRecalculate(mortgage.id)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Recalculate payments"
                    >
                      <Calculator className="w-4 h-4 text-slate-600" />
                    </button>
                    <button
                      onClick={() => setShowReconciliationModal(mortgage.id)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      title="View reconciliation details"
                    >
                      <Eye className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                </div>

                {/* Mortgage Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Original Loan</p>
                    <p className="text-lg font-bold text-slate-900">{formatCurrency(mortgage.totalLoan)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Interest Rate</p>
                    <p className="text-lg font-bold text-slate-900">{mortgage.interestRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Monthly Payment</p>
                    <p className="text-lg font-bold text-slate-900">{formatCurrency(mortgage.monthlyPayment)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Current Balance</p>
                    <p className="text-lg font-bold text-slate-900">{formatCurrency(mortgage.currentBalance)}</p>
                  </div>
                </div>
              </div>

              {/* YTD Breakdown */}
              <div className="p-6 bg-slate-50">
                <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Year-to-Date Breakdown
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Interest Paid</span>
                    <span className="text-lg font-bold text-green-700">{formatCurrency(mortgage.yearToDate.interestPaid)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Principal Paid</span>
                    <span className="text-lg font-bold text-blue-700">{formatCurrency(mortgage.yearToDate.principalPaid)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Total Paid</span>
                    <span className="text-lg font-bold text-slate-900">{formatCurrency(mortgage.yearToDate.totalPaid)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-300">
                    <span className="text-sm text-slate-600">Remaining Balance</span>
                    <span className="text-lg font-bold text-purple-700">{formatCurrency(mortgage.yearToDate.remainingBalance)}</span>
                  </div>
                </div>

                {mortgage.reconciliation.variance !== 0 && (
                  <div className="mt-4 p-3 bg-red-50 rounded-lg">
                    <p className="text-sm font-medium text-red-900 mb-1">Variance Detected</p>
                    <p className="text-sm text-red-700">
                      Difference: {formatCurrency(mortgage.reconciliation.variance)} between estimated and official interest amounts
                    </p>
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
              <h3 className="text-xl font-bold text-slate-900">Upload Mortgage Statements</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center">
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-slate-900 mb-2">Drop lender statements here</p>
              <p className="text-sm text-slate-500 mb-4">Upload annual mortgage statements from your lenders for official reconciliation</p>
              
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => e.target.files && handleUploadStatement(e.target.files)}
                className="hidden"
                id="statement-upload"
              />
              <label
                htmlFor="statement-upload"
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
              <p className="text-sm font-medium text-blue-900 mb-2">📋 OCR Processing</p>
              <p className="text-sm text-blue-700">
                Statements will be processed using OCR to extract official interest and principal amounts. 
                This will reconcile with your estimated payments and identify any variances.
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
                <Trash2 className="w-5 h-5 text-slate-600" />
              </button>
            </div>
            
            <div className="p-6">
              {(() => {
                const mortgage = mortgages.find(m => m.id === showReconciliationModal);
                if (!mortgage) return null;
                
                return (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-4">Estimated vs Official</h4>
                      <div className="space-y-4">
                        <div className="bg-slate-50 rounded-lg p-4">
                          <p className="text-sm font-medium text-slate-700 mb-2">Estimated Interest (YTD)</p>
                          <p className="text-2xl font-bold text-blue-700">{formatCurrency(mortgage.yearToDate.interestPaid)}</p>
                          <p className="text-xs text-slate-500">Based on amortization schedule</p>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4">
                          <p className="text-sm font-medium text-slate-700 mb-2">Official Interest (YTD)</p>
                          <p className="text-2xl font-bold text-green-700">{formatCurrency(mortgage.reconciliation.officialInterest)}</p>
                          <p className="text-xs text-slate-500">From lender statement</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-4">Variance Analysis</h4>
                      <div className={`rounded-lg p-4 ${
                        mortgage.reconciliation.variance === 0 
                          ? 'bg-green-50 border border-green-200' 
                          : 'bg-red-50 border border-red-200'
                      }`}>
                        <p className="text-sm font-medium mb-2">
                          {mortgage.reconciliation.variance === 0 ? '✅ Reconciled' : '⚠️ Variance Detected'}
                        </p>
                        <p className="text-2xl font-bold mb-2">
                          {mortgage.reconciliation.variance === 0 ? 'No Variance' : formatCurrency(Math.abs(mortgage.reconciliation.variance))}
                        </p>
                        <p className="text-sm text-slate-600">
                          {mortgage.reconciliation.variance === 0 
                            ? 'Estimated and official amounts match perfectly'
                            : `Difference between estimated and official interest payments`
                          }
                        </p>
                      </div>

                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-900 mb-2">📅 Last Reconciled</p>
                        <p className="text-lg font-bold text-blue-700">
                          {new Date(mortgage.reconciliation.lastReconciled).toLocaleDateString()}
                        </p>
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
