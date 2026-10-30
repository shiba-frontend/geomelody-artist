import { isValidPhoneNumber, type CountryCode } from "libphonenumber-js";


export interface ValidationResult {
  isValid: boolean;
  error: string;
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function validateEmail(email: string): ValidationResult {
  if (!email.trim()) {
    return { isValid: false, error: "Email is required" };
  }
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Enter a valid email address" };
  }
  return { isValid: true, error: "" };
}

export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { isValid: false, error: "Password is required" };
  }
  if (password.length < 8) {
    return { isValid: false, error: "Password must be at least 8 characters" };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: "Password must contain an uppercase letter" };
  }
  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: "Password must contain a lowercase letter" };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: "Password must contain a number" };
  }
  return { isValid: true, error: "" };
}

export function validateLoginPassword(password: string): ValidationResult {
  // Login just needs presence — don't punish existing users for a rule change
  if (!password) {
    return { isValid: false, error: "Password is required" };
  }
  return { isValid: true, error: "" };
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string
): ValidationResult {
  if (!confirmPassword) {
    return { isValid: false, error: "Please confirm your password" };
  }
  if (password !== confirmPassword) {
    return { isValid: false, error: "Passwords do not match" };
  }
  return { isValid: true, error: "" };
}

export function validateName(name: string, fieldLabel = "Name"): ValidationResult {
  if (!name.trim()) {
    return { isValid: false, error: `${fieldLabel} is required` };
  }
  if (name.trim().length < 2) {
    return { isValid: false, error: `${fieldLabel} must be at least 2 characters` };
  }
  return { isValid: true, error: "" };
}

// Rough 0-4 strength score, useful for a strength meter UI
export function getPasswordStrength(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}
export function validateRequired(value:any, fieldLabel = "This field") {
  if (!value || !value.toString().trim()) {
    return { isValid: false, error: `${fieldLabel} is required` };
  }
  return { isValid: true, error: "" };
}

export function validateNumberOnly(value:any, fieldLabel = "This field") {
  if (!value.trim()) {
    return { isValid: false, error: `${fieldLabel} is required` };
  }
  if (!/^[0-9]+$/.test(value)) {
    return { isValid: false, error: `${fieldLabel} must contain numbers only` };
  }
  return { isValid: true, error: "" };
}

export function validatePhoneForCountry(phone: string, countryCode: string) {
  if (!phone) {
    return { error: "Phone number is required" };
  }

  if (!countryCode) {
    return { error: "Select a country code first" };
  }

  const isValid = isValidPhoneNumber(phone, countryCode as CountryCode);

  if (!isValid) {
    return { error: `Enter a valid ${countryCode} phone number` };
  }

  return { error: undefined };
}