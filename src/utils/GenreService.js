import { genres } from "../data.js";

/**
 * GenreService - Utility service for genre-related operations
 * 
 * Provides methods to resolve genre IDs to their corresponding names
 * and other genre-related functionality.
 * 
 * @module GenreService
 * @principle SRP - Only responsible for genre data transformations
 */

export const GenreService = {
  /**
   * Resolves an array of genre IDs into an array of genre titles.
   * @param {number[]} genreIds - Array of genre IDs.
   * @returns {string[]} Array of genre titles.
   */
  getNames(genreIds) {
    return genreIds.map(
      (id) => genres.find((g) => g.id === id)?.title || "Unknown"
    );
  },
};
