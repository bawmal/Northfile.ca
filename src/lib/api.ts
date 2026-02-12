// Production API client with proper error handling and authentication
import { ApiResponse, PaginatedResponse, SearchFilters, SortOptions } from './data';

export class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || '/api') {
    this.baseUrl = baseUrl;
  }

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Properties
  async getProperties(filters?: SearchFilters, sort?: SortOptions) {
    const params = new URLSearchParams();
    if (filters?.query) params.append('search', filters.query);
    if (filters?.propertyId) params.append('propertyId', filters.propertyId);
    if (sort?.field) params.append('sort', sort.field);
    if (sort?.direction) params.append('order', sort.direction);

    return this.request<PaginatedResponse<any>>(`/properties?${params}`);
  }

  async getProperty(id: string) {
    return this.request<any>(`/properties/${id}`);
  }

  async createProperty(data: any) {
    return this.request<any>('/properties', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProperty(id: string, data: any) {
    return this.request<any>(`/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProperty(id: string) {
    return this.request<any>(`/properties/${id}`, {
      method: 'DELETE',
    });
  }

  // Transactions
  async getTransactions(filters?: SearchFilters, sort?: SortOptions) {
    const params = new URLSearchParams();
    if (filters?.query) params.append('search', filters.query);
    if (filters?.propertyId) params.append('propertyId', filters.propertyId);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom);
    if (filters?.dateTo) params.append('dateTo', filters.dateTo);
    if (sort?.field) params.append('sort', sort.field);
    if (sort?.direction) params.append('order', sort.direction);

    return this.request<PaginatedResponse<any>>(`/transactions?${params}`);
  }

  async getTransaction(id: string) {
    return this.request<any>(`/transactions/${id}`);
  }

  async createTransaction(data: any) {
    return this.request<any>('/transactions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTransaction(id: string, data: any) {
    return this.request<any>(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTransaction(id: string) {
    return this.request<any>(`/transactions/${id}`, {
      method: 'DELETE',
    });
  }

  async importTransactions(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.request<any>('/transactions/import', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  // Receipts
  async getReceipts(filters?: SearchFilters) {
    const params = new URLSearchParams();
    if (filters?.query) params.append('search', filters.query);
    if (filters?.propertyId) params.append('propertyId', filters.propertyId);

    return this.request<PaginatedResponse<any>>(`/receipts?${params}`);
  }

  async getReceipt(id: string) {
    return this.request<any>(`/receipts/${id}`);
  }

  async uploadReceipt(file: File, metadata?: any) {
    const formData = new FormData();
    formData.append('file', file);
    if (metadata) {
      formData.append('metadata', JSON.stringify(metadata));
    }

    return this.request<any>('/receipts', {
      method: 'POST',
      body: formData,
      headers: {},
    });
  }

  async deleteReceipt(id: string) {
    return this.request<any>(`/receipts/${id}`, {
      method: 'DELETE',
    });
  }

  async matchReceipt(receiptId: string, transactionId: string) {
    return this.request<any>(`/receipts/${receiptId}/match`, {
      method: 'POST',
      body: JSON.stringify({ transactionId }),
    });
  }

  // Mortgages
  async getMortgages() {
    return this.request<any[]>('/mortgages');
  }

  async getMortgage(id: string) {
    return this.request<any>(`/mortgages/${id}`);
  }

  async createMortgage(data: any) {
    return this.request<any>('/mortgages', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateMortgage(id: string, data: any) {
    return this.request<any>(`/mortgages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async uploadMortgageStatement(mortgageId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.request<any>(`/mortgages/${mortgageId}/statements`, {
      method: 'POST',
      body: formData,
      headers: {},
    });
  }

  async reconcileMortgage(mortgageId: string, year: number) {
    return this.request<any>(`/mortgages/${mortgageId}/reconcile/${year}`, {
      method: 'POST',
    });
  }

  // Reports
  async generateT776(options: any) {
    return this.request<any>('/reports/t776', {
      method: 'POST',
      body: JSON.stringify(options),
    });
  }

  async downloadReport(reportId: string, format: 'pdf' | 'csv') {
    const response = await fetch(`${this.baseUrl}/reports/${reportId}/download?format=${format}`, {
      headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
    });

    if (!response.ok) {
      throw new Error('Failed to download report');
    }

    return response.blob();
  }

  // Notices
  async getNotices(filters?: SearchFilters) {
    const params = new URLSearchParams();
    if (filters?.propertyId) params.append('propertyId', filters.propertyId);
    if (filters?.type) params.append('type', filters.type);
    if (filters?.status) params.append('status', filters.status);

    return this.request<PaginatedResponse<any>>(`/notices?${params}`);
  }

  async createNotice(data: any) {
    return this.request<any>('/notices', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async generateNotice(noticeId: string) {
    return this.request<any>(`/notices/${noticeId}/generate`, {
      method: 'POST',
    });
  }

  async serveNotice(noticeId: string, method: 'personal' | 'mail' | 'email') {
    return this.request<any>(`/notices/${noticeId}/serve`, {
      method: 'POST',
      body: JSON.stringify({ method }),
    });
  }

  // Collaboration
  async getAccountants() {
    return this.request<any[]>('/collaboration/accountants');
  }

  async inviteAccountant(data: any) {
    return this.request<any>('/collaboration/accountants/invite', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getComments(filters?: SearchFilters) {
    const params = new URLSearchParams();
    if (filters?.propertyId) params.append('propertyId', filters.propertyId);
    if (filters?.category) params.append('category', filters.category);

    return this.request<PaginatedResponse<any>>(`/collaboration/comments?${params}`);
  }

  async createComment(data: any) {
    return this.request<any>('/collaboration/comments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getReceiptRequests() {
    return this.request<any[]>('/collaboration/receipt-requests');
  }

  async createReceiptRequest(data: any) {
    return this.request<any>('/collaboration/receipt-requests', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getReconciliationItems() {
    return this.request<any[]>('/collaboration/reconciliation');
  }

  async approveReconciliation(itemId: string) {
    return this.request<any>(`/collaboration/reconciliation/${itemId}/approve`, {
      method: 'POST',
    });
  }

  async disputeReconciliation(itemId: string, reason: string) {
    return this.request<any>(`/collaboration/reconciliation/${itemId}/dispute`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  async exportData(options: any) {
    return this.request<any>('/collaboration/export', {
      method: 'POST',
      body: JSON.stringify(options),
    });
  }

  // Authentication
  async login(email: string, password: string) {
    return this.request<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(data: any) {
    return this.request<any>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout() {
    return this.request<any>('/auth/logout', {
      method: 'POST',
    });
  }

  async refreshToken() {
    return this.request<any>('/auth/refresh', {
      method: 'POST',
    });
  }

  async resetPassword(email: string) {
    return this.request<any>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async updatePassword(data: any) {
    return this.request<any>('/auth/update-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // User management
  async getCurrentUser() {
    return this.request<any>('/user/me');
  }

  async updateProfile(data: any) {
    return this.request<any>('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async changePassword(data: any) {
    return this.request<any>('/user/password', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Bank integration
  async connectBank(data: any) {
    return this.request<any>('/bank/connect', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getBankAccounts() {
    return this.request<any[]>('/bank/accounts');
  }

  async syncBankAccount(accountId: string) {
    return this.request<any>(`/bank/accounts/${accountId}/sync`, {
      method: 'POST',
    });
  }

  // Notifications
  async getNotifications() {
    return this.request<any[]>('/notifications');
  }

  async markNotificationRead(id: string) {
    return this.request<any>(`/notifications/${id}/read`, {
      method: 'POST',
    });
  }

  // Dashboard
  async getDashboardData() {
    return this.request<any>('/dashboard');
  }

  async getMetrics(propertyId?: string) {
    const params = propertyId ? `?propertyId=${propertyId}` : '';
    return this.request<any>(`/dashboard/metrics${params}`);
  }
}

// Create singleton instance
export const api = new ApiClient();

// Hook for using API in components
export function useApi() {
  return api;
}
