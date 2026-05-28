import crypto from 'crypto';

// In a real production app, this should be an environment variable.
const SECRET_KEY = 'SALTEDHASH_SUPER_SECRET_MVP_KEY';

export const generateSalt = (): string => {
  return crypto.randomBytes(16).toString('hex');
};

export const hashPassword = (password: string, salt: string): string => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
};

// Generates a simple HMAC token: <base64_payload>.<signature>
export const generateToken = (userId: string): string => {
  const payload = Buffer.from(JSON.stringify({ userId })).toString('base64');
  const signature = crypto.createHmac('sha256', SECRET_KEY).update(payload).digest('hex');
  return `${payload}.${signature}`;
};

// Parses and verifies the HMAC token
export const parseToken = (token: string): string | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const payload = parts[0];
    const signature = parts[1];

    const expectedSignature = crypto.createHmac('sha256', SECRET_KEY).update(payload).digest('hex');
    if (signature !== expectedSignature) return null;

    const decoded = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'));
    return decoded.userId;
  } catch (error) {
    return null;
  }
};
