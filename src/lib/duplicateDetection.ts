// Duplicate detection utility for bank statements and transactions
import { useState } from 'react';

export interface UploadedStatement {
  id: string;
  fileName: string;
  uploadDate: string;
  fileHash: string;
  transactionCount: number;
  dateRange: {
    from: string;
    to: string;
  };
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  propertyId: string;
  statementId?: string;
}

export class DuplicateDetection {
  private static uploadedStatements: UploadedStatement[] = [];
  private static transactionHashes = new Set<string>();

  // Generate a hash for a transaction to detect duplicates
  static generateTransactionHash(transaction: Transaction): string {
    const key = `${transaction.date}-${transaction.description}-${transaction.amount}-${transaction.type}`;
    return btoa(key).replace(/[^a-zA-Z0-9]/g, '');
  }

  // Generate a hash for a file to detect duplicate uploads
  static generateFileHash(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const hashArray = Array.from(new Uint8Array(arrayBuffer));
        const hash = hashArray.reduce((acc, val) => acc + val.toString(16).padStart(2, '0'), '');
        resolve(hash);
      };
      reader.readAsArrayBuffer(file.slice(0, 1024)); // Hash first 1KB for efficiency
    });
  }

  // Check if a statement has been uploaded before
  static isDuplicateStatement(fileName: string, fileHash: string): boolean {
    return this.uploadedStatements.some(statement => 
      statement.fileName === fileName || statement.fileHash === fileHash
    );
  }

  // Check if a transaction already exists
  static isDuplicateTransaction(transaction: Transaction): boolean {
    const hash = this.generateTransactionHash(transaction);
    return this.transactionHashes.has(hash);
  }

  // Add uploaded statement to tracking
  static addUploadedStatement(statement: UploadedStatement): void {
    this.uploadedStatements.push(statement);
    // Keep only last 100 statements
    if (this.uploadedStatements.length > 100) {
      this.uploadedStatements = this.uploadedStatements.slice(-100);
    }
  }

  // Add transaction hashes to tracking
  static addTransactionHashes(transactions: Transaction[]): void {
    transactions.forEach(transaction => {
      const hash = this.generateTransactionHash(transaction);
      this.transactionHashes.add(hash);
    });
  }

  // Filter out duplicate transactions from import
  static filterDuplicateTransactions(transactions: Transaction[]): {
    filtered: Transaction[];
    duplicates: Transaction[];
  } {
    const filtered: Transaction[] = [];
    const duplicates: Transaction[] = [];

    transactions.forEach(transaction => {
      if (this.isDuplicateTransaction(transaction)) {
        duplicates.push(transaction);
      } else {
        filtered.push(transaction);
        this.transactionHashes.add(this.generateTransactionHash(transaction));
      }
    });

    return { filtered, duplicates };
  }

  // Get list of uploaded statements for UI display
  static getUploadedStatements(): UploadedStatement[] {
    return this.uploadedStatements.sort((a, b) => 
      new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
    );
  }

  // Clear all transaction hashes
  static clearAllHashes(): void {
    this.transactionHashes.clear();
  }

  // Clear old statements (older than 1 year)
  static cleanupOldStatements(): void {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    this.uploadedStatements = this.uploadedStatements.filter(statement => 
      new Date(statement.uploadDate) > oneYearAgo
    );
  }

  // Check if statement date range overlaps with existing statements
  static hasDateRangeOverlap(newStatement: UploadedStatement): boolean {
    return this.uploadedStatements.some(existing => {
      const existingStart = new Date(existing.dateRange.from);
      const existingEnd = new Date(existing.dateRange.to);
      const newStart = new Date(newStatement.dateRange.from);
      const newEnd = new Date(newStatement.dateRange.to);
      
      return (
        (newStart >= existingStart && newStart <= existingEnd) ||
        (newEnd >= existingStart && newEnd <= existingEnd) ||
        (newStart <= existingStart && newEnd >= existingEnd)
      );
    });
  }

  // Get statistics for admin dashboard
  static getStatistics(): {
    totalStatements: number;
    totalTransactions: number;
    duplicateCount: number;
    lastUploadDate: string;
  } {
    const totalStatements = this.uploadedStatements.length;
    const totalTransactions = this.uploadedStatements.reduce((sum, stmt) => sum + stmt.transactionCount, 0);
    const lastUploadDate = this.uploadedStatements.length > 0 
      ? this.uploadedStatements[this.uploadedStatements.length - 1].uploadDate 
      : '';

    return {
      totalStatements,
      totalTransactions,
      duplicateCount: this.transactionHashes.size,
      lastUploadDate
    };
  }
}

// React hook for duplicate detection
export function useDuplicateDetection() {
  const [uploadedStatements, setUploadedStatements] = useState<UploadedStatement[]>([]);
  const [duplicatesFound, setDuplicatesFound] = useState(0);

  const checkForDuplicates = (transactions: Transaction[]) => {
    const result = DuplicateDetection.filterDuplicateTransactions(transactions);
    setDuplicatesFound(result.duplicates.length);
    return result.filtered;
  };

  const addUploadedStatement = (statement: UploadedStatement) => {
    DuplicateDetection.addUploadedStatement(statement);
    setUploadedStatements(DuplicateDetection.getUploadedStatements());
  };

  const clearDuplicates = () => {
    DuplicateDetection.clearAllHashes();
    setDuplicatesFound(0);
  };

  return {
    uploadedStatements,
    duplicatesFound,
    checkForDuplicates,
    addUploadedStatement,
    clearDuplicates,
    isDuplicateStatement: DuplicateDetection.isDuplicateStatement,
    hasDateRangeOverlap: DuplicateDetection.hasDateRangeOverlap,
    getStatistics: DuplicateDetection.getStatistics
  };
}
