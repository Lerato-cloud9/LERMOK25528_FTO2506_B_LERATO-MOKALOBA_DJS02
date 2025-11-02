/**
 * DateUtils - Utility service for date formatting operations
 * 
 * Provides methods to format dates consistently across the application.
 * 
 * @module DateUtils
 * @principle SRP - Only responsible for date-related transformations
 */

export const DateUtils = {
  /**
   * Formats a date string into a human-readable format.
   * @param {string} dateStr - ISO date string.
   * @returns {string} Formatted date string.
   */
  format(dateStr) {
    const date = new Date(dateStr);
    return `Updated ${date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`;
  },
};
