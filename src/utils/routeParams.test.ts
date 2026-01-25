import { describe, expect, it } from 'vitest';
import { isValidRouteId, parseRouteId } from './routeParams';

describe('routeParams', () => {
  describe('parseRouteId', () => {
    it('should parse valid ID', () => {
      expect(parseRouteId('123')).toBe(123);
      expect(parseRouteId('1')).toBe(1);
      expect(parseRouteId('999')).toBe(999);
    });

    it('should return null for invalid ID (string)', () => {
      expect(parseRouteId('abc')).toBeNull();
      expect(parseRouteId('12abc')).toBeNull();
      expect(parseRouteId('abc123')).toBeNull();
    });

    it('should return null for negative ID', () => {
      expect(parseRouteId('-1')).toBeNull();
      expect(parseRouteId('-123')).toBeNull();
    });

    it('should return null for zero', () => {
      expect(parseRouteId('0')).toBeNull();
    });

    it('should return null for undefined', () => {
      expect(parseRouteId(undefined)).toBeNull();
    });

    it('should return null for empty string', () => {
      expect(parseRouteId('')).toBeNull();
    });

    it('should handle decimal numbers (parseInt behavior)', () => {
      expect(parseRouteId('123.45')).toBeNull();
    });
  });

  describe('isValidRouteId', () => {
    it('should return true for valid ID', () => {
      expect(isValidRouteId('123')).toBe(true);
      expect(isValidRouteId('1')).toBe(true);
      expect(isValidRouteId('999')).toBe(true);
    });

    it('should return false for invalid ID (string)', () => {
      expect(isValidRouteId('abc')).toBe(false);
      expect(isValidRouteId('12abc')).toBe(false);
    });

    it('should return false for negative ID', () => {
      expect(isValidRouteId('-1')).toBe(false);
    });

    it('should return false for zero', () => {
      expect(isValidRouteId('0')).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isValidRouteId(undefined)).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(isValidRouteId('')).toBe(false);
    });
  });
});
