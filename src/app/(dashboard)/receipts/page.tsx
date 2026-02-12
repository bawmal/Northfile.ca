'use client';

import { useState, useEffect } from 'react';
import { 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Trash2, 
  Archive, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  X, 
  Camera, 
  Zap,
  Target,
  Archive as ArchiveIcon
} from 'lucide-react';
import Link from 'next/link';

interface Receipt {
  id: string;
  fileName: string;
  fileType: 'pdf' | 'image';
  fileSize: number;
  uploadDate: string;
  propertyId?: string;
  propertyAddress?: string;
  category?: string;
  ocrData?: {
    vendor?: string;
    date?: string;
    amount?: number;
    description?: string;
    confidence?: number;
  };
  matchedTransactionId?: string;
  matchedTransactionDescription?: string;
  status: 'processing' | 'ready' | 'matched' | 'archived';
  retentionYears: number;
}

export default function ReceiptsPage() {
  const [receipts, setReceipts] = useState<Receipt[]>([
    {
      id: 'receipt_1',
      fileName: 'home_depot_receipt.pdf',
      fileType: 'pdf',
      fileSize: 245760,
      uploadDate: '2025-01-14',
      propertyId: 'prop_1',
      propertyAddress: '123 Main Street, Toronto',
      category: 'Repairs & Maintenance',
      ocrData: {
        vendor: 'Home Depot',
        date: '2025-01-14',
        amount: 1250.00,
        description: 'Renovation supplies and tools',
        confidence: 0.95
      },
      matchedTransactionId: 'txn_1',
      matchedTransactionDescription: 'Home Depot - Renovation supplies',
      status: 'matched',
      retentionYears: 7
    },
    {
      id: 'receipt_2',
      fileName: 'city_tax_bill.jpg',
      fileType: 'image',
      fileSize: 1024000,
      uploadDate: '2025-01-10',
      propertyId: 'prop_2',
      propertyAddress: '456 Elm Avenue, Toronto',
      category: 'Property Tax',
      ocrData: {
        vendor: 'City of Toronto',
        date: '2025-01-10',
        amount: 3500.00,
        description: 'Annual property tax bill',
        confidence: 0.88
      },
      status: 'ready',
      retentionYears: 7
    },
    {
      id: 'receipt_3',
      fileName: 'insurance_premium.pdf',
      fileType: 'pdf',
      fileSize: 512000,
      uploadDate: '2025-01-08',
      propertyId: 'prop_3',
      propertyAddress: '789 Oak Road, Mississauga',
      category: 'Insurance',
      ocrData: {
        vendor: 'State Farm Insurance',
        date: '2025-01-08',
        amount: 1800.00,
        description: 'Annual property insurance premium',
        confidence: 0.92
      },
      status: 'ready',
      retentionYears: 7
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [viewingReceipt, setViewingReceipt] = useState<Receipt | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const categories = ['all', 'Repairs & Maintenance', 'Property Tax', 'Insurance', 'Utilities', 'Other'];
  const properties = ['all', '123 Main Street, Toronto', '456 Elm Avenue, Toronto', '789 Oak Road, Mississauga'];

  const filteredReceipts = receipts.filter(receipt => {
    const matchesSearch = searchTerm === '' || 
      receipt.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.ocrData?.vendor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.matchedTransactionDescription?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || receipt.category === selectedCategory;
    const matchesProperty = selectedProperty === 'all' || receipt.propertyAddress === selectedProperty;
    
    return matchesSearch && matchesCategory && matchesProperty;
  });

  const totalReceipts = receipts.length;
  const matchedReceipts = receipts.filter(r => r.status === 'matched').length;
  const unmatchedReceipts = receipts.filter(r => r.status === 'ready').length;
  const totalStorage = receipts.reduce((sum, r) => sum + r.fileSize, 0);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(amount);
  };

  const handleFileUpload = async (files: FileList) => {
    setIsUploading(true);
    setUploadProgress(0);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const progress = ((i + 1) / files.length) * 100;
      setUploadProgress(progress);

      // Simulate OCR processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newReceipt: Receipt = {
        id: `receipt_${Date.now()}_${i}`,
        fileName: file.name,
        fileType: file.type.includes('pdf') ? 'pdf' : 'image',
        fileSize: file.size,
        uploadDate: new Date().toISOString().split('T')[0],
        ocrData: {
          vendor: ['Home Depot', 'Canadian Tire', 'Lowe\'s', 'City of Toronto', 'Enbridge'][Math.floor(Math.random() * 5)],
          date: new Date().toISOString().split('T')[0],
          amount: Math.random() * 1000 + 50,
          description: 'Automatically extracted from receipt',
          confidence: 0.85 + Math.random() * 0.15
        },
        status: 'ready',
        retentionYears: 7
      };

      setReceipts(prev => [...prev, newReceipt]);
    }

    setIsUploading(false);
    setUploadProgress(0);
    setShowUploadModal(false);
  };

  const handleMatchReceipt = (receiptId: string) => {
    setReceipts(prev => prev.map(receipt => 
      receipt.id === receiptId
        ? {
            ...receipt,
            status: 'matched' as const,
            matchedTransactionId: `txn_${Date.now()}`,
            matchedTransactionDescription: 'Matched transaction'
          }
        : receipt
    ));
  };

  const handleArchiveReceipt = (receiptId: string) => {
    setReceipts(prev => prev.map(receipt => 
      receipt.id === receiptId
        ? { ...receipt, status: 'archived' as const }
        : receipt
    ));
  };

  const handleDeleteReceipt = (receiptId: string) => {
    if (confirm('Are you sure you want to delete this receipt?')) {
      setReceipts(prev => prev.filter(receipt => receipt.id !== receiptId));
    }
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
              <Link href="/receipts" className="text-blue-600 font-medium">Receipts</Link>
              <Link href="/mortgages" className="text-slate-600 hover:text-slate-900 transition-colors">Mortgages</Link>
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
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Receipt Vault</h1>
            <p className="text-slate-500 text-lg">Upload, manage, and match receipts for audit-ready records</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Upload Receipts
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-blue-700">Total Receipts</p>
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-800 mb-1">{totalReceipts}</p>
            <p className="text-sm text-blue-600">All receipts</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-green-700">Matched</p>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-800 mb-1">{matchedReceipts}</p>
            <p className="text-sm text-green-600">Linked to transactions</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-orange-700">Unmatched</p>
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-orange-800 mb-1">{unmatchedReceipts}</p>
            <p className="text-sm text-orange-600">Ready to match</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-purple-700">Storage Used</p>
              <ArchiveIcon className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-800 mb-1">{formatFileSize(totalStorage)}</p>
            <p className="text-sm text-purple-600">Total file size</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search receipts, vendors, or transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <select
                value={selectedProperty}
                onChange={(e) => setSelectedProperty(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {properties.map(property => (
                  <option key={property} value={property}>
                    {property === 'all' ? 'All Properties' : property}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Receipts Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-700 w-[300px]">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        onChange={(e) => {
                          // Handle select all functionality
                        }}
                      />
                      Receipt Details
                    </div>
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-700 w-[200px]">OCR Data</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-700 w-[180px]">Property</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-700 w-[120px]">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-700 w-[100px]">Upload Date</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-slate-700 w-[100px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredReceipts.map((receipt) => (
                  <tr key={receipt.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          receipt.fileType === 'pdf' ? 'bg-red-100' : 'bg-green-100'
                        }`}>
                          {receipt.fileType === 'pdf' ? (
                            <FileText className="w-4 h-4 text-red-600" />
                          ) : (
                            <ImageIcon className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-slate-900 truncate max-w-[200px]">{receipt.fileName}</p>
                          <p className="text-sm text-slate-500">{formatFileSize(receipt.fileSize)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {receipt.ocrData ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-900">{receipt.ocrData.vendor}</span>
                            <span className="text-xs text-slate-500">
                              {Math.round((receipt.ocrData.confidence || 0) * 100)}%
                            </span>
                          </div>
                          <p className="text-sm text-slate-600">{formatCurrency(receipt.ocrData.amount || 0)}</p>
                          <p className="text-xs text-slate-500">{receipt.ocrData.date}</p>
                        </div>
                      ) : (
                        <span className="text-sm text-slate-500">No OCR data</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {receipt.propertyAddress ? (
                        <div>
                          <p className="text-sm font-medium text-slate-900 truncate max-w-[150px]">{receipt.propertyAddress}</p>
                          {receipt.category && (
                            <p className="text-xs text-slate-500">{receipt.category}</p>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-slate-500">Not assigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          receipt.status === 'matched' ? 'bg-green-100 text-green-700' :
                          receipt.status === 'ready' ? 'bg-orange-100 text-orange-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {receipt.status === 'matched' ? 'Matched' :
                           receipt.status === 'ready' ? 'Ready' : 'Archived'}
                        </span>
                        {receipt.matchedTransactionDescription && (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-900">{receipt.uploadDate}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setViewingReceipt(receipt)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {receipt.status === 'ready' && (
                          <button
                            onClick={() => handleMatchReceipt(receipt.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {receipt.status === 'matched' && (
                          <button
                            onClick={() => handleArchiveReceipt(receipt.id)}
                            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <Archive className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteReceipt(receipt.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Table Footer with Bulk Actions */}
          <div className="bg-slate-50 border-t border-slate-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing {filteredReceipts.length} of {totalReceipts} receipts
              </p>
              <div className="flex items-center gap-4">
                <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>10 per page</option>
                  <option>25 per page</option>
                  <option>50 per page</option>
                  <option>100 per page</option>
                </select>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-100 disabled:opacity-50" disabled>
                    Previous
                  </button>
                  <span className="text-sm text-slate-600">Page 1 of 1</span>
                  <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-100 disabled:opacity-50" disabled>
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Upload Receipts</h3>
                  <p className="text-blue-100">Add receipts for automatic OCR processing and matching</p>
                </div>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            <div className="p-8 overflow-y-auto flex-1">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-blue-300 bg-blue-50 rounded-2xl p-12 text-center hover:border-blue-400 hover:bg-blue-100 transition-all duration-200">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-10 h-10 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-2">Drop receipts here</h4>
                  <p className="text-slate-600 mb-4">or click to browse your files</p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium cursor-pointer transition-colors flex items-center gap-2"
                  >
                    <Upload className="w-5 h-5" />
                    Choose Files
                  </label>
                  <div className="text-sm text-slate-500">
                    <span className="font-medium">Supported:</span> PDF, JPG, PNG (Max 10MB)
                  </div>
                </div>
              </div>

              {/* File Types Info */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <FileText className="w-6 h-6 text-red-600" />
                  </div>
                  <p className="text-sm font-medium text-slate-900">PDF Documents</p>
                  <p className="text-xs text-slate-500">Scanned receipts</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Camera className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-slate-900">Photos</p>
                  <p className="text-xs text-slate-500">JPG, PNG images</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-sm font-medium text-slate-900">OCR Processing</p>
                  <p className="text-xs text-slate-500">Automatic extraction</p>
                </div>
              </div>

              {/* Progress Section */}
              {isUploading && (
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <Upload className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Processing Receipts</p>
                        <p className="text-sm text-slate-600">Extracting data with OCR technology</p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">{uploadProgress}%</span>
                  </div>
                  
                  <div className="w-full bg-blue-100 rounded-full h-3 mb-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Uploading files...</span>
                    <span>Almost done!</span>
                  </div>
                </div>
              )}

              {/* Features Section */}
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 mb-1">Automatic Data Extraction</p>
                    <p className="text-sm text-slate-600">OCR extracts vendor, date, amount, and description automatically</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 mb-1">Smart Matching</p>
                    <p className="text-sm text-slate-600">Receipts are automatically matched to existing transactions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 mb-1">Fast Processing</p>
                    <p className="text-sm text-slate-600">Most receipts processed in 2-5 seconds</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ArchiveIcon className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 mb-1">Audit Ready</p>
                    <p className="text-sm text-slate-600">All receipts stored for 7-year retention compliance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Receipt View Modal */}
      {viewingReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">{viewingReceipt.fileName}</h3>
              <button
                onClick={() => setViewingReceipt(null)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">Receipt Information</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">File Name</p>
                      <p className="font-medium text-slate-900">{viewingReceipt.fileName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">File Type</p>
                      <p className="font-medium text-slate-900 capitalize">{viewingReceipt.fileType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">File Size</p>
                      <p className="font-medium text-slate-900">{formatFileSize(viewingReceipt.fileSize)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Upload Date</p>
                      <p className="font-medium text-slate-900">{viewingReceipt.uploadDate}</p>
                    </div>
                    {viewingReceipt.propertyAddress && (
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Property</p>
                        <p className="font-medium text-slate-900">{viewingReceipt.propertyAddress}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">OCR Extracted Data</h4>
                  {viewingReceipt.ocrData ? (
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Vendor</p>
                        <p className="font-medium text-slate-900">{viewingReceipt.ocrData.vendor || 'Not detected'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Date</p>
                        <p className="font-medium text-slate-900">{viewingReceipt.ocrData.date || 'Not detected'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Amount</p>
                        <p className="font-medium text-slate-900">
                          {viewingReceipt.ocrData.amount ? formatCurrency(viewingReceipt.ocrData.amount) : 'Not detected'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Description</p>
                        <p className="font-medium text-slate-900">{viewingReceipt.ocrData.description || 'Not detected'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Confidence Score</p>
                        <p className="font-medium text-slate-900">
                          {Math.round((viewingReceipt.ocrData.confidence || 0) * 100)}%
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-500">No OCR data available</p>
                  )}
                </div>
              </div>

              {viewingReceipt.matchedTransactionDescription && (
                <div className="mt-8 p-4 bg-green-50 rounded-lg">
                  <h4 className="text-lg font-semibold text-green-900 mb-2">✓ Matched Transaction</h4>
                  <p className="text-green-700">{viewingReceipt.matchedTransactionDescription}</p>
                </div>
              )}

              <div className="mt-8 flex gap-4">
                {viewingReceipt.status === 'ready' && (
                  <button
                    onClick={() => {
                      handleMatchReceipt(viewingReceipt.id);
                      setViewingReceipt(null);
                    }}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                  >
                    Match to Transaction
                  </button>
                )}
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                  Download Receipt
                </button>
                <button
                  onClick={() => setViewingReceipt(null)}
                  className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
