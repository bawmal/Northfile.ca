'use client';

import { useState } from 'react';
import { Plus, Building2, Edit2, Trash2, TrendingUp, Receipt, FileText, MapPin, Sparkles, Users, Calendar, Calculator, Home, Eye, X } from "lucide-react";
import Link from 'next/link';

interface Property {
  id: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  propertyType: string;
  units: number;
  purchaseDate: string;
  purchasePrice: number;
  ownershipType: 'sole' | 'joint' | 'tenancy-in-common';
  owners: Array<{
    name: string;
    email: string;
    percentage: number;
  }>;
  rentalStartDate?: string;
  isRentalFullYear: boolean;
  mortgage?: {
    hasMortgage: boolean;
    interestRate: number;
    loanAmount: number;
    startDate: string;
    amortizationYears: number;
  };
  ytdIncome: number;
  ytdExpenses: number;
  status: 'active' | 'inactive';
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      address: '123 Main Street',
      city: 'Toronto',
      province: 'ON',
      postalCode: 'M5V 2T6',
      propertyType: 'duplex',
      units: 2,
      purchaseDate: '2020-01-15',
      purchasePrice: 850000,
      ownershipType: 'joint',
      owners: [
        { name: 'John Landlord', email: 'john@example.com', percentage: 50 },
        { name: 'Sarah Johnson', email: 'sarah@example.com', percentage: 50 }
      ],
      isRentalFullYear: true,
      mortgage: {
        hasMortgage: true,
        interestRate: 3.5,
        loanAmount: 680000,
        startDate: '2020-01-15',
        amortizationYears: 25
      },
      ytdIncome: 19200,
      ytdExpenses: 18200,
      status: 'active'
    },
    {
      id: '2',
      address: '456 Elm Avenue',
      city: 'Mississauga',
      province: 'ON',
      postalCode: 'L5B 3M9',
      propertyType: 'condo',
      units: 1,
      purchaseDate: '2021-06-01',
      purchasePrice: 450000,
      ownershipType: 'sole',
      owners: [
        { name: 'John Landlord', email: 'john@example.com', percentage: 100 }
      ],
      rentalStartDate: '2021-07-01',
      isRentalFullYear: false,
      ytdIncome: 24000,
      ytdExpenses: 18000,
      status: 'active'
    },
    {
      id: '3',
      address: '789 Oak Road',
      city: 'Hamilton',
      province: 'ON',
      postalCode: 'L8P 4K2',
      propertyType: 'detached',
      units: 1,
      purchaseDate: '2019-03-20',
      purchasePrice: 650000,
      ownershipType: 'joint',
      owners: [
        { name: 'John Landlord', email: 'john@example.com', percentage: 60 },
        { name: 'Mike Wilson', email: 'mike@example.com', percentage: 40 }
      ],
      isRentalFullYear: true,
      mortgage: {
        hasMortgage: true,
        interestRate: 4.2,
        loanAmount: 520000,
        startDate: '2019-03-20',
        amortizationYears: 30
      },
      ytdIncome: 36000,
      ytdExpenses: 28000,
      status: 'active'
    }
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const handleDeleteProperty = async (propertyId: string) => {
    setProperties(prev => prev.filter(p => p.id !== propertyId));
    setShowDeleteModal(null);
  };

  const calculateTotalOwnership = (owners: Property['owners']) => {
    return owners.reduce((sum, owner) => sum + owner.percentage, 0);
  };

  const calculateRentalDays = (property: Property) => {
    if (property.isRentalFullYear) return 365;
    
    const startDate = new Date(property.rentalStartDate!);
    const currentDate = new Date();
    const startYear = startDate.getFullYear();
    const currentYear = currentDate.getFullYear();
    
    if (startYear !== currentYear) return 365;
    
    const yearStart = new Date(currentYear, 0, 1);
    const daysPassed = Math.floor((currentDate.getTime() - yearStart.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, daysPassed);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-3xl font-light text-slate-900" style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.02em' }}>
              Northfile
            </span>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-slate-900">Dashboard</a>
              <a href="/properties" className="text-sm font-semibold text-blue-600 border-b-2 border-blue-600 pb-1">Properties</a>
              <a href="/transactions" className="text-sm font-medium text-slate-600 hover:text-slate-900">Transactions</a>
              <a href="/receipts" className="text-sm font-medium text-slate-600 hover:text-slate-900">Receipts</a>
              <a href="/mortgages" className="text-sm font-medium text-slate-600 hover:text-slate-900">Mortgages</a>
              <a href="/reports" className="text-sm font-medium text-slate-600 hover:text-slate-900">Reports</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">JL</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Properties</h1>
            <p className="text-slate-500 text-lg">Manage your rental property portfolio</p>
          </div>
          <Link href="/properties/add-property" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Property
          </Link>
        </div>

        {/* Portfolio Summary */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <p className="text-sm text-slate-500 mb-2">Total Properties</p>
            <p className="text-3xl font-bold text-slate-900 mb-1">{properties.length}</p>
            <p className="text-sm text-green-600">All active</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <p className="text-sm text-slate-500 mb-2">Total Units</p>
            <p className="text-3xl font-bold text-slate-900 mb-1">{properties.reduce((sum, p) => sum + p.units, 0)}</p>
            <p className="text-sm text-slate-500">Across portfolio</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <p className="text-sm text-slate-500 mb-2">YTD Income</p>
            <p className="text-3xl font-bold text-slate-900 mb-1">${properties.reduce((sum, p) => sum + p.ytdIncome, 0).toLocaleString()}</p>
            <p className="text-sm text-green-600">Portfolio total</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <p className="text-sm text-slate-500 mb-2">YTD Expenses</p>
            <p className="text-3xl font-bold text-slate-900 mb-1">${properties.reduce((sum, p) => sum + p.ytdExpenses, 0).toLocaleString()}</p>
            <p className="text-sm text-orange-600">Portfolio total</p>
          </div>
        </div>

        {/* Property Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div 
                className="relative h-48 bg-gradient-to-br from-blue-500 to-blue-600 cursor-pointer group"
                onClick={() => setSelectedProperty(property)}
              >
                <img 
                  src={`https://images.unsplash.com/photo-${property.id === '1' ? '1570129477495-49c814698c23' : property.id === '2' ? '1512917774080-9991f1c4c750' : '1560445121-4331204755a6'}?w=800&h=400&fit=crop`}
                  alt={property.address}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {property.status}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => setSelectedProperty(property)}>{property.address}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span>{property.city}, {property.province} {property.postalCode}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4 text-slate-600" />
                    </button>
                    <button 
                      onClick={() => setShowDeleteModal(property.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Property Type</p>
                    <p className="text-sm font-semibold text-slate-900 capitalize">{property.propertyType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Units</p>
                    <p className="text-sm font-semibold text-slate-900">{property.units} {property.units === 1 ? 'unit' : 'units'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Your Ownership</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {property.owners.find(o => o.email === 'john@example.com')?.percentage || 0}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Purchase Year</p>
                    <p className="text-sm font-semibold text-slate-900">{new Date(property.purchaseDate).getFullYear()}</p>
                  </div>
                </div>

                {/* Ownership Information */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-purple-900 font-semibold flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      Ownership ({property.ownershipType})
                    </p>
                    <span className="text-xs bg-purple-200 text-purple-900 px-2 py-0.5 rounded-full">
                      {property.owners.length} {property.owners.length === 1 ? 'owner' : 'owners'}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {property.owners.map((owner, index) => (
                      <div key={index} className="flex items-center justify-between text-xs">
                        <span className="text-purple-700">{owner.name}</span>
                        <span className="font-semibold text-purple-900">{owner.percentage}%</span>
                      </div>
                    ))}
                  </div>
                  {calculateTotalOwnership(property.owners) !== 100 && (
                    <div className="text-xs text-red-600 mt-1">
                      Total: {calculateTotalOwnership(property.owners)}% (must equal 100%)
                    </div>
                  )}
                </div>

                {/* Rental Period */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-blue-900 font-semibold flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Rental Period (2025)
                    </p>
                    <span className="text-xs bg-blue-200 text-blue-900 px-2 py-0.5 rounded-full">
                      {property.isRentalFullYear ? 'Full Year' : 'Partial Year'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-blue-700">
                        {property.isRentalFullYear ? 'Started' : 'Rental Start'}
                      </p>
                      <p className="font-semibold text-blue-900">
                        {property.isRentalFullYear 
                          ? 'Jan 1, 2025' 
                          : new Date(property.rentalStartDate!).toLocaleDateString()
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-blue-700">Days Rented</p>
                      <p className="font-semibold text-blue-900">
                        {calculateRentalDays(property)} days ({Math.round((calculateRentalDays(property) / 365) * 100)}%)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-xs text-green-600 font-semibold mb-1">YTD Income</p>
                      <p className="text-xl font-bold text-green-700">${property.ytdIncome.toLocaleString()}</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3">
                      <p className="text-xs text-orange-600 font-semibold mb-1">YTD Expenses</p>
                      <p className="text-xl font-bold text-orange-700">${property.ytdExpenses.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-blue-600 font-semibold">Net Income</p>
                      <p className="text-lg font-bold text-blue-700">${(property.ytdIncome - property.ytdExpenses).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  {/* Mortgage Information */}
                  {property.mortgage?.hasMortgage && (
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-slate-600 font-semibold flex items-center gap-1">
                          <Calculator className="w-3 h-3" />
                          Mortgage
                        </p>
                        <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                          {property.mortgage.interestRate}% APR
                        </span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Loan Amount</span>
                          <span className="font-semibold text-slate-900">${property.mortgage.loanAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Amortization</span>
                          <span className="font-semibold text-slate-900">{property.mortgage.amortizationYears} years</span>
                        </div>
                        <div className="flex justify-between border-t border-slate-200 pt-2">
                          <span className="text-slate-600">• Interest (deductible)</span>
                          <span className="font-semibold text-green-700">~${Math.round(property.mortgage.loanAmount * property.mortgage.interestRate / 100 * 0.7).toLocaleString()}/yr</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Property Detail Modal */}
        {selectedProperty && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="relative h-64 bg-gradient-to-br from-blue-500 to-blue-600">
                <img 
                  src={`https://images.unsplash.com/photo-${selectedProperty.id === '1' ? '1570129477495-49c814698c23' : selectedProperty.id === '2' ? '1512917774080-9991f1c4c750' : '1560445121-4331204755a6'}?w=1200&h=600&fit=crop`}
                  alt={selectedProperty.address}
                  className="w-full h-full object-cover opacity-80"
                />
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">{selectedProperty.address}</h2>
                    <div className="flex items-center gap-2 text-lg text-slate-600">
                      <MapPin className="w-5 h-5" />
                      <span>{selectedProperty.city}, {selectedProperty.province} {selectedProperty.postalCode}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <Edit2 className="w-5 h-5 text-slate-600" />
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedProperty(null);
                        setShowDeleteModal(selectedProperty.id);
                      }}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm text-slate-500 mb-1">Property Type</p>
                    <p className="text-lg font-semibold text-slate-900 capitalize">{selectedProperty.propertyType}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm text-slate-500 mb-1">Units</p>
                    <p className="text-lg font-semibold text-slate-900">{selectedProperty.units} {selectedProperty.units === 1 ? 'unit' : 'units'}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm text-slate-500 mb-1">Purchase Price</p>
                    <p className="text-lg font-semibold text-slate-900">${selectedProperty.purchasePrice.toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Ownership Details</h3>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-semibold text-purple-900">Ownership Type</p>
                        <span className="text-sm bg-purple-200 text-purple-900 px-3 py-1 rounded-full capitalize">
                          {selectedProperty.ownershipType.replace('-', ' ')}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {selectedProperty.owners.map((owner, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-purple-900">{owner.name}</p>
                              <p className="text-sm text-purple-700">{owner.email}</p>
                            </div>
                            <span className="font-bold text-purple-900">{owner.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Financial Summary</h3>
                    <div className="space-y-4">
                      <div className="bg-green-50 rounded-lg p-4">
                        <p className="text-sm font-medium text-green-600 mb-1">YTD Income</p>
                        <p className="text-2xl font-bold text-green-700">${selectedProperty.ytdIncome.toLocaleString()}</p>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-4">
                        <p className="text-sm font-medium text-orange-600 mb-1">YTD Expenses</p>
                        <p className="text-2xl font-bold text-orange-700">${selectedProperty.ytdExpenses.toLocaleString()}</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm font-medium text-blue-600 mb-1">Net Income</p>
                        <p className="text-2xl font-bold text-blue-700">${(selectedProperty.ytdIncome - selectedProperty.ytdExpenses).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-4">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Delete Property</h3>
              <p className="text-slate-600 mb-6">
                Are you sure you want to delete this property? This action cannot be undone.
              </p>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteProperty(showDeleteModal)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Delete Property
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
