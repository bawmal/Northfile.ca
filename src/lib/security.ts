// Security utilities and middleware
import crypto from 'crypto';

// CSRF protection
export class CSRFProtection {
  private static tokens = new Map<string, { token: string; expires: number }>();
  
  static generateToken(sessionId: string): string {
    const token = crypto.randomBytes(32).toString('hex');
    const expires = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
    
    this.tokens.set(sessionId, { token, expires });
    return token;
  }
  
  static validateToken(sessionId: string, token: string): boolean {
    const stored = this.tokens.get(sessionId);
    if (!stored) return false;
    
    if (Date.now() > stored.expires) {
      this.tokens.delete(sessionId);
      return false;
    }
    
    return stored.token === token;
  }
  
  static cleanup(): void {
    const now = Date.now();
    for (const [sessionId, data] of this.tokens.entries()) {
      if (now > data.expires) {
        this.tokens.delete(sessionId);
      }
    }
  }
}

// Rate limiting
export class RateLimiter {
  private static requests = new Map<string, { count: number; resetTime: number }>();
  
  static isAllowed(
    identifier: string, 
    maxRequests: number = 100, 
    windowMs: number = 15 * 60 * 1000 // 15 minutes
  ): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const existing = this.requests.get(identifier);
    
    if (!existing || now > existing.resetTime) {
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + windowMs
      });
      return { allowed: true, remaining: maxRequests - 1, resetTime: now + windowMs };
    }
    
    if (existing.count >= maxRequests) {
      return { 
        allowed: false, 
        remaining: 0, 
        resetTime: existing.resetTime 
      };
    }
    
    existing.count++;
    return { 
      allowed: true, 
      remaining: maxRequests - existing.count, 
      resetTime: existing.resetTime 
    };
  }
  
  static cleanup(): void {
    const now = Date.now();
    for (const [identifier, data] of this.requests.entries()) {
      if (now > data.resetTime) {
        this.requests.delete(identifier);
      }
    }
  }
}

// Input sanitization
export class InputSanitizer {
  static sanitizeString(input: string): string {
    if (typeof input !== 'string') return '';
    
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, ''); // Remove event handlers
  }
  
  static sanitizeEmail(email: string): string {
    const sanitized = this.sanitizeString(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(sanitized) ? sanitized.toLowerCase() : '';
  }
  
  static sanitizePhoneNumber(phone: string): string {
    return phone.replace(/[^\d+\-\s\(\)]/g, '');
  }
  
  static sanitizePostalCode(postalCode: string): string {
    return postalCode.toUpperCase().replace(/[^A-Z0-9\s]/g, '');
  }
  
  static sanitizeNumeric(input: string): number {
    const numeric = input.replace(/[^\d.-]/g, '');
    const parsed = parseFloat(numeric);
    return isNaN(parsed) ? 0 : parsed;
  }
}

// Password security
export class PasswordSecurity {
  static generateSalt(): string {
    return crypto.randomBytes(16).toString('hex');
  }
  
  static hashPassword(password: string, salt: string): string {
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  }
  
  static verifyPassword(password: string, salt: string, hash: string): boolean {
    const hashedPassword = this.hashPassword(password, salt);
    return crypto.timingSafeEqual(
      Buffer.from(hashedPassword, 'hex'),
      Buffer.from(hash, 'hex')
    );
  }
  
  static generateSecureToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }
  
  static validatePasswordStrength(password: string): {
    isValid: boolean;
    score: number;
    feedback: string[];
  } {
    const feedback: string[] = [];
    let score = 0;
    
    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('Password must be at least 8 characters long');
    }
    
    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include lowercase letters');
    }
    
    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include uppercase letters');
    }
    
    if (/\d/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include numbers');
    }
    
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include special characters');
    }
    
    return {
      isValid: score >= 4,
      score,
      feedback
    };
  }
}

// Session security
export class SessionSecurity {
  private static sessions = new Map<string, { 
    userId: string; 
    createdAt: number; 
    lastActivity: number; 
    ipAddress?: string;
    userAgent?: string;
  }>();
  
  static createSession(
    userId: string, 
    ipAddress?: string, 
    userAgent?: string
  ): string {
    const sessionId = crypto.randomBytes(32).toString('hex');
    const now = Date.now();
    
    this.sessions.set(sessionId, {
      userId,
      createdAt: now,
      lastActivity: now,
      ipAddress,
      userAgent
    });
    
    return sessionId;
  }
  
  static validateSession(
    sessionId: string, 
    ipAddress?: string, 
    userAgent?: string
  ): { valid: boolean; userId?: string } {
    const session = this.sessions.get(sessionId);
    if (!session) return { valid: false };
    
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    if (now - session.lastActivity > maxAge) {
      this.sessions.delete(sessionId);
      return { valid: false };
    }
    
    // Check for IP address changes (optional security measure)
    if (session.ipAddress && ipAddress && session.ipAddress !== ipAddress) {
      // Log potential session hijacking attempt
      console.warn('IP address changed for session', { sessionId, oldIP: session.ipAddress, newIP: ipAddress });
    }
    
    // Update last activity
    session.lastActivity = now;
    
    return { valid: true, userId: session.userId };
  }
  
  static destroySession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }
  
  static cleanup(): void {
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    for (const [sessionId, session] of this.sessions.entries()) {
      if (now - session.lastActivity > maxAge) {
        this.sessions.delete(sessionId);
      }
    }
  }
}

// XSS protection
export class XSSProtection {
  static escapeHtml(unsafe: string): string {
    if (typeof unsafe !== 'string') return '';
    
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .replace(/\//g, '&#x2F;');
  }
  
  static sanitizeHtml(html: string): string {
    // Basic HTML sanitization - in production, use a library like DOMPurify
    const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'ul', 'ol', 'li'];
    const allowedAttributes = ['class', 'id'];
    
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/on\w+\s*=/gi, '');
  }
  
  static validateUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  }
}

// Security headers
export const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

// Cleanup intervals
if (typeof window === 'undefined') {
  // Server-side cleanup every 5 minutes
  setInterval(() => {
    CSRFProtection.cleanup();
    RateLimiter.cleanup();
    SessionSecurity.cleanup();
  }, 5 * 60 * 1000);
}

// Security middleware for API routes
export function securityMiddleware(handler: Function) {
  return async (req: any, res: any) => {
    // Apply security headers
    Object.entries(securityHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    
    // Rate limiting
    const clientId = req.ip || req.connection.remoteAddress;
    const rateLimit = RateLimiter.isAllowed(clientId);
    
    if (!rateLimit.allowed) {
      return res.status(429).json({
        error: 'Too many requests',
        resetTime: rateLimit.resetTime
      });
    }
    
    // CSRF protection for state-changing requests
    if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
      const csrfToken = req.headers['x-csrf-token'];
      const sessionId = req.session?.id;
      
      if (!csrfToken || !CSRFProtection.validateToken(sessionId, csrfToken)) {
        return res.status(403).json({ error: 'Invalid CSRF token' });
      }
    }
    
    return handler(req, res);
  };
}
