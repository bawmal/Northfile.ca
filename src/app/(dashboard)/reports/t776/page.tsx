'use client';

import { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  CheckCircle, 
  AlertTriangle, 
  Calendar, 
  DollarSign, 
  Home, 
  Users, 
  Calculator,
  Settings,
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  Info,
  Lock,
  Unlock,
  Building,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';

interface Property {
  id: string;
  address: string;
  ownershipPercentage: number;
  owners: Owner[];
  rentalIncome: number;
  expenses: {
    mortgageInterest: number;
    propertyTax: number;
    insurance: number;
    maintenance: number;
    utilities: number;
    other: number;
  };
  ccaEligible: boolean;
  maxCCAClaim: number;
  netIncome: number;
  capitalCost: number;
  ucc: number; // Undepreciated Capital Cost
}

interface Owner {
  id: string;
  name: string;
  percentage: number;
  SIN?: string;
}

interface T776Form {
  id: string;
  propertyId: string;
  taxYear: number;
  ownerId?: string;
  status: 'draft' | 'ready' | 'generated' | 'locked';
  includeCCA: boolean;
  useReconciledInterest: boolean;
  personalUseDays: number;
  totalRentalDays: number;
  generatedAt?: string;
  pdfUrl?: string;
  warnings: string[];
}

export default function T776Page() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [t776Forms, setT776Forms] = useState<T776Form[]>([]);
  const [showPreviewModal, setShowPreviewModal] = useState<string | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [formSettings, setFormSettings] = useState({
    includeCCA: true,
    useReconciledInterest: true,
    personalUseDays: 0,
    totalRentalDays: 365
  });

  const properties: Property[] = [
    {
      id: 'prop_1',
      address: '123 Main Street, Toronto',
      ownershipPercentage: 100,
      owners: [
        { id: 'owner_1', name: 'John Doe', percentage: 100 }
      ],
      rentalIncome: 42000,
      expenses: {
        mortgageInterest: 14885.25,
        propertyTax: 3500.00,
        insurance: 1800.00,
        maintenance: 2400.00,
        utilities: 1200.00,
        other: 600.00
      },
      ccaEligible: true,
      maxCCAClaim: 43250.00,
      netIncome: 17815.75,
      capitalCost: 450000.00,
      ucc: 406750.00
    },
    {
      id: 'prop_2',
      address: '456 Elm Avenue, Toronto',
      ownershipPercentage: 50,
      owners: [
        { id: 'owner_1', name: 'John Doe', percentage: 50 },
        { id: 'owner_2', name: 'Jane Smith', percentage: 50 }
      ],
      rentalIncome: 50400,
      expenses: {
        mortgageInterest: 18788.50,
        propertyTax: 4200.00,
        insurance: 2200.00,
        maintenance: 3000.00,
        utilities: 1800.00,
        other: 800.00
      },
      ccaEligible: true,
      maxCCAClaim: 62500.00,
      netIncome: 19611.50,
      capitalCost: 625000.00,
      ucc: 562500.00
    },
    {
      id: 'prop_3',
      address: '789 Oak Road, Mississauga',
      ownershipPercentage: 100,
      owners: [
        { id: 'owner_1', name: 'John Doe', percentage: 100 }
      ],
      rentalIncome: 33600,
      expenses: {
        mortgageInterest: 9580.75,
        propertyTax: 2800.00,
        insurance: 1500.00,
        maintenance: 1800.00,
        utilities: 1000.00,
        other: 400.00
      },
      ccaEligible: true,
      maxCCAClaim: 32000.00,
      netIncome: 16519.25,
      capitalCost: 320000.00,
      ucc: 288000.00
    }
  ];

  const availableProperties = properties.filter(prop => 
    prop.owners.some(owner => owner.id === 'owner_1')
  );

  const selectedPropertiesData = properties.filter(prop => 
    selectedProperties.includes(prop.id)
  );

  const totalRentalIncome = selectedPropertiesData.reduce((sum, prop) => 
    sum + (prop.rentalIncome * (prop.ownershipPercentage / 100)), 0
  );

  const totalExpenses = selectedPropertiesData.reduce((sum, prop) => {
    const propertyExpenses = Object.values(prop.expenses).reduce((a, b) => a + b, 0);
    return sum + (propertyExpenses * (prop.ownershipPercentage / 100));
  }, 0);

  const totalNetIncome = selectedPropertiesData.reduce((sum, prop) => 
    sum + (prop.netIncome * (prop.ownershipPercentage / 100)), 0
  );

  const totalCCA = selectedPropertiesData.reduce((sum, prop) => 
    sum + (prop.maxCCAClaim * (prop.ownershipPercentage / 100)), 0
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(amount);
  };

  const handlePropertyToggle = (propertyId: string) => {
    setSelectedProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleGenerateT776 = async () => {
    const newForms: T776Form[] = selectedProperties.map(propertyId => {
      const property = properties.find(p => p.id === propertyId)!;
      
      return {
        id: `t776_${Date.now()}_${propertyId}`,
        propertyId,
        taxYear: parseInt(selectedYear),
        ownerId: 'owner_1',
        status: 'draft',
        includeCCA: formSettings.includeCCA,
        useReconciledInterest: formSettings.useReconciledInterest,
        personalUseDays: formSettings.personalUseDays,
        totalRentalDays: formSettings.totalRentalDays,
        warnings: generateWarnings(property)
      };
    });

    setT776Forms(prev => [...prev, ...newForms]);
  };

  const generateWarnings = (property: Property): string[] => {
    const warnings: string[] = [];
    
    if (!property.ccaEligible && formSettings.includeCCA) {
      warnings.push('Property not eligible for CCA - changes in use may affect eligibility');
    }
    
    if (formSettings.personalUseDays > 15) {
      warnings.push(`Personal use exceeds 15 days (${formSettings.personalUseDays} days) - may limit expense deductions`);
    }
    
    if (property.ucc < property.capitalCost * 0.5) {
      warnings.push('UCC significantly below original cost - review capital cost calculations');
    }
    
    return warnings;
  };

  const handlePreviewT776 = (formId: string) => {
    setShowPreviewModal(formId);
  };

  const handleGeneratePDF = async (formId: string) => {
    // Simulate PDF generation
    setT776Forms(prev => prev.map(form => 
      form.id === formId 
        ? { ...form, status: 'generated' as const, generatedAt: new Date().toISOString() }
        : form
    ));
  };

  const handleLockForm = (formId: string) => {
    setT776Forms(prev => prev.map(form => 
      form.id === formId 
        ? { ...form, status: 'locked' as const }
        : form
    ));
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
              <Link href="/mortgages" className="text-slate-600 hover:text-slate-900 transition-colors">Mortgages</Link>
              <Link href="/reports" className="text-blue-600 font-medium">Reports</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">T776 Generation</h1>
            <p className="text-slate-500 text-lg">Generate draft T776 forms for tax filing</p>
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
              onClick={() => setShowSettingsModal(true)}
              className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center gap-2"
            >
              <Settings className="w-5 h-5" />
              Settings
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-blue-700">Selected Properties</p>
              <Home className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-800 mb-1">{selectedProperties.length}</p>
            <p className="text-sm text-blue-600">of {availableProperties.length} available</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-green-700">Total Rental Income</p>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-800 mb-1">{formatCurrency(totalRentalIncome)}</p>
            <p className="text-sm text-green-600">Gross rental income</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-orange-700">Total Expenses</p>
              <Calculator className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-orange-800 mb-1">{formatCurrency(totalExpenses)}</p>
            <p className="text-sm text-orange-600">Deductible expenses</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-purple-700">Net Income</p>
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-800 mb-1">{formatCurrency(totalNetIncome)}</p>
            <p className="text-sm text-purple-600">Before CCA</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Property Selection */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">Select Properties</h3>
                <span className="text-sm text-slate-500">
                  {selectedProperties.length} of {availableProperties.length} selected
                </span>
              </div>
              
              <div className="space-y-4">
                {availableProperties.map((property) => (
                  <div key={property.id} className="border border-slate-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={selectedProperties.includes(property.id)}
                        onChange={() => handlePropertyToggle(property.id)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 mt-1"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 mb-2">{property.address}</h4>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-slate-600 mb-1">Ownership</p>
                            <p className="font-medium text-slate-900">{property.ownershipPercentage}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600 mb-1">Rental Income</p>
                            <p className="font-medium text-slate-900">{formatCurrency(property.rentalIncome)}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Mortgage Interest:</span>
                            <span className="font-medium text-slate-900">{formatCurrency(property.expenses.mortgageInterest)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Property Tax:</span>
                            <span className="font-medium text-slate-900">{formatCurrency(property.expenses.propertyTax)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Insurance:</span>
                            <span className="font-medium text-slate-900">{formatCurrency(property.expenses.insurance)}</span>
                          </div>
                          <div className="flex justify-between text-sm font-semibold pt-2 border-t border-slate-200">
                            <span className="text-slate-900">Net Income:</span>
                            <span className="text-green-700">{formatCurrency(property.netIncome)}</span>
                          </div>
                        </div>

                        {property.owners.length > 1 && (
                          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm font-medium text-blue-900 mb-1">Multiple Owners</p>
                            <div className="space-y-1">
                              {property.owners.map((owner, index) => (
                                <div key={owner.id} className="flex justify-between text-sm">
                                  <span className="text-blue-700">{owner.name}</span>
                                  <span className="font-medium text-blue-900">{owner.percentage}%</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProperties(availableProperties.map(p => p.id))}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Select All
                </button>
                <button
                  onClick={handleGenerateT776}
                  disabled={selectedProperties.length === 0}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Generate T776 Forms
                </button>
              </div>
            </div>
          </div>

          {/* Generated Forms */}
          <div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Generated Forms</h3>
              
              {t776Forms.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 mb-2">No forms generated yet</p>
                  <p className="text-sm text-slate-400">Select properties and generate T776 forms to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {t776Forms.map((form) => {
                    const property = properties.find(p => p.id === form.propertyId);
                    return (
                      <div key={form.id} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-slate-900">{property?.address}</h4>
                            <p className="text-sm text-slate-500">Tax Year {form.taxYear}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            form.status === 'locked' ? 'bg-purple-100 text-purple-700' :
                            form.status === 'generated' ? 'bg-green-100 text-green-700' :
                            form.status === 'ready' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {form.status === 'locked' ? 'Locked' :
                             form.status === 'generated' ? 'Generated' :
                             form.status === 'ready' ? 'Ready' : 'Draft'}
                          </span>
                        </div>

                        {form.warnings.length > 0 && (
                          <div className="mb-3 p-3 bg-yellow-50 rounded-lg">
                            <div className="flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-medium text-yellow-900 mb-1">Warnings</p>
                                {form.warnings.map((warning, index) => (
                                  <p key={index} className="text-xs text-yellow-700">• {warning}</p>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handlePreviewT776(form.id)}
                            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center justify-center gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            Preview
                          </button>
                          {form.status === 'draft' && (
                            <button
                              onClick={() => handleGeneratePDF(form.id)}
                              className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium flex items-center justify-center gap-1"
                            >
                              <Download className="w-4 h-4" />
                              Generate PDF
                            </button>
                          )}
                          {form.status === 'generated' && (
                            <button
                              onClick={() => handleLockForm(form.id)}
                              className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium flex items-center justify-center gap-1"
                            >
                              <Lock className="w-4 h-4" />
                              Lock
                            </button>
                          )}
                          {form.status === 'locked' && (
                            <button
                              className="flex-1 px-3 py-2 bg-slate-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1 cursor-not-allowed opacity-75"
                              disabled
                            >
                              <Lock className="w-4 h-4" />
                              Locked
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* CCA Summary */}
            {selectedProperties.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 mt-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">CCA Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Total CCA Available:</span>
                    <span className="font-medium text-slate-900">{formatCurrency(totalCCA)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Include CCA in Forms:</span>
                    <span className="font-medium text-slate-900">
                      {formSettings.includeCCA ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold pt-2 border-t border-slate-200">
                    <span className="text-slate-900">Final Net Income:</span>
                    <span className="text-green-700">
                      {formatCurrency(totalNetIncome - (formSettings.includeCCA ? totalCCA : 0))}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">T776 Generation Settings</h3>
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formSettings.includeCCA}
                    onChange={(e) => setFormSettings(prev => ({ ...prev, includeCCA: e.target.checked }))}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div>
                    <p className="font-medium text-slate-900">Include Capital Cost Allowance (CCA)</p>
                    <p className="text-sm text-slate-600">Claim depreciation on eligible capital assets</p>
                  </div>
                </label>
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formSettings.useReconciledInterest}
                    onChange={(e) => setFormSettings(prev => ({ ...prev, useReconciledInterest: e.target.checked }))}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div>
                    <p className="font-medium text-slate-900">Use Reconciled Mortgage Interest</p>
                    <p className="text-sm text-slate-600">Only use officially reconciled interest amounts</p>
                  </div>
                </label>
              </div>

              <div>
                <label className="block">
                  <p className="font-medium text-slate-900 mb-2">Personal Use Days</p>
                  <input
                    type="number"
                    min="0"
                    max="365"
                    value={formSettings.personalUseDays}
                    onChange={(e) => setFormSettings(prev => ({ ...prev, personalUseDays: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-sm text-slate-600 mt-1">Days property was used for personal purposes</p>
                </label>
              </div>

              <div>
                <label className="block">
                  <p className="font-medium text-slate-900 mb-2">Total Rental Days</p>
                  <input
                    type="number"
                    min="0"
                    max="365"
                    value={formSettings.totalRentalDays}
                    onChange={(e) => setFormSettings(prev => ({ ...prev, totalRentalDays: parseInt(e.target.value) || 365 }))}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-sm text-slate-600 mt-1">Total days property was available for rental</p>
                </label>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-blue-900 mb-2">Important Notes</p>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Personal use over 15 days may limit expense deductions</li>
                      <li>• CCA is optional but generally recommended</li>
                      <li>• Reconciled interest amounts are audit-ready</li>
                      <li>• Keep all supporting documents for 7 years</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">T776 Form Preview</h3>
                <button
                  onClick={() => setShowPreviewModal(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="bg-slate-50 rounded-lg p-8 text-center">
                <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-slate-900 mb-2">T776 Form Preview</h4>
                <p className="text-slate-600 mb-6">
                  Preview of your T776 form with all calculations and supporting schedules
                </p>
                <div className="flex justify-center gap-4">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Download PDF
                  </button>
                  <button
                    onClick={() => setShowPreviewModal(null)}
                    className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
