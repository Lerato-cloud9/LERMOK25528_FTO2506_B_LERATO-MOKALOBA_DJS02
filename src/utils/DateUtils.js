/**
 * DateUtils - Utility service for date formatting operations
 * 
 * Provides methods to format dates consistently across the application.
 * 
 * @module DateUtils
 * @principle SRP - Only responsible for date-related transformations
 */

/**
 * Formats an ISO date string into a human-readable format.
 * 
 * @param {string} isoDateString - ISO 8601 date string (e.g., "2022-11-03T07:00:00.000Z")
 * @param {Object} [options] - Formatting options
 * @param {boolean} [options.includePrefix=true] - Whether to include "Updated: " prefix
 * @param {string} [options.locale='en-US'] - Locale for date formatting
 * @returns {string} Formatted date string (e.g., "Updated: 03 Nov 2022")
 * 
 * @example
 * DateUtils.format("2022-11-03T07:00:00.000Z")
 * // Returns: "Updated: 03 Nov 2022"
 * 
 * @example
 * DateUtils.format("2022-11-03T07:00:00.000Z", { includePrefix: false })
 * // Returns: "03 Nov 2022"
 * 
 * @example
 * DateUtils.format("invalid-date")
 * // Returns: ""
 */

function format(isoDateString, options = {}) {
  const {
    includePrefix = true,
    locale = 'en-US'
  } = options;

  // Validate input
  if (!isoDateString || typeof isoDateString !== 'string') {
    console.warn('DateUtils.format expects a valid ISO date string');
    return '';
  }

  try {
    const date = new Date(isoDateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date string: ${isoDateString}`);
      return '';
    }

    const formatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    };

    const formattedDate = date.toLocaleDateString(locale, formatOptions);
    
    return includePrefix ? `Updated: ${formattedDate}` : formattedDate;
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}

/**
 * Formats an ISO date string into a relative time format (e.g., "2 days ago").
 * 
 * @param {string} isoDateString - ISO 8601 date string
 * @returns {string} Relative time string (e.g., "2 days ago", "3 months ago")
 * 
 * @example
 * DateUtils.formatRelative("2022-11-01T07:00:00.000Z") // Called on Nov 3, 2022
 * // Returns: "2 days ago"
 */

function formatRelative(isoDateString) {
  if (!isoDateString || typeof isoDateString !== 'string') {
    return '';
  }

  try {
    const date = new Date(isoDateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  } catch (error) {
    console.error('Error formatting relative date:', error);
    return '';
  }
}

  format(dateStr) {
    const date = new Date(dateStr);
    return `Updated ${date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`;
  },
};
