import 'express';

declare global {
  namespace Express {
    interface Request {
      apiKeyTier?: 'FREE' | 'PRO';
      apiKeyId?: string
    }
  }
}