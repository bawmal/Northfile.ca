// Form validation schemas and utilities
import { z } from 'zod';
import { useState, useCallback } from 'react';

// Property validation
export const propertySchema = z.object({
  address: z.string().min(1, 'Address is required'),
  unit: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  province: z.string().min(2, 'Province is required'),
  postalCode: z.string().regex(/^[A-Z]\d[A-Z] \d[A-Z]\d$/, 'Invalid postal code format'),
  purchasePrice: z.number().min(0, 'Purchase price must be positive'),
  purchaseDate: z.string().min(1, 'Purchase date is required'),
  currentValue: z.number().min(0, 'Current value must be positive'),
  propertyType: z.enum(['residential', 'commercial', 'mixed']),
  ownershipType: z.enum(['sole', 'joint', 'corporation']),
  owners: z.array(z.object({
    name: z.string().min(1, 'Owner name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    percentage: z.number().min(0, 'Percentage must be positive').max(100, 'Percentage cannot exceed 100')
  })).min(1, 'At least one owner is required'),
}).refine((data) => {
  const totalPercentage = data.owners.reduce((sum, owner) => sum + owner.percentage, 0);
  return Math.abs(totalPercentage - 100) < 0.01;
}, {
  message: 'Ownership percentages must sum to 100%',
  path: ['owners']
});

// Transaction validation
export const transactionSchema = z.object({
  propertyId: z.string().min(1, 'Property is required'),
  date: z.string().min(1, 'Date is required'),
  description: z.string().min(1, 'Description is required'),
  amount: z.number().min(0, 'Amount must be positive'),
  category: z.string().min(1, 'Category is required'),
  subcategory: z.string().optional(),
  type: z.enum(['income', 'expense']),
  receiptId: z.string().optional(),
  isRecurring: z.boolean().default(false),
  notes: z.string().optional(),
});

// Mortgage validation
export const mortgageSchema = z.object({
  propertyId: z.string().min(1, 'Property is required'),
  lender: z.string().min(1, 'Lender is required'),
  accountNumber: z.string().min(1, 'Account number is required'),
  originalAmount: z.number().min(0, 'Original amount must be positive'),
  currentBalance: z.number().min(0, 'Current balance must be positive'),
  interestRate: z.number().min(0, 'Interest rate must be positive').max(100, 'Interest rate seems too high'),
  paymentAmount: z.number().min(0, 'Payment amount must be positive'),
  paymentFrequency: z.enum(['monthly', 'biweekly', 'weekly']),
  startDate: z.string().min(1, 'Start date is required'),
  maturityDate: z.string().min(1, 'Maturity date is required'),
  amortizationYears: z.number().min(1, 'Amortization must be at least 1 year').max(30, 'Amortization cannot exceed 30 years'),
  isEstimated: z.boolean().default(false),
});

// Notice validation
export const noticeSchema = z.object({
  propertyId: z.string().min(1, 'Property is required'),
  type: z.enum(['N1', 'N4']),
  tenantName: z.string().min(1, 'Tenant name is required'),
  tenantAddress: z.string().min(1, 'Tenant address is required'),
  issueDate: z.string().min(1, 'Issue date is required'),
  effectiveDate: z.string().min(1, 'Effective date is required'),
  terminationDate: z.string().optional(),
  details: z.object({
    oldRent: z.number().optional(),
    newRent: z.number().optional(),
    arrearsAmount: z.number().optional(),
    paymentMethod: z.string().optional(),
    paymentAddress: z.string().optional(),
  }),
  status: z.enum(['draft', 'served', 'acknowledged', 'expired']).default('draft'),
}).refine((data) => {
  if (data.type === 'N1') {
    return data.details.oldRent && data.details.newRent;
  }
  return true;
}, {
  message: 'Rent increase notices require old and new rent amounts',
  path: ['details']
}).refine((data) => {
  if (data.type === 'N4') {
    return data.details.arrearsAmount && data.details.paymentMethod && data.details.paymentAddress;
  }
  return true;
}, {
  message: 'Non-payment notices require arrears amount and payment instructions',
  path: ['details']
});

// User registration validation
export const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

// Login validation
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Accountant invitation validation
export const accountantInvitationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  properties: z.array(z.string()).min(1, 'At least one property must be selected'),
  permissions: z.array(z.string()).min(1, 'At least one permission must be granted'),
});

// Comment validation
export const commentSchema = z.object({
  content: z.string().min(1, 'Comment cannot be empty').max(1000, 'Comment is too long'),
  propertyId: z.string().optional(),
  transactionId: z.string().optional(),
  receiptId: z.string().optional(),
  category: z.enum(['general', 'transaction', 'receipt', 'tax', 'reconciliation']),
});

// Receipt request validation
export const receiptRequestSchema = z.object({
  propertyId: z.string().min(1, 'Property is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  amount: z.number().min(0, 'Amount must be positive').optional(),
  date: z.string().min(1, 'Date is required').optional(),
});

// Type exports
export type PropertyFormData = z.infer<typeof propertySchema>;
export type TransactionFormData = z.infer<typeof transactionSchema>;
export type MortgageFormData = z.infer<typeof mortgageSchema>;
export type NoticeFormData = z.infer<typeof noticeSchema>;
export type RegistrationFormData = z.infer<typeof registrationSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type AccountantInvitationFormData = z.infer<typeof accountantInvitationSchema>;
export type CommentFormData = z.infer<typeof commentSchema>;
export type ReceiptRequestFormData = z.infer<typeof receiptRequestSchema>;

// Validation utilities
export function validateFormData<T>(schema: z.ZodSchema<T>, data: unknown): {
  success: boolean;
  data?: T;
  errors: Record<string, string>;
} {
  const result = schema.safeParse(data);
  
  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      const path = issue.path.join('.');
      errors[path] = issue.message;
    });
    return { success: false, errors };
  }
  
  return { success: true, data: result.data, errors: {} };
}

// Real-time validation hook
export function useFieldValidation<T>(schema: z.ZodObject<any>) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateField = useCallback((field: string, value: any) => {
    const fieldSchema = schema.shape[field];
    if (!fieldSchema) return;
    
    const result = fieldSchema.safeParse(value);
    if (!result.success) {
      setErrors(prev => ({
        ...prev,
        [field]: result.error.issues[0]?.message
      }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [schema]);
  
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);
  
  return { errors, validateField, clearErrors };
}
