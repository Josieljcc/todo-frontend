/**
 * Utility functions for validating route parameters
 */

/**
 * Parse and validate a numeric ID from route parameters
 * @param id - The ID string from route params
 * @returns The parsed number or null if invalid
 */
export const parseRouteId = (id: string | undefined): number | null => {
  if (!id) {
    return null;
  }

  // Reject non-numeric values (e.g. "12abc") to avoid partial parsing
  if (!/^\d+$/.test(id)) {
    return null;
  }

  const parsed = Number.parseInt(id, 10);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
};

/**
 * Validate that a route ID is valid
 * @param id - The ID string from route params
 * @returns true if the ID is valid
 */
export const isValidRouteId = (id: string | undefined): id is string => {
  return parseRouteId(id) !== null;
};
