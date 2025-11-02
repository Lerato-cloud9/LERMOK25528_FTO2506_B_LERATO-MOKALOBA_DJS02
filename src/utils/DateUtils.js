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

  format(dateStr) {
    const date = new Date(dateStr);
    return `Updated ${date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`;
  },
};
