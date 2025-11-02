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

/**
 * Retrieves genre names for an array of genre IDs.
 * 
 * @param {Array<number>} genreIds - Array of genre IDs to look up
 * @returns {Array<string>} Array of genre names corresponding to the IDs
 * 
 * @example
 * GenreService.getNames([1, 2])
 * // Returns: ["Personal Growth", "Investigative Journalism"]
 * 
 * @example
 * GenreService.getNames([999]) // Non-existent ID
 * // Returns: []
 */

function getNames(genreIds) {
  if (!Array.isArray(genreIds)) {
    console.warn('GenreService.getNames expects an array of IDs');
    return [];
  }

  return genreIds
    .map(id => {
      const genre = genres.find(g => g.id === id);
      return genre ? genre.title : null;
    })
    .filter(name => name !== null);
}

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
