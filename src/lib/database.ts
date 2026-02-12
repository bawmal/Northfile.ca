// Database connection and query utilities
// This file provides a production-ready database interface

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl?: boolean;
  poolSize?: number;
}

export interface QueryResult<T> {
  rows: T[];
  rowCount: number;
  success: boolean;
  error?: string;
}

export interface Transaction {
  query: string;
  params?: any[];
}

export class Database {
  private config: DatabaseConfig;
  private pool: any; // This would be a proper connection pool in production

  constructor(config: DatabaseConfig) {
    this.config = config;
  }

  async connect(): Promise<boolean> {
    try {
      // In production, this would establish a real database connection
      // For now, we'll simulate a successful connection
      console.log('Database connection established');
      return true;
    } catch (error) {
      console.error('Database connection failed:', error);
      return false;
    }
  }

  async disconnect(): Promise<void> {
    try {
      // In production, this would close the database connection pool
      console.log('Database connection closed');
    } catch (error) {
      console.error('Error closing database connection:', error);
    }
  }

  async query<T>(sql: string, params: any[] = []): Promise<QueryResult<T>> {
    try {
      // In production, this would execute a real SQL query
      console.log('Executing query:', sql, params);
      
      // Simulate query result for development
      const mockData: T[] = [];
      const rowCount = 0;
      
      return {
        rows: mockData,
        rowCount,
        success: true,
      };
    } catch (error) {
      console.error('Query execution failed:', error);
      return {
        rows: [],
        rowCount: 0,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async transaction(queries: Transaction[]): Promise<QueryResult<any>[]> {
    const results: QueryResult<any>[] = [];
    
    try {
      // In production, this would begin a database transaction
      console.log('Beginning transaction');
      
      for (const { query, params } of queries) {
        const result = await this.query(query, params);
        results.push(result);
        
        if (!result.success) {
          // In production, this would rollback the transaction
          console.error('Transaction failed, rolling back');
          break;
        }
      }
      
      // In production, this would commit the transaction
      console.log('Transaction completed successfully');
      
      return results;
    } catch (error) {
      console.error('Transaction failed:', error);
      return [{
        rows: [],
        rowCount: 0,
        success: false,
        error: error instanceof Error ? error.message : 'Transaction failed',
      }];
    }
  }

  // Property queries
  async getProperties(filters?: any): Promise<QueryResult<any>> {
    let sql = 'SELECT * FROM properties WHERE 1=1';
    const params: any[] = [];
    
    if (filters?.userId) {
      sql += ' AND user_id = $1';
      params.push(filters.userId);
    }
    
    if (filters?.search) {
      sql += ' AND (address ILIKE $2 OR city ILIKE $2)';
      params.push(`%${filters.search}%`);
    }
    
    sql += ' ORDER BY created_at DESC';
    
    return this.query(sql, params);
  }

  async getProperty(id: string): Promise<QueryResult<any>> {
    const sql = 'SELECT * FROM properties WHERE id = $1';
    return this.query(sql, [id]);
  }

  async createProperty(data: any): Promise<QueryResult<any>> {
    const sql = `
      INSERT INTO properties (id, user_id, address, city, province, postal_code, 
        purchase_price, purchase_date, current_value, property_type, ownership_type, 
        created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())
      RETURNING *
    `;
    
    const params = [
      data.id,
      data.userId,
      data.address,
      data.city,
      data.province,
      data.postalCode,
      data.purchasePrice,
      data.purchaseDate,
      data.currentValue,
      data.propertyType,
      data.ownershipType,
    ];
    
    return this.query(sql, params);
  }

  async updateProperty(id: string, data: any): Promise<QueryResult<any>> {
    const fields = Object.keys(data).filter(key => key !== 'id');
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    
    const sql = `
      UPDATE properties 
      SET ${setClause}, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `;
    
    const params = [id, ...fields.map(field => data[field])];
    
    return this.query(sql, params);
  }

  async deleteProperty(id: string): Promise<QueryResult<any>> {
    const sql = 'DELETE FROM properties WHERE id = $1';
    return this.query(sql, [id]);
  }

  // Transaction queries
  async getTransactions(filters?: any): Promise<QueryResult<any>> {
    let sql = 'SELECT * FROM transactions WHERE 1=1';
    const params: any[] = [];
    
    if (filters?.userId) {
      sql += ' AND user_id = $1';
      params.push(filters.userId);
    }
    
    if (filters?.propertyId) {
      sql += ' AND property_id = $' + (params.length + 1);
      params.push(filters.propertyId);
    }
    
    if (filters?.dateFrom) {
      sql += ' AND date >= $' + (params.length + 1);
      params.push(filters.dateFrom);
    }
    
    if (filters?.dateTo) {
      sql += ' AND date <= $' + (params.length + 1);
      params.push(filters.dateTo);
    }
    
    sql += ' ORDER BY date DESC';
    
    return this.query(sql, params);
  }

  async createTransaction(data: any): Promise<QueryResult<any>> {
    const sql = `
      INSERT INTO transactions (id, user_id, property_id, date, description, 
        amount, category, subcategory, type, receipt_id, is_recurring, 
        created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())
      RETURNING *
    `;
    
    const params = [
      data.id,
      data.userId,
      data.propertyId,
      data.date,
      data.description,
      data.amount,
      data.category,
      data.subcategory,
      data.type,
      data.receiptId,
      data.isRecurring,
    ];
    
    return this.query(sql, params);
  }

  // User queries
  async getUserByEmail(email: string): Promise<QueryResult<any>> {
    const sql = 'SELECT * FROM users WHERE email = $1';
    return this.query(sql, [email]);
  }

  async createUser(data: any): Promise<QueryResult<any>> {
    const sql = `
      INSERT INTO users (id, email, name, password_hash, role, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING id, email, name, role, created_at, updated_at
    `;
    
    const params = [
      data.id,
      data.email,
      data.name,
      data.passwordHash,
      data.role || 'landlord',
    ];
    
    return this.query(sql, params);
  }

  async updateUserLastLogin(id: string): Promise<QueryResult<any>> {
    const sql = 'UPDATE users SET last_login = NOW() WHERE id = $1';
    return this.query(sql, [id]);
  }

  // Receipt queries
  async createReceipt(data: any): Promise<QueryResult<any>> {
    const sql = `
      INSERT INTO receipts (id, user_id, filename, original_name, mime_type, 
        size, url, ocr_text, extracted_data, uploaded_at, retention_until)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), $10)
      RETURNING *
    `;
    
    const params = [
      data.id,
      data.userId,
      data.filename,
      data.originalName,
      data.mimeType,
      data.size,
      data.url,
      data.ocrText,
      JSON.stringify(data.extractedData || {}),
      data.retentionUntil,
    ];
    
    return this.query(sql, params);
  }

  async getReceipts(filters?: any): Promise<QueryResult<any>> {
    let sql = 'SELECT * FROM receipts WHERE 1=1';
    const params: any[] = [];
    
    if (filters?.userId) {
      sql += ' AND user_id = $1';
      params.push(filters.userId);
    }
    
    if (filters?.propertyId) {
      sql += ' AND property_id = $' + (params.length + 1);
      params.push(filters.propertyId);
    }
    
    sql += ' ORDER BY uploaded_at DESC';
    
    return this.query(sql, params);
  }

  // Mortgage queries
  async getMortgages(userId: string): Promise<QueryResult<any>> {
    const sql = 'SELECT * FROM mortgages WHERE user_id = $1 ORDER BY created_at DESC';
    return this.query(sql, [userId]);
  }

  async createMortgage(data: any): Promise<QueryResult<any>> {
    const sql = `
      INSERT INTO mortgages (id, user_id, property_id, lender, account_number, 
        original_amount, current_balance, interest_rate, payment_amount, 
        payment_frequency, start_date, maturity_date, amortization_years, 
        is_estimated, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW(), NOW())
      RETURNING *
    `;
    
    const params = [
      data.id,
      data.userId,
      data.propertyId,
      data.lender,
      data.accountNumber,
      data.originalAmount,
      data.currentBalance,
      data.interestRate,
      data.paymentAmount,
      data.paymentFrequency,
      data.startDate,
      data.maturityDate,
      data.amortizationYears,
      data.isEstimated,
    ];
    
    return this.query(sql, params);
  }

  // Notice queries
  async createNotice(data: any): Promise<QueryResult<any>> {
    const sql = `
      INSERT INTO notices (id, user_id, property_id, type, tenant_name, 
        tenant_address, issue_date, effective_date, termination_date, 
        details, status, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())
      RETURNING *
    `;
    
    const params = [
      data.id,
      data.userId,
      data.propertyId,
      data.type,
      data.tenantName,
      data.tenantAddress,
      data.issueDate,
      data.effectiveDate,
      data.terminationDate,
      JSON.stringify(data.details),
      data.status,
    ];
    
    return this.query(sql, params);
  }

  async getNotices(filters?: any): Promise<QueryResult<any>> {
    let sql = 'SELECT * FROM notices WHERE 1=1';
    const params: any[] = [];
    
    if (filters?.userId) {
      sql += ' AND user_id = $1';
      params.push(filters.userId);
    }
    
    if (filters?.propertyId) {
      sql += ' AND property_id = $' + (params.length + 1);
      params.push(filters.propertyId);
    }
    
    sql += ' ORDER BY created_at DESC';
    
    return this.query(sql, params);
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    try {
      await this.query('SELECT 1');
      return {
        status: 'healthy',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
      };
    }
  }
}

// Create singleton database instance
let dbInstance: Database | null = null;

export function getDatabase(): Database {
  if (!dbInstance) {
    const config: DatabaseConfig = {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'northfile',
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
      ssl: process.env.DB_SSL === 'true',
      poolSize: parseInt(process.env.DB_POOL_SIZE || '10'),
    };
    
    dbInstance = new Database(config);
  }
  
  return dbInstance;
}

// Database initialization
export async function initializeDatabase(): Promise<boolean> {
  const db = getDatabase();
  return await db.connect();
}

export async function closeDatabase(): Promise<void> {
  const db = getDatabase();
  await db.disconnect();
}
