"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  MessageSquare, 
  FileText, 
  Download, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Send,
  Filter,
  Search,
  Calendar,
  UserPlus,
  Settings,
  Lock,
  Mail,
  Phone,
  Building
} from "lucide-react";

interface Accountant {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'pending' | 'inactive';
  properties: string[];
  lastLogin: string;
  permissions: string[];
}

interface Comment {
  id: string;
  author: string;
  authorRole: 'landlord' | 'accountant';
  content: string;
  timestamp: string;
  property?: string;
  category: 'general' | 'transaction' | 'receipt' | 'tax' | 'reconciliation';
}

interface ReceiptRequest {
  id: string;
  property: string;
  category: string;
  description: string;
  amount: string;
  date: string;
  status: 'pending' | 'provided' | 'resolved';
  requestedBy: string;
  requestedAt: string;
}

interface ReconciliationItem {
  id: string;
  property: string;
  category: string;
  item: string;
  landlordAmount: string;
  accountantAmount: string;
  variance: string;
  status: 'pending' | 'approved' | 'disputed';
  lastUpdated: string;
}

export default function CollaborationPage() {
  const [activeTab, setActiveTab] = useState<'accountants' | 'comments' | 'requests' | 'reconciliation'>('accountants');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('all');

  // Mock data
  const accountants: Accountant[] = [
    {
      id: 'acc_1',
      name: 'Sarah Chen, CPA',
      email: 'sarah.chen@taxpro.ca',
      phone: '(416) 555-0123',
      status: 'active',
      properties: ['123 Main Street', '456 Oak Avenue'],
      lastLogin: '2025-02-10 09:30',
      permissions: ['view_transactions', 'view_receipts', 'view_reports', 'add_comments', 'request_receipts']
    },
    {
      id: 'acc_2',
      name: 'Michael Roberts',
      email: 'michael.roberts@accounting.ca',
      phone: '(647) 555-0456',
      status: 'pending',
      properties: ['789 Maple Drive'],
      lastLogin: 'Never',
      permissions: ['view_transactions', 'view_receipts']
    }
  ];

  const comments: Comment[] = [
    {
      id: 'comment_1',
      author: 'Sarah Chen, CPA',
      authorRole: 'accountant',
      content: 'Please provide receipts for the $2,500 maintenance expense at 123 Main Street for Q4 2024. Need to verify capital vs repair classification.',
      timestamp: '2025-02-09 14:30',
      property: '123 Main Street',
      category: 'receipt'
    },
    {
      id: 'comment_2',
      author: 'Jane Landlord',
      authorRole: 'landlord',
      content: 'Receipts uploaded to Receipt Vault. Maintenance was for emergency boiler repair - should be deductible repair expense.',
      timestamp: '2025-02-09 16:45',
      property: '123 Main Street',
      category: 'receipt'
    }
  ];

  const receiptRequests: ReceiptRequest[] = [
    {
      id: 'req_1',
      property: '123 Main Street',
      category: 'Maintenance',
      description: 'Q4 2024 maintenance expenses',
      amount: '$2,500',
      date: '2025-02-09',
      status: 'provided',
      requestedBy: 'Sarah Chen, CPA',
      requestedAt: '2025-02-09 14:30'
    },
    {
      id: 'req_2',
      property: '456 Oak Avenue',
      category: 'Insurance',
      description: '2024 annual insurance policy',
      amount: '$1,800',
      date: '2025-02-10',
      status: 'pending',
      requestedBy: 'Sarah Chen, CPA',
      requestedAt: '2025-02-10 11:15'
    }
  ];

  const reconciliationItems: ReconciliationItem[] = [
    {
      id: 'rec_1',
      property: '123 Main Street',
      category: 'Mortgage Interest',
      item: '2024 Annual Statement',
      landlordAmount: '$12,450.00',
      accountantAmount: '$12,447.89',
      variance: '$2.11',
      status: 'approved',
      lastUpdated: '2025-02-08 16:20'
    },
    {
      id: 'rec_2',
      property: '456 Oak Avenue',
      category: 'Utilities',
      item: 'December electricity',
      landlordAmount: '$145.00',
      accountantAmount: '$145.00',
      variance: '$0.00',
      status: 'pending',
      lastUpdated: '2025-02-10 09:30'
    }
  ];

  const properties = ['all', '123 Main Street', '456 Oak Avenue', '789 Maple Drive'];

  const filteredAccountants = accountants.filter(accountant => 
    accountant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    accountant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredComments = comments.filter(comment => 
    (selectedProperty === 'all' || comment.property === selectedProperty) &&
    comment.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-2xl font-light text-slate-900" style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.02em' }}>
              Northfile
            </span>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-slate-600 hover:text-slate-900 transition-colors">Dashboard</Link>
              <Link href="/properties" className="text-slate-600 hover:text-slate-900 transition-colors">Properties</Link>
              <Link href="/transactions" className="text-slate-600 hover:text-slate-900 transition-colors">Transactions</Link>
              <Link href="/receipts" className="text-slate-600 hover:text-slate-900 transition-colors">Receipts</Link>
              <Link href="/mortgages" className="text-slate-600 hover:text-slate-900 transition-colors">Mortgages</Link>
              <Link href="/reports" className="text-slate-600 hover:text-slate-900 transition-colors">Reports</Link>
              <Link href="/notices" className="text-slate-600 hover:text-slate-900 transition-colors">Notices</Link>
              <Link href="/collaboration" className="text-blue-600 font-medium">Collaboration</Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Accountant Collaboration</h1>
          <p className="text-slate-600">Manage accountant access, comments, receipt requests, and reconciliation approvals</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden mb-8">
          <div className="border-b-2 border-slate-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('accountants')}
                className={`px-6 py-4 font-semibold text-sm transition-colors ${
                  activeTab === 'accountants'
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Accountants
                </div>
              </button>
              <button
                onClick={() => setActiveTab('comments')}
                className={`px-6 py-4 font-semibold text-sm transition-colors ${
                  activeTab === 'comments'
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Comments
                </div>
              </button>
              <button
                onClick={() => setActiveTab('requests')}
                className={`px-6 py-4 font-semibold text-sm transition-colors ${
                  activeTab === 'requests'
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Receipt Requests
                </div>
              </button>
              <button
                onClick={() => setActiveTab('reconciliation')}
                className={`px-6 py-4 font-semibold text-sm transition-colors ${
                  activeTab === 'reconciliation'
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Reconciliation
                </div>
              </button>
            </div>
          </div>

          {/* Accountants Tab */}
          {activeTab === 'accountants' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900">Manage Accountants</h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Invite Accountant
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search accountants..."
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Accountants List */}
              <div className="space-y-4">
                {filteredAccountants.map((accountant) => (
                  <div key={accountant.id} className="border-2 border-slate-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-slate-900">{accountant.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              accountant.status === 'active' ? 'bg-green-100 text-green-700' :
                              accountant.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                              'bg-slate-100 text-slate-700'
                            }`}>
                              {accountant.status}
                            </span>
                          </div>
                          <div className="text-sm text-slate-600 mb-2">{accountant.email}</div>
                          <div className="text-sm text-slate-600 mb-3">{accountant.phone}</div>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Building className="w-4 h-4 text-slate-500" />
                              <span className="text-slate-700">{accountant.properties.length} properties</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-slate-500" />
                              <span className="text-slate-700">Last: {accountant.lastLogin}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 border-2 border-slate-200 hover:border-slate-300 rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-slate-600" />
                        </button>
                        <button className="p-2 border-2 border-slate-200 hover:border-red-300 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments Tab */}
          {activeTab === 'comments' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900">Comments & Notes</h3>
                <div className="flex items-center gap-4">
                  <select 
                    className="px-4 py-2 border-2 border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none"
                    value={selectedProperty}
                    onChange={(e) => setSelectedProperty(e.target.value)}
                  >
                    {properties.map(property => (
                      <option key={property} value={property}>
                        {property === 'all' ? 'All Properties' : property}
                      </option>
                    ))}
                  </select>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search comments..."
                      className="pl-10 pr-4 py-2 border-2 border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {filteredComments.map((comment) => (
                  <div key={comment.id} className="border-2 border-slate-200 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        comment.authorRole === 'accountant' ? 'bg-blue-100' : 'bg-green-100'
                      }`}>
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-slate-900">{comment.author}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              comment.authorRole === 'accountant' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                            }`}>
                              {comment.authorRole}
                            </span>
                          </div>
                          <span className="text-sm text-slate-500">{comment.timestamp}</span>
                        </div>
                        <p className="text-slate-700 mb-3">{comment.content}</p>
                        <div className="flex items-center gap-4 text-sm">
                          {comment.property && (
                            <div className="flex items-center gap-1">
                              <Building className="w-4 h-4 text-slate-500" />
                              <span className="text-slate-600">{comment.property}</span>
                            </div>
                          )}
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            comment.category === 'general' ? 'bg-slate-100 text-slate-700' :
                            comment.category === 'transaction' ? 'bg-blue-100 text-blue-700' :
                            comment.category === 'receipt' ? 'bg-orange-100 text-orange-700' :
                            comment.category === 'tax' ? 'bg-green-100 text-green-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {comment.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Receipt Requests Tab */}
          {activeTab === 'requests' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900">Receipt Requests</h3>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Receipts
                </button>
              </div>

              {/* Requests List */}
              <div className="space-y-4">
                {receiptRequests.map((request) => (
                  <div key={request.id} className="border-2 border-slate-200 rounded-xl p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-slate-900">{request.description}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            request.status === 'provided' ? 'bg-green-100 text-green-700' :
                            request.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {request.status}
                          </span>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-slate-500">Property:</span>
                            <span className="font-medium text-slate-900">{request.property}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Amount:</span>
                            <span className="font-medium text-slate-900">{request.amount}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Requested:</span>
                            <span className="font-medium text-slate-900">{request.requestedAt}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {request.status === 'pending' && (
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1">
                            <Upload className="w-4 h-4" />
                            Provide
                          </button>
                        )}
                        <button className="p-2 border-2 border-slate-200 hover:border-slate-300 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reconciliation Tab */}
          {activeTab === 'reconciliation' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900">Reconciliation Approvals</h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export ZIP Pack
                </button>
              </div>

              {/* Reconciliation Items */}
              <div className="space-y-4">
                {reconciliationItems.map((item) => (
                  <div key={item.id} className="border-2 border-slate-200 rounded-xl p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-slate-900">{item.item}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            item.status === 'approved' ? 'bg-green-100 text-green-700' :
                            item.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="grid md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-slate-500">Property:</span>
                            <span className="font-medium text-slate-900">{item.property}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Category:</span>
                            <span className="font-medium text-slate-900">{item.category}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Landlord:</span>
                            <span className="font-medium text-slate-900">{item.landlordAmount}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Accountant:</span>
                            <span className="font-medium text-slate-900">{item.accountantAmount}</span>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <AlertCircle className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-600">Variance: {item.variance}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-600">Updated: {item.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.status === 'pending' && (
                          <>
                            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors">
                              Approve
                            </button>
                            <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors">
                              Dispute
                            </button>
                          </>
                        )}
                        <button className="p-2 border-2 border-slate-200 hover:border-slate-300 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">2</h3>
                <p className="text-sm text-slate-600">Active Accountants</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">8</h3>
                <p className="text-sm text-slate-600">Pending Comments</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">3</h3>
                <p className="text-sm text-slate-600">Receipt Requests</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">5</h3>
                <p className="text-sm text-slate-600">Reconciliations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
