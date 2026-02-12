'use client';

import { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  Key, 
  Users, 
  Eye, 
  EyeOff, 
  Download, 
  Upload, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  FileText, 
  Database, 
  Server, 
  Activity,
  Settings,
  Save,
  RefreshCw,
  UserCheck,
  Archive,
  Trash2
} from 'lucide-react';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'landlord' | 'accountant' | 'admin';
  lastLogin: string;
  status: 'active' | 'inactive' | 'suspended';
  twoFactorEnabled: boolean;
}

interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'failed' | 'warning';
}

interface BackupRecord {
  id: string;
  timestamp: string;
  type: 'automatic' | 'manual';
  size: string;
  status: 'completed' | 'in-progress' | 'failed';
  location: string;
}

interface RetentionPolicy {
  documentType: string;
  retentionYears: number;
  autoDelete: boolean;
  lastReviewed: string;
}

export default function SecurityPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState<User[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [backups, setBackups] = useState<BackupRecord[]>([]);
  const [retentionPolicies, setRetentionPolicies] = useState<RetentionPolicy[]>([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);

  useEffect(() => {
    // Load mock data
    setUsers([
      {
        id: 'user_1',
        name: 'John Doe',
        email: 'john.doe@northfile.ca',
        role: 'landlord',
        lastLogin: '2025-01-15T14:30:00Z',
        status: 'active',
        twoFactorEnabled: true
      },
      {
        id: 'user_2',
        name: 'Jane Smith',
        email: 'jane.smith@northfile.ca',
        role: 'accountant',
        lastLogin: '2025-01-14T09:15:00Z',
        status: 'active',
        twoFactorEnabled: false
      },
      {
        id: 'user_3',
        name: 'Mike Johnson',
        email: 'mike.johnson@northfile.ca',
        role: 'landlord',
        lastLogin: '2025-01-10T16:45:00Z',
        status: 'inactive',
        twoFactorEnabled: true
      }
    ]);

    setAuditLogs([
      {
        id: 'log_1',
        userId: 'user_1',
        userName: 'John Doe',
        action: 'LOGIN_SUCCESS',
        resource: 'Authentication',
        timestamp: '2025-01-15T14:30:00Z',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        status: 'success'
      },
      {
        id: 'log_2',
        userId: 'user_1',
        userName: 'John Doe',
        action: 'DOCUMENT_VIEWED',
        resource: 'T776 Form - 123 Main Street',
        timestamp: '2025-01-15T15:45:00Z',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        status: 'success'
      },
      {
        id: 'log_3',
        userId: 'user_2',
        userName: 'Jane Smith',
        action: 'LOGIN_FAILED',
        resource: 'Authentication',
        timestamp: '2025-01-14T09:12:00Z',
        ipAddress: '203.45.67.89',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        status: 'failed'
      },
      {
        id: 'log_4',
        userId: 'user_1',
        userName: 'John Doe',
        action: 'DATA_EXPORT',
        resource: 'Financial Reports - Q4 2024',
        timestamp: '2025-01-15T16:20:00Z',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        status: 'success'
      }
    ]);

    setBackups([
      {
        id: 'backup_1',
        timestamp: '2025-01-15T02:00:00Z',
        type: 'automatic',
        size: '245.8 MB',
        status: 'completed',
        location: 'us-east-1/backup/northfile-2025-01-15'
      },
      {
        id: 'backup_2',
        timestamp: '2025-01-14T02:00:00Z',
        type: 'automatic',
        size: '244.2 MB',
        status: 'completed',
        location: 'us-east-1/backup/northfile-2025-01-14'
      },
      {
        id: 'backup_3',
        timestamp: '2025-01-13T02:00:00Z',
        type: 'automatic',
        size: '243.7 MB',
        status: 'completed',
        location: 'us-east-1/backup/northfile-2025-01-13'
      }
    ]);

    setRetentionPolicies([
      {
        documentType: 'Receipts',
        retentionYears: 7,
        autoDelete: true,
        lastReviewed: '2024-01-15'
      },
      {
        documentType: 'T776 Forms',
        retentionYears: 7,
        autoDelete: true,
        lastReviewed: '2024-01-15'
      },
      {
        documentType: 'Mortgage Statements',
        retentionYears: 7,
        autoDelete: true,
        lastReviewed: '2024-01-15'
      },
      {
        documentType: 'Transaction Records',
        retentionYears: 7,
        autoDelete: true,
        lastReviewed: '2024-01-15'
      }
    ]);
  }, []);

  const handleCreateBackup = async () => {
    setIsCreatingBackup(true);
    // Simulate backup creation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newBackup: BackupRecord = {
      id: `backup_${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: 'manual',
      size: '246.5 MB',
      status: 'completed',
      location: 'us-east-1/backup/northfile-manual-' + Date.now()
    };
    
    setBackups(prev => [newBackup, ...prev]);
    setIsCreatingBackup(false);
    setShowBackupModal(false);
  };

  const formatFileSize = (size: string) => size;
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'success':
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'inactive':
      case 'warning':
      case 'in-progress':
        return 'text-yellow-600 bg-yellow-100';
      case 'suspended':
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-slate-600 bg-slate-100';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'text-purple-600 bg-purple-100';
      case 'accountant':
        return 'text-blue-600 bg-blue-100';
      case 'landlord':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-slate-600 bg-slate-100';
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
              <Link href="/receipts" className="text-slate-600 hover:text-slate-900 transition-colors">Receipts</Link>
              <Link href="/mortgages" className="text-slate-600 hover:text-slate-900 transition-colors">Mortgages</Link>
              <Link href="/reports" className="text-slate-600 hover:text-slate-900 transition-colors">Reports</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Security & Compliance</h1>
            <p className="text-slate-500 text-lg">Manage access, audit logs, and data retention policies</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-slate-200 mb-8">
          <div className="flex border-b border-slate-200">
            {[
              { id: 'overview', label: 'Overview', icon: Shield },
              { id: 'users', label: 'User Access', icon: Users },
              { id: 'audit', label: 'Audit Logs', icon: Activity },
              { id: 'backups', label: 'Backups', icon: Database },
              { id: 'retention', label: 'Retention Policies', icon: Archive }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Security Overview */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-green-700">Security Score</p>
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-green-800 mb-1">95/100</p>
                <p className="text-sm text-green-600">Excellent security posture</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-blue-700">Active Users</p>
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-blue-800 mb-1">{users.filter(u => u.status === 'active').length}</p>
                <p className="text-sm text-blue-600">of {users.length} total users</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-purple-700">2FA Enabled</p>
                  <Key className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-3xl font-bold text-purple-800 mb-1">{users.filter(u => u.twoFactorEnabled).length}</p>
                <p className="text-sm text-purple-600">users protected</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Change Password</p>
                    <p className="text-sm text-slate-600">Update account password</p>
                  </div>
                </button>
                <button
                  onClick={() => setShowTwoFactorModal(true)}
                  className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Key className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">2FA Settings</p>
                    <p className="text-sm text-slate-600">Configure two-factor auth</p>
                  </div>
                </button>
                <button
                  onClick={() => setShowBackupModal(true)}
                  className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Create Backup</p>
                    <p className="text-sm text-slate-600">Manual data backup</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Download className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Export Data</p>
                    <p className="text-sm text-slate-600">Download all records</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">User Management</h3>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Add User
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-medium text-slate-700">User</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-slate-700">Role</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-slate-700">Status</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-slate-700">2FA</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-slate-700">Last Login</th>
                    <th className="text-right px-6 py-4 text-sm font-medium text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-slate-900">{user.name}</p>
                          <p className="text-sm text-slate-600">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {user.twoFactorEnabled ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-900">{formatDate(user.lastLogin)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Settings className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Audit Logs</h3>
              <div className="flex items-center gap-4">
                <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Actions</option>
                  <option>Login/Logout</option>
                  <option>Document Access</option>
                  <option>Data Export</option>
                  <option>Settings Changes</option>
                </select>
                <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-medium text-slate-700">Timestamp</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-slate-700">User</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-slate-700">Action</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-slate-700">Resource</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-slate-700">IP Address</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-slate-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-900">{formatDate(log.timestamp)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900">{log.userName}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-900">{log.action}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-900">{log.resource}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-900">{log.ipAddress}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(log.status)}`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'backups' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">Backup History</h3>
                <button
                  onClick={() => setShowBackupModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Database className="w-5 h-5" />
                  Create Backup
                </button>
              </div>
              
              <div className="space-y-4">
                {backups.map((backup) => (
                  <div key={backup.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          backup.type === 'automatic' ? 'bg-blue-100' : 'bg-green-100'
                        }`}>
                          {backup.type === 'automatic' ? (
                            <RefreshCw className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Upload className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">
                            {backup.type === 'automatic' ? 'Automatic Backup' : 'Manual Backup'}
                          </p>
                          <p className="text-sm text-slate-600">{formatDate(backup.timestamp)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-slate-900">{formatFileSize(backup.size)}</p>
                        <p className="text-sm text-slate-600">{backup.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Backup Settings */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Backup Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Automatic Backups</p>
                    <p className="text-sm text-slate-600">Daily automatic backups at 2:00 AM EST</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Retention Period</p>
                    <p className="text-sm text-slate-600">Keep backups for 30 days</p>
                  </div>
                  <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>7 days</option>
                    <option>30 days</option>
                    <option>90 days</option>
                    <option>1 year</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'retention' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Data Retention Policies</h3>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Update Policies
              </button>
            </div>
            
            <div className="space-y-4">
              {retentionPolicies.map((policy, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-900">{policy.documentType}</p>
                      <p className="text-sm text-slate-600">Last reviewed: {policy.lastReviewed}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-slate-900">{policy.retentionYears} years</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-600">Auto-delete:</span>
                        <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          policy.autoDelete ? 'bg-blue-600' : 'bg-slate-300'
                        }`}>
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            policy.autoDelete ? 'translate-x-6' : 'translate-x-1'
                          }`}></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Change Password</h3>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                >
                  <Trash2 className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2">
                  <Save className="w-5 h-5" />
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2FA Modal */}
      {showTwoFactorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Two-Factor Authentication</h3>
                <button
                  onClick={() => setShowTwoFactorModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                >
                  <Trash2 className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Key className="w-10 h-10 text-blue-600" />
                </div>
                <p className="font-medium text-slate-900 mb-2">Enable Two-Factor Authentication</p>
                <p className="text-sm text-slate-600">Add an extra layer of security to your account</p>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowTwoFactorModal(false)}
                  className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backup Modal */}
      {showBackupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Create Backup</h3>
                <button
                  onClick={() => setShowBackupModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                >
                  <Trash2 className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="w-10 h-10 text-green-600" />
                </div>
                <p className="font-medium text-slate-900 mb-2">Create Manual Backup</p>
                <p className="text-sm text-slate-600">This will create a complete backup of all your data</p>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowBackupModal(false)}
                  className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateBackup}
                  disabled={isCreatingBackup}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed font-medium flex items-center gap-2"
                >
                  {isCreatingBackup ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <Database className="w-5 h-5" />
                  )}
                  {isCreatingBackup ? 'Creating Backup...' : 'Create Backup'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
