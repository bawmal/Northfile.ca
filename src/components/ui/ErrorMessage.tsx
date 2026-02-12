// Error message component for consistent error display
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  error: string | null;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
  variant?: 'inline' | 'card' | 'toast';
}

export function ErrorMessage({ 
  error, 
  onRetry, 
  onDismiss, 
  className = '',
  variant = 'card'
}: ErrorMessageProps) {
  if (!error) return null;

  const baseClasses = 'flex items-start gap-3 p-4 rounded-lg';
  const variantClasses = {
    inline: 'bg-red-50 border border-red-200',
    card: 'bg-red-50 border-2 border-red-200',
    toast: 'bg-red-600 text-white'
  };

  const iconClasses = {
    inline: 'text-red-600',
    card: 'text-red-600',
    toast: 'text-white'
  };

  const textClasses = {
    inline: 'text-red-800',
    card: 'text-red-800',
    toast: 'text-white'
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconClasses[variant]}`} />
      <div className="flex-1">
        <p className={`text-sm font-medium ${textClasses[variant]}`}>
          {error}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className={`mt-2 flex items-center gap-2 text-sm font-medium ${
              variant === 'toast' 
                ? 'text-white hover:text-red-100' 
                : 'text-red-600 hover:text-red-700'
            } transition-colors`}
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        )}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className={`flex-shrink-0 ${
            variant === 'toast' 
              ? 'text-white hover:text-red-100' 
              : 'text-red-600 hover:text-red-700'
          } transition-colors`}
        >
          ×
        </button>
      )}
    </div>
  );
}

// Form field error component
export function FieldError({ error }: { error?: string }) {
  if (!error) return null;

  return (
    <div className="flex items-center gap-1 mt-1">
      <AlertCircle className="w-4 h-4 text-red-500" />
      <span className="text-sm text-red-600">{error}</span>
    </div>
  );
}

// Global error boundary fallback
export function ErrorFallback({ 
  error, 
  resetError 
}: { 
  error: Error; 
  resetError: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-xl border-2 border-red-200 p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-slate-600 mb-6">
            {error.message || 'An unexpected error occurred. Please try again.'}
          </p>
          <button
            onClick={resetError}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
