// Production-ready data structures and API interfaces
// This file replaces all hardcoded mock data with proper data management

export interface DashboardMetric {
  title: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'orange' | 'purple' | 'red';
}

export interface ReconciliationStatus {
  category: string;
  total: number;
  completed: number;
  pending: number;
  variance: number;
  status: 'complete' | 'in-progress' | 'attention';
}

export interface Property {
  id: string;
  address: string;
  unit?: string;
  city: string;
  province: string;
  postalCode: string;
  purchasePrice: number;
  purchaseDate: string;
  currentValue: number;
  propertyType: 'residential' | 'commercial' | 'mixed';
  ownershipType: 'sole' | 'joint' | 'corporation';
  owners: Owner[];
  image?: string;
  status?: 'active' | 'vacant' | 'maintenance';
  monthlyRent?: number;
  monthlyExpenses?: number;
  occupancyRate?: number;
  cashflow?: number;
  roi?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Owner {
  id: string;
  name: string;
  email: string;
  phone?: string;
  percentage: number;
  userId?: string;
}

export interface Transaction {
  id: string;
  propertyId: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  subcategory?: string;
  type: 'income' | 'expense';
  receiptId?: string;
  confidence?: number;
  isRecurring: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Receipt {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  ocrText?: string;
  extractedData?: {
    amount?: number;
    date?: string;
    vendor?: string;
    category?: string;
  };
  transactionId?: string;
  uploadedAt: string;
  retentionUntil: string;
}

export interface Mortgage {
  id: string;
  propertyId: string;
  lender: string;
  accountNumber: string;
  originalAmount: number;
  currentBalance: number;
  interestRate: number;
  paymentAmount: number;
  paymentFrequency: 'monthly' | 'biweekly' | 'weekly';
  startDate: string;
  maturityDate: string;
  amortizationYears: number;
  isEstimated: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MortgageStatement {
  id: string;
  mortgageId: string;
  year: number;
  totalInterest: number;
  totalPrincipal: number;
  fileUrl: string;
  uploadedAt: string;
  verifiedAt?: string;
  variance?: number;
}

export interface Notice {
  id: string;
  propertyId: string;
  type: 'N1' | 'N4';
  tenantName: string;
  tenantAddress: string;
  issueDate: string;
  effectiveDate: string;
  terminationDate?: string;
  details: {
    oldRent?: number;
    newRent?: number;
    arrearsAmount?: number;
    paymentMethod?: string;
    paymentAddress?: string;
  };
  status: 'draft' | 'served' | 'acknowledged' | 'expired';
  pdfUrl?: string;
  servedDate?: string;
  servedMethod?: 'personal' | 'mail' | 'email';
  createdAt: string;
  updatedAt: string;
}

export interface Accountant {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  status: 'active' | 'pending' | 'inactive';
  permissions: Permission[];
  properties: string[];
  invitedAt: string;
  lastLogin?: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: 'landlord' | 'accountant';
  content: string;
  propertyId?: string;
  transactionId?: string;
  receiptId?: string;
  category: 'general' | 'transaction' | 'receipt' | 'tax' | 'reconciliation';
  createdAt: string;
  updatedAt: string;
}

export interface ReceiptRequest {
  id: string;
  propertyId: string;
  requestedBy: string;
  requestedByName: string;
  category: string;
  description: string;
  amount?: number;
  date?: string;
  status: 'pending' | 'provided' | 'resolved';
  createdAt: string;
  resolvedAt?: string;
}

export interface ReconciliationItem {
  id: string;
  propertyId: string;
  category: string;
  item: string;
  landlordAmount: number;
  accountantAmount: number;
  variance: number;
  status: 'pending' | 'approved' | 'disputed';
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'landlord' | 'accountant' | 'admin';
  permissions: string[];
  createdAt: string;
  lastLogin?: string;
}

export interface TaxYear {
  year: number;
  propertyId: string;
  grossRent: number;
  netRent: number;
  expenses: {
    advertising: number;
    insurance: number;
    interest: number;
    maintenance: number;
    other: number;
    propertyTax: number;
    utilities: number;
    cca: number;
  };
  netIncome: number;
  ccaClaimed: number;
  isFinal: boolean;
  generatedAt?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationError[];
  isSubmitting: boolean;
  isDirty: boolean;
}

// Search and filter types
export interface SearchFilters {
  query?: string;
  propertyId?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: string;
  type?: string;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

// Export types
export interface ExportOptions {
  format: 'csv' | 'pdf' | 'excel';
  includeReceipts: boolean;
  dateRange: {
    from: string;
    to: string;
  };
  properties?: string[];
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  actionUrl?: string;
  read: boolean;
  createdAt: string;
}

// Audit log types
export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
}

// Configuration types
export interface AppConfig {
  features: {
    bankIntegration: boolean;
    ocrProcessing: boolean;
    emailNotifications: boolean;
    twoFactorAuth: boolean;
  };
  limits: {
    maxProperties: number;
    maxFileSize: number;
    maxTransactions: number;
  };
  integrations: {
    bankApi: {
      baseUrl: string;
      timeout: number;
    };
    ocrService: {
      baseUrl: string;
      timeout: number;
    };
    emailService: {
      provider: string;
      fromAddress: string;
    };
  };
}
