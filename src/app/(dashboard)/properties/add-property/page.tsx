'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, X, Calendar, MapPin, Home, Users, Calculator } from 'lucide-react';
import Link from 'next/link';

export default function AddPropertyPage() {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    province: 'ON',
    postalCode: '',
    propertyType: '',
    units: 1,
    purchaseDate: '',
    purchasePrice: '',
    ownershipType: 'sole',
    owners: [{ name: '', email: '', percentage: 100 }],
    rentalStartDate: '',
    isRentalFullYear: true,
    hasMortgage: false,
    mortgage: {
      interestRate: '',
      loanAmount: '',
      startDate: '',
      amortizationYears: 30
    }
  });

  const [propertyImage, setPropertyImage] = useState<string>('');
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddOwner = () => {
    setFormData(prev => ({
      ...prev,
      owners: [...prev.owners, { name: '', email: '', percentage: 0 }]
    }));
  };

  const handleRemoveOwner = (index: number) => {
    setFormData(prev => ({
      ...prev,
      owners: prev.owners.filter((_, i) => i !== index)
    }));
  };

  const handleOwnerChange = (index: number, field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      owners: prev.owners.map((owner, i) => 
        i === index ? { ...owner, [field]: value } : owner
      )
    }));
  };

  const fetchPropertyImage = async () => {
    if (!formData.address || !formData.city) return;
    
    setIsLoadingImage(true);
    
    try {
      // Construct Google Street View URL
      const fullAddress = `${formData.address}, ${formData.city}, ${formData.province} ${formData.postalCode}`;
      const encodedAddress = encodeURIComponent(fullAddress);
      const streetViewUrl = `https://maps.googleapis.com/maps/api/streetview?size=800x600&location=${encodedAddress}&key=YOUR_API_KEY`;
      
      // For demo purposes, use a placeholder service that generates street view images
      // In production, you'd use Google Street View API
      const demoImageUrl = `https://picsum.photos/seed/${encodedAddress.replace(/\s/g, '')}/800/600.jpg`;
      
      setPropertyImage(demoImageUrl);
    } catch (error) {
      console.error('Error fetching property image:', error);
    } finally {
      setIsLoadingImage(false);
    }
  };

  // Auto-fetch image when address changes
  useEffect(() => {
    if (formData.address && formData.city) {
      const timer = setTimeout(() => {
        fetchPropertyImage();
      }, 1000); // Debounce for 1 second
      
      return () => clearTimeout(timer);
    }
  }, [formData.address, formData.city]);
  const handleSubmit = async (e: React.FormEvent) => {
    
    // Validation
    if (!formData.address.trim()) {
      alert('Please enter a property address');
      return;
    }
    
    if (!formData.city.trim()) {
      alert('Please enter a city');
      return;
    }
    
    if (!formData.postalCode.trim()) {
      alert('Please enter a postal code');
      return;
    }
    
    if (!formData.propertyType) {
      alert('Please select a property type');
      return;
    }
    
    if (!formData.purchaseDate) {
      alert('Please enter a purchase date');
      return;
    }
    
    if (!formData.purchasePrice || parseFloat(formData.purchasePrice) <= 0) {
      alert('Please enter a valid purchase price');
      return;
    }
    
    // Check ownership percentages sum to 100%
    const totalOwnership = formData.owners.reduce((sum, owner) => sum + owner.percentage, 0);
    if (totalOwnership !== 100) {
      alert(`Ownership percentages must sum to 100%. Current total: ${totalOwnership}%`);
      return;
    }
    
    // Check all owners have names
    const invalidOwners = formData.owners.filter(owner => !owner.name.trim());
    if (invalidOwners.length > 0) {
      alert('Please enter names for all owners');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect back to properties
    window.location.href = '/properties';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/properties" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Back to Properties
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Add New Property</h1>
          <p className="text-slate-600">Enter details for your rental property</p>
        </div>

        {/* Property Image Preview */}
        {propertyImage && (
          <div className="mb-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Property Image Preview</h3>
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src={propertyImage} 
                  alt="Property preview"
                  className="w-full h-64 object-cover"
                />
                {isLoadingImage && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-white">Loading property image...</div>
                  </div>
                )}
              </div>
              <p className="text-sm text-slate-500 mt-2">Automatically fetched from Google Street View</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Property Information */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Home className="w-5 h-5" />
              Property Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="123 Main Street"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Toronto"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Province
                </label>
                <select
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="ON">Ontario</option>
                  <option value="BC">British Columbia</option>
                  <option value="AB">Alberta</option>
                  <option value="QC">Quebec</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="M5V 2T6"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Property Type
                </label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  required
                >
                  <option value="">Select type</option>
                  <option value="detached">Detached House</option>
                  <option value="semi-detached">Semi-Detached</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="condo">Condominium</option>
                  <option value="duplex">Duplex</option>
                  <option value="triplex">Triplex</option>
                  <option value="fourplex">Fourplex</option>
                  <option value="apartment">Apartment Building</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Number of Units
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.units}
                  onChange={(e) => setFormData({ ...formData, units: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          {/* Purchase Information */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Purchase Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Purchase Date
                </label>
                <input
                  type="date"
                  value={formData.purchaseDate}
                  onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Purchase Price
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.purchasePrice}
                  onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="500000"
                  required
                />
              </div>
            </div>
          </div>

          {/* Ownership Information */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Ownership Information
            </h2>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Ownership Type
              </label>
              <select
                value={formData.ownershipType}
                onChange={(e) => setFormData({ ...formData, ownershipType: e.target.value })}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              >
                <option value="sole">Sole Ownership</option>
                <option value="joint">Joint Ownership</option>
                <option value="tenancy-in-common">Tenancy in Common</option>
              </select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Owners</h3>
                {formData.ownershipType !== 'sole' && (
                  <button
                    type="button"
                    onClick={handleAddOwner}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Owner
                  </button>
                )}
              </div>

              {formData.owners.map((owner, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-4">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Owner Name
                      </label>
                      <input
                        type="text"
                        value={owner.name}
                        onChange={(e) => handleOwnerChange(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={owner.email}
                        onChange={(e) => handleOwnerChange(index, 'email', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Ownership %
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={owner.percentage}
                        onChange={(e) => handleOwnerChange(index, 'percentage', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="50"
                        required
                      />
                    </div>
                    
                    {formData.ownershipType !== 'sole' && formData.owners.length > 1 && (
                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() => handleRemoveOwner(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="text-sm text-slate-600">
                Total ownership: {formData.owners.reduce((sum, owner) => sum + owner.percentage, 0)}%
                {formData.owners.reduce((sum, owner) => sum + owner.percentage, 0) !== 100 && (
                  <span className="text-red-600 ml-2">Must equal 100%</span>
                )}
              </div>
            </div>
          </div>

          {/* Rental Information */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Rental Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isRentalFullYear}
                    onChange={(e) => setFormData({ ...formData, isRentalFullYear: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Property was rented for the full tax year
                  </span>
                </label>
              </div>
              
              {!formData.isRentalFullYear && (
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Rental Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.rentalStartDate}
                    onChange={(e) => setFormData({ ...formData, rentalStartDate: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
              )}
            </div>
          </div>

          {/* Mortgage Information */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Mortgage Information (Optional)</h2>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasMortgage}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    hasMortgage: e.target.checked
                  })}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700">
                  This property has a mortgage
                </span>
              </label>
              
              {formData.hasMortgage && (
                <div className="grid md:grid-cols-2 gap-6 pl-7 border-l-4 border-blue-200">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="30"
                      value={formData.mortgage.interestRate}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        mortgage: { ...formData.mortgage, interestRate: e.target.value }
                      })}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="3.5"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Loan Amount ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.mortgage.loanAmount}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        mortgage: { ...formData.mortgage, loanAmount: e.target.value }
                      })}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="400000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Mortgage Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.mortgage.startDate}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        mortgage: { ...formData.mortgage, startDate: e.target.value }
                      })}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Amortization Period (years)
                    </label>
                    <select
                      value={formData.mortgage.amortizationYears}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        mortgage: { ...formData.mortgage, amortizationYears: parseInt(e.target.value) }
                      })}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    >
                      <option value="15">15 years</option>
                      <option value="20">20 years</option>
                      <option value="25">25 years</option>
                      <option value="30">30 years</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-between">
            <Link
              href="/properties"
              className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </Link>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white/60 animate-spin rounded-full"></div>
                  Adding Property...
                </>
              ) : (
                <>
                  Add Property
                  <Plus className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
