"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  CheckCircle, 
  ArrowRight, 
  Home, 
  FileText, 
  CreditCard, 
  Users, 
  Building,
  ArrowLeft,
  ArrowRight as ArrowRightIcon,
  Upload,
  AlertTriangle,
  Plus,
  Settings
} from "lucide-react";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
  href?: string;
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [uploadStatus, setUploadStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Phone number formatting function
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');
    
    // Apply Canadian phone number format: (XXX) XXX-XXXX
    if (cleaned.length <= 3) {
      return cleaned.length === 3 ? `(${cleaned}` : cleaned;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    e.target.value = formattedValue;
  };

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to Northfile',
      description: 'Your complete property management solution. Let\'s get you set up in just a few minutes.',
      icon: <Home className="w-8 h-8" />,
      completed: completedSteps.includes('welcome')
    },
    {
      id: 'account',
      title: 'Complete Your Profile',
      description: 'Add your personal details for T776 filing and account setup.',
      icon: <Users className="w-8 h-8" />,
      completed: completedSteps.includes('account'),
    },
    {
      id: 'properties',
      title: 'Add Your Properties',
      description: 'Enter property address and ownership details for T776 filing.',
      icon: <Building className="w-8 h-8" />,
      completed: completedSteps.includes('properties'),
    },
    {
      id: 'transactions',
      title: 'Upload Bank Statements',
      description: 'Upload bank statements (CSV, PDF) to automatically import and categorize transactions.',
      icon: <Upload className="w-8 h-8" />,
      completed: completedSteps.includes('transactions'),
    },
    {
      id: 'complete',
      title: 'You\'re All Set!',
      description: 'Your account is ready. Start managing your properties with Northfile.',
      icon: <CheckCircle className="w-8 h-8" />,
      completed: completedSteps.includes('complete'),
      href: '/dashboard'
    }
  ];

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      handleStepComplete(steps[currentStep].id);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const currentStepData = steps[currentStep];
  const progress = ((completedSteps.length + (currentStep > 0 ? 1 : 0)) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-light text-slate-900" style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.02em' }}>
                Northfile
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">
                {completedSteps.length + 1} of {steps.length} completed
              </span>
              <Link 
                href="/dashboard" 
                className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium"
              >
                Skip to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-slate-900">Getting Started</h2>
            <span className="text-sm text-slate-600">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                index < currentStep ? 'bg-blue-600 text-white' :
                index === currentStep ? 'bg-blue-100 text-blue-600 border-2 border-blue-600' :
                completedSteps.includes(step.id) ? 'bg-green-600 text-white' :
                'bg-slate-200 text-slate-500'
              }`}>
                {index < currentStep ? (
                  <CheckCircle className="w-5 h-5" />
                ) : index === currentStep ? (
                  <span className="text-sm font-bold">{index + 1}</span>
                ) : completedSteps.includes(step.id) ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-bold">{index + 1}</span>
                )}
              </div>
              <span className={`text-xs text-center mt-2 max-w-20 ${
                index === currentStep ? 'text-blue-600 font-semibold' :
                completedSteps.includes(step.id) ? 'text-green-600 font-medium' :
                'text-slate-500'
              }`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Current Step Content */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-start gap-6">
              {/* Step Icon */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                currentStep === 0 ? 'bg-blue-100 text-blue-600' :
                currentStep === 1 ? 'bg-green-100 text-green-600' :
                currentStep === 2 ? 'bg-orange-100 text-orange-600' :
                currentStep === 3 ? 'bg-purple-100 text-purple-600' :
                'bg-emerald-100 text-emerald-600'
              }`}>
                {currentStepData.icon}
              </div>

              {/* Step Content */}
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {currentStepData.title}
                </h3>
                <p className="text-slate-600 mb-6 text-lg">
                  {currentStepData.description}
                </p>

                {/* Step-specific content */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8">
                      <h4 className="text-xl font-semibold text-blue-900 mb-4">Welcome to Northfile</h4>
                      <p className="text-blue-800 text-lg mb-6 leading-relaxed">
                        Your complete property management solution. Let's get you set up in just a few minutes.
                      </p>
                      
                      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-blue-100">
                        <h5 className="text-lg font-semibold text-slate-900 mb-4">What you can do with Northfile:</h5>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-slate-700">Track rental income and expenses across multiple properties</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-slate-700">Generate tax-ready T776 forms automatically</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-slate-700">Store receipts with OCR and 6-year retention</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-slate-700">Collaborate with accountants securely</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-slate-700">Create Ontario RTA-compliant notices (N1, N4)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8">
                      <h4 className="text-xl font-semibold text-green-900 mb-4">Complete Your Profile</h4>
                      <p className="text-green-800 text-lg mb-6 leading-relaxed">
                        Add your personal details for T776 filing and account setup.
                      </p>
                      
                      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-green-100">
                        <h5 className="text-lg font-semibold text-slate-900 mb-4">Required Information:</h5>
                        <div className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">Full Legal Name</label>
                              <input 
                                type="text" 
                                placeholder="John Smith"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                              <input 
                                type="tel" 
                                placeholder="(416) 555-0123"
                                onChange={handlePhoneChange}
                                maxLength={14}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                              />
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">SIN (for T776) - Optional</label>
                              <input 
                                type="text" 
                                placeholder="123-456-789 (optional)"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">Business Number (if applicable)</label>
                              <input 
                                type="text" 
                                placeholder="123456789"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-slate-700 mb-2">Street Address</label>
                              <input 
                                type="text" 
                                placeholder="123 Main St"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">Unit/Apt (optional)</label>
                              <input 
                                type="text" 
                                placeholder="Unit 4"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
                              <input 
                                type="text" 
                                placeholder="Toronto"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">Province</label>
                              <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                                <option value="">Select Province</option>
                                <option value="ON">Ontario</option>
                                <option value="BC">British Columbia</option>
                                <option value="AB">Alberta</option>
                                <option value="QC">Quebec</option>
                                <option value="MB">Manitoba</option>
                                <option value="SK">Saskatchewan</option>
                                <option value="NS">Nova Scotia</option>
                                <option value="NB">New Brunswick</option>
                                <option value="NL">Newfoundland and Labrador</option>
                                <option value="PE">Prince Edward Island</option>
                                <option value="NT">Northwest Territories</option>
                                <option value="YT">Yukon</option>
                                <option value="NU">Nunavut</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">Postal Code</label>
                              <input 
                                type="text" 
                                placeholder="M5V 2T6"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                              />
                            </div>
                          </div>

                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-800">
                              <strong>📋 T776 Filing Requirements:</strong> Your personal information is required for CRA compliance and will be used to generate your T776 forms. SIN is optional - you can provide it later when filing. All data is encrypted and stored securely.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-8">
                      <h4 className="text-xl font-semibold text-orange-900 mb-4">Add Your Properties</h4>
                      <p className="text-orange-800 text-lg mb-6 leading-relaxed">
                        Enter property address and ownership details to get started with T776 filing.
                      </p>
                      
                      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-orange-100">
                        <h5 className="text-lg font-semibold text-slate-900 mb-4">Property Information:</h5>
                        
                        <div className="space-y-6">
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-slate-700 mb-2">Street Address</label>
                              <input 
                                type="text" 
                                placeholder="123 Main St"
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">Unit/Apt (optional)</label>
                              <input 
                                type="text" 
                                placeholder="Unit 4"
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
                              <input 
                                type="text" 
                                placeholder="Toronto"
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">Province</label>
                              <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                                <option value="">Select Province</option>
                                <option value="ON">Ontario</option>
                                <option value="BC">British Columbia</option>
                                <option value="AB">Alberta</option>
                                <option value="QC">Quebec</option>
                                <option value="MB">Manitoba</option>
                                <option value="SK">Saskatchewan</option>
                                <option value="NS">Nova Scotia</option>
                                <option value="NB">New Brunswick</option>
                                <option value="NL">Newfoundland and Labrador</option>
                                <option value="PE">Prince Edward Island</option>
                                <option value="NT">Northwest Territories</option>
                                <option value="YT">Yukon</option>
                                <option value="NU">Nunavut</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">Postal Code</label>
                              <input 
                                type="text" 
                                placeholder="M5V 2T6"
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              />
                            </div>
                          </div>
                          <p className="text-xs text-slate-500">We'll automatically fetch property details and images</p>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">Property Type</label>
                              <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                                <option value="">Select Type</option>
                                <option value="house">House</option>
                                <option value="condo">Condo</option>
                                <option value="duplex">Duplex</option>
                                <option value="triplex">Triplex</option>
                                <option value="apartment">Apartment Building</option>
                                <option value="townhouse">Townhouse</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">Number of Units</label>
                              <input 
                                type="number" 
                                placeholder="1"
                                min="1"
                                max="50"
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              />
                            </div>
                          </div>

                          <div className="border-t border-slate-200 pt-6">
                            <h5 className="text-lg font-semibold text-slate-900 mb-4">Ownership Structure</h5>
                            
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Ownership Type</label>
                                <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                                  <option value="">Select Ownership Type</option>
                                  <option value="sole">Sole Ownership</option>
                                  <option value="joint">Joint Ownership</option>
                                  <option value="tenancy-in-common">Tenancy in Common</option>
                                  <option value="corporation">Corporation</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Your Ownership Percentage</label>
                                <div className="flex items-center gap-2">
                                  <input 
                                    type="number" 
                                    placeholder="100"
                                    min="1"
                                    max="100"
                                    className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                  />
                                  <span className="text-slate-600 font-medium">%</span>
                                </div>
                              </div>

                              <div className="border-t border-slate-200 pt-4">
                                <h6 className="text-sm font-semibold text-slate-900 mb-3">Co-Owners (if applicable)</h6>
                                <div className="space-y-3">
                                  <div className="grid md:grid-cols-3 gap-3">
                                    <input 
                                      type="text" 
                                      placeholder="Co-owner Name"
                                      className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    />
                                    <input 
                                      type="email" 
                                      placeholder="Email (optional)"
                                      className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    />
                                    <div className="flex items-center gap-2">
                                      <input 
                                        type="number" 
                                        placeholder="%"
                                        min="1"
                                        max="100"
                                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                      />
                                      <span className="text-slate-600 text-sm">%</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                <p className="text-sm text-orange-800">
                                  <strong>📋 T776 Ownership Rules:</strong> Each owner must file a separate T776 form reporting their percentage share of income and expenses. Joint tenants typically split 50/50 unless otherwise specified.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-8">
                      <h4 className="text-xl font-semibold text-blue-900 mb-4">Upload Bank Statements</h4>
                      <p className="text-blue-800 text-lg mb-6 leading-relaxed">
                        Upload bank statements (CSV, PDF) to automatically import and categorize transactions.
                      </p>
                      
                      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-blue-100">
                        <h5 className="text-lg font-semibold text-slate-900 mb-4">Choose Your Method:</h5>
                        <div className="grid md:grid-cols-2 gap-6">
                          <button 
                            onClick={() => {
                              // Trigger file upload for bank statements
                              const input = document.createElement('input');
                              input.type = 'file';
                              input.accept = '.csv,.pdf,.ofx,.qfx';
                              input.multiple = true;
                              input.onchange = (e) => {
                                const files = (e.target as HTMLInputElement).files;
                                if (files && files.length > 0) {
                                  console.log('Uploading bank statements:', files);
                                  setUploadStatus({
                                    type: 'success',
                                    message: `Successfully uploaded ${files.length} bank statement file(s)`
                                  });
                                  // Clear status after 3 seconds
                                  setTimeout(() => {
                                    setUploadStatus({ type: null, message: '' });
                                  }, 3000);
                                }
                              };
                              input.click();
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-xl text-left transition-colors"
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <Upload className="w-6 h-6" />
                              <span className="font-semibold">Upload Statements</span>
                            </div>
                            <p className="text-sm opacity-90">Upload bank statements for automatic imports</p>
                          </button>
                          <button 
                            onClick={() => {
                              // Trigger file upload for CSV
                              const input = document.createElement('input');
                              input.type = 'file';
                              input.accept = '.csv';
                              input.multiple = true;
                              input.onchange = (e) => {
                                const files = (e.target as HTMLInputElement).files;
                                if (files && files.length > 0) {
                                  console.log('Uploading CSV files:', files);
                                  setUploadStatus({
                                    type: 'success',
                                    message: `Successfully uploaded ${files.length} CSV file(s)`
                                  });
                                  // Clear status after 3 seconds
                                  setTimeout(() => {
                                    setUploadStatus({ type: null, message: '' });
                                  }, 3000);
                                }
                              };
                              input.click();
                            }}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-6 rounded-xl text-left transition-colors"
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <FileText className="w-6 h-6" />
                              <span className="font-semibold">Upload CSV</span>
                            </div>
                            <p className="text-sm">Import transaction files manually</p>
                          </button>
                        </div>
                        
                        {/* Upload Status Notification */}
                        {uploadStatus.type && (
                          <div className={`mt-4 p-4 rounded-lg border ${
                            uploadStatus.type === 'success' 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-red-50 border-red-200'
                          }`}>
                            <div className="flex items-center gap-2">
                              {uploadStatus.type === 'success' ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <AlertTriangle className="w-5 h-5 text-red-600" />
                              )}
                              <p className={`text-sm ${
                                uploadStatus.type === 'success' 
                                  ? 'text-green-800' 
                                  : 'text-red-800'
                              }`}>
                                {uploadStatus.message}
                              </p>
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm text-blue-800">
                            <strong>📁 Supported Formats:</strong> CSV, PDF, OFX, QFX files. We'll automatically categorize transactions and detect duplicates.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-8">
                      <h4 className="text-xl font-semibold text-emerald-900 mb-4">You're All Set!</h4>
                      <p className="text-emerald-800 text-lg mb-6 leading-relaxed">
                        Your account is ready. Start managing your properties with Northfile.
                      </p>
                      
                      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-emerald-100">
                        <h5 className="text-lg font-semibold text-slate-900 mb-4">Ready to Go:</h5>
                        <div className="space-y-4">
                          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <CheckCircle className="w-8 h-8 text-green-600" />
                              <h4 className="text-xl font-bold text-green-900">Setup Complete!</h4>
                            </div>
                            <p className="text-green-800 mb-6">
                              Your Northfile account is ready to use. You can now manage properties, track expenses, generate tax forms, and collaborate with your accountant.
                            </p>
                            <div className="flex items-center gap-4 mb-12">
                              <Link 
                                href="/dashboard" 
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center gap-2"
                              >
                                Go to Dashboard
                                <ArrowRight className="w-5 h-5" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="bg-slate-50 px-8 py-6 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentStep === 0 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex items-center gap-3">
                {currentStep < steps.length - 1 && (
                  <button
                    onClick={handleSkip}
                    className="text-slate-600 hover:text-slate-800 font-medium transition-colors"
                  >
                    Skip this step
                  </button>
                )}
                
                <button
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  {currentStep === steps.length - 1 ? 'Go to Dashboard' : 'Next Step'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
