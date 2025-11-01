/**
 * Date Formatter - Utility module for date formatting operations
 * 
 * Provides a clean, consistent interface for converting ISO date strings
 * into human-readable formats. This utility abstracts date formatting logic
 * and ensures consistent date display throughout the application.
 * 
 * @principle SRP - Single Responsibility Principle: This module only formats 
 * dates and does not handle any unrelated logic or UI concerns.
 * 
 * @module DateUtils
 */
export const DateUtils = {
  /**
   * Formats an ISO date string into a human-readable format
   * 
   * Converts dates like "2023-06-15T07:00:00.000Z" into readable text
   * like "June 15, 2023". Uses the en-US locale for consistent formatting.
   * 
   * @param {string} dateStr - ISO date string (e.g., "2023-06-15T07:00:00.000Z")
   * @returns {string} Formatted date string (e.g., "June 15, 2023")
   * 
   * * @example
   * DateUtils.format("2023-06-15T07:00:00.000Z");
   * // Returns: "June 15, 2023"
   * 
   * @example
   * // In your component, add context:
   * const text = `Updated ${DateUtils.format(podcast.updated)}`;
   * // Returns: "Updated June 15, 2023"
   */

format(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {  // No "Updated" prefix
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
}