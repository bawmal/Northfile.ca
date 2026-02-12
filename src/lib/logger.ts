// Application logging utility
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  userId?: string;
  sessionId?: string;
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];
  private maxLogs = 1000;
  private isDevelopment = process.env.NODE_ENV === 'development';

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      userId: this.getCurrentUserId(),
      sessionId: this.getSessionId(),
    };

    this.logs.push(entry);
    
    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Console output for development
    if (this.isDevelopment) {
      const consoleMethod = level === 'error' ? 'error' : 
                          level === 'warn' ? 'warn' : 
                          level === 'info' ? 'info' : 'debug';
      
      console[consoleMethod](`[${level.toUpperCase()}] ${message}`, context || '');
    }

    // In production, send to external logging service
    if (!this.isDevelopment) {
      this.sendToExternalService(entry);
    }
  }

  debug(message: string, context?: Record<string, any>) {
    this.log('debug', message, context);
  }

  info(message: string, context?: Record<string, any>) {
    this.log('info', message, context);
  }

  warn(message: string, context?: Record<string, any>) {
    this.log('warn', message, context);
  }

  error(message: string, context?: Record<string, any>) {
    this.log('error', message, context);
  }

  // API request logging
  logApiRequest(method: string, url: string, statusCode?: number, duration?: number, error?: string) {
    const context = {
      method,
      url,
      statusCode,
      duration,
      error,
    };

    if (error) {
      this.error(`API Request Failed: ${method} ${url}`, context);
    } else {
      this.info(`API Request: ${method} ${url}`, context);
    }
  }

  // User action logging
  logUserAction(action: string, context?: Record<string, any>) {
    this.info(`User Action: ${action}`, context);
  }

  // Error logging with stack trace
  logError(error: Error, context?: Record<string, any>) {
    this.error(error.message, {
      ...context,
      stack: error.stack,
      name: error.name,
    });
  }

  // Performance logging
  logPerformance(operation: string, duration: number, context?: Record<string, any>) {
    this.info(`Performance: ${operation}`, {
      ...context,
      duration,
      performanceThreshold: duration > 1000 ? 'SLOW' : 'OK',
    });
  }

  // Get recent logs
  getLogs(level?: LogLevel, limit = 100): LogEntry[] {
    let filteredLogs = this.logs;
    
    if (level) {
      filteredLogs = this.logs.filter(log => log.level === level);
    }
    
    return filteredLogs.slice(-limit);
  }

  // Clear logs
  clearLogs() {
    this.logs = [];
  }

  // Export logs for debugging
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  private getCurrentUserId(): string | undefined {
    // In a real app, this would get the current user from auth context
    return typeof window !== 'undefined' ? 
           (window as any).__NORTHFILE_USER_ID : undefined;
  }

  private getSessionId(): string | undefined {
    // In a real app, this would get the session ID
    return typeof window !== 'undefined' ? 
           (window as any).__NORTHFILE_SESSION_ID : undefined;
  }

  private async sendToExternalService(entry: LogEntry) {
    try {
      // In production, send to logging service like Sentry, LogRocket, etc.
      // For now, we'll just log that we would send it
      console.log('Would send to external service:', entry);
      
      // Example implementation:
      // await fetch('/api/logs', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(entry)
      // });
    } catch (error) {
      console.error('Failed to send log to external service:', error);
    }
  }
}

// Export singleton instance
export const logger = Logger.getInstance();

// Convenience exports
export const log = {
  debug: (message: string, context?: Record<string, any>) => logger.debug(message, context),
  info: (message: string, context?: Record<string, any>) => logger.info(message, context),
  warn: (message: string, context?: Record<string, any>) => logger.warn(message, context),
  error: (message: string, context?: Record<string, any>) => logger.error(message, context),
  apiRequest: (method: string, url: string, statusCode?: number, duration?: number, error?: string) => 
    logger.logApiRequest(method, url, statusCode, duration, error),
  userAction: (action: string, context?: Record<string, any>) => logger.logUserAction(action, context),
  logError: (error: Error, context?: Record<string, any>) => logger.logError(error, context),
  performance: (operation: string, duration: number, context?: Record<string, any>) => 
    logger.logPerformance(operation, duration, context),
};

// React hook for logging
export function useLogger() {
  return {
    debug: log.debug,
    info: log.info,
    warn: log.warn,
    error: log.error,
    apiRequest: log.apiRequest,
    userAction: log.userAction,
    logError: log.logError,
    performance: log.performance,
  };
}
