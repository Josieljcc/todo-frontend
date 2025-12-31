/**
 * Validation utilities
 * Functions for validating form inputs and data
 */

/**
 * Email validation regex pattern
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate email address
 * @param email - Email address to validate
 * @returns true if email is valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== "string") {
    return false;
  }
  return EMAIL_REGEX.test(email.trim());
};

/**
 * Validate password strength
 * @param password - Password to validate
 * @param minLength - Minimum password length (default: 6)
 * @returns true if password meets requirements, false otherwise
 */
export const validatePassword = (password: string, minLength = 6): boolean => {
  if (!password || typeof password !== "string") {
    return false;
  }
  return password.length >= minLength;
};

/**
 * Validate required field
 * @param value - Value to validate
 * @returns true if value is not empty, false otherwise
 */
export const validateRequired = (value: unknown): boolean => {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === "string") {
    return value.trim().length > 0;
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return true;
};

/**
 * Validate password match
 * @param password - Original password
 * @param confirmPassword - Confirmation password
 * @returns true if passwords match, false otherwise
 */
export const validatePasswordMatch = (
  password: string,
  confirmPassword: string,
): boolean => {
  if (!password || !confirmPassword) {
    return false;
  }
  return password === confirmPassword;
};

/**
 * Validate username
 * @param username - Username to validate
 * @param minLength - Minimum username length (default: 3)
 * @param maxLength - Maximum username length (default: 50)
 * @returns true if username is valid, false otherwise
 */
export const validateUsername = (
  username: string,
  minLength = 3,
  maxLength = 50,
): boolean => {
  if (!username || typeof username !== "string") {
    return false;
  }
  const trimmed = username.trim();
  return trimmed.length >= minLength && trimmed.length <= maxLength;
};

/**
 * Validate string length
 * @param value - String to validate
 * @param minLength - Minimum length
 * @param maxLength - Maximum length
 * @returns true if string length is within range, false otherwise
 */
export const validateLength = (
  value: string,
  minLength?: number,
  maxLength?: number,
): boolean => {
  if (!value || typeof value !== "string") {
    return false;
  }
  const length = value.trim().length;
  if (minLength !== undefined && length < minLength) {
    return false;
  }
  if (maxLength !== undefined && length > maxLength) {
    return false;
  }
  return true;
};

/**
 * Get validation error message for email
 * @param email - Email to validate
 * @returns Error message or null if valid
 */
export const getEmailError = (email: string): string | null => {
  if (!email) {
    return "Email is required";
  }
  if (!validateEmail(email)) {
    return "Please enter a valid email address";
  }
  return null;
};

/**
 * Get validation error message for password
 * @param password - Password to validate
 * @param minLength - Minimum password length (default: 6)
 * @returns Error message or null if valid
 */
export const getPasswordError = (password: string, minLength = 6): string | null => {
  if (!password) {
    return "Password is required";
  }
  if (!validatePassword(password, minLength)) {
    return `Password must be at least ${minLength} characters long`;
  }
  return null;
};

/**
 * Get validation error message for required field
 * @param value - Value to validate
 * @param fieldName - Name of the field (for error message)
 * @returns Error message or null if valid
 */
export const getRequiredError = (
  value: unknown,
  fieldName = "Field",
): string | null => {
  if (!validateRequired(value)) {
    return `${fieldName} is required`;
  }
  return null;
};

/**
 * Get validation error message for password match
 * @param password - Original password
 * @param confirmPassword - Confirmation password
 * @returns Error message or null if valid
 */
export const getPasswordMatchError = (
  password: string,
  confirmPassword: string,
): string | null => {
  if (!confirmPassword) {
    return "Please confirm your password";
  }
  if (!validatePasswordMatch(password, confirmPassword)) {
    return "Passwords do not match";
  }
  return null;
};
