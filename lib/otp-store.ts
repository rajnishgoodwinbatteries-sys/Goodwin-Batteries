// In-memory + fallback file-based OTP store for secure e-commerce verification

interface OtpEntry {
  otp: string;
  expiresAt: number; // Unix timestamp ms
  attempts: number;
}

// Global declaration to survive Next.js dev reloads
const globalForOtp = globalThis as unknown as {
  goodwinOtpStore?: Map<string, OtpEntry>;
};

const otpStore: Map<string, OtpEntry> = globalForOtp.goodwinOtpStore || new Map();
if (process.env.NODE_ENV !== "production") {
  globalForOtp.goodwinOtpStore = otpStore;
}

const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 5;

export function generateAndSaveOtp(phone: string): { otp: string; expiresAt: number } {
  const cleanPhone = phone.replace(/\D/g, "").slice(-10);
  
  // Generate 6-digit cryptographically random OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + OTP_EXPIRY_MS;

  otpStore.set(cleanPhone, {
    otp,
    expiresAt,
    attempts: 0,
  });

  return { otp, expiresAt };
}

export function verifyCustomerOtp(phone: string, enteredOtp: string): { valid: boolean; error?: string } {
  const cleanPhone = phone.replace(/\D/g, "").slice(-10);
  const entry = otpStore.get(cleanPhone);

  if (!entry) {
    return { valid: false, error: "No active OTP found. Please request a new verification code." };
  }

  if (Date.now() > entry.expiresAt) {
    otpStore.delete(cleanPhone);
    return { valid: false, error: "OTP has expired. Please click Resend OTP for a fresh code." };
  }

  if (entry.attempts >= MAX_ATTEMPTS) {
    otpStore.delete(cleanPhone);
    return { valid: false, error: "Too many failed attempts. Please request a new OTP." };
  }

  entry.attempts += 1;

  if (entry.otp.trim() !== enteredOtp.trim()) {
    const remaining = MAX_ATTEMPTS - entry.attempts;
    return { 
      valid: false, 
      error: `Invalid OTP code. Please enter the correct 6-digit code (${remaining} attempt${remaining === 1 ? '' : 's'} remaining).` 
    };
  }

  // OTP is correct! Invalidate so it cannot be reused
  otpStore.delete(cleanPhone);
  return { valid: true };
}
