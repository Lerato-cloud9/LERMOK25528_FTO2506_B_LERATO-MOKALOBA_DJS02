/**
 * createGrid - Grid renderer factory
 * 
 * Manages the layout and rendering of podcast preview components.
 * This module handles creating and organizing podcast-preview web components
 * in a responsive grid layout.
 * 
 * @module createGrid
 */

import '../components/PodcastPreview.js';
import DateUtils from '../utils/DateUtils.js';

/**
 * Creates a grid renderer instance
 * 
 * @param {HTMLElement} container - The DOM element that will contain the grid
 * @param {Object} genreService - Service for resolving genre IDs to names
 * @param {Function} onCardClick - Callback function when a card is clicked
 * @returns {Object} Grid renderer interface with render and clear methods
 */
const createGrid = (container, genreService, onCardClick) => {
  /**
   * Renders podcast cards in the grid using Web Components
   * 
   * Creates a podcast-preview element for each podcast and populates it
   * with formatted data. Attaches event listeners for user interactions.
   * 
   * @param {Array<Object>} podcasts - Array of podcast objects to render
   * @param {string} podcasts[].id - Unique podcast identifier
   * @param {string} podcasts[].title - Podcast title
   * @param {string} podcasts[].image - URL to podcast cover image
   * @param {Array<Object>} podcasts[].seasons - Array of season objects
   * @param {Array<number>} podcasts[].genres - Array of genre IDs
   * @param {string} podcasts[].updated - ISO date string of last update
   */
  const render = (podcasts) => {
    // Clear existing content
    container.innerHTML = '';

    // Create and append podcast-preview components
    podcasts.forEach(podcast => {
      // Create custom element
      const previewElement = document.createElement('podcast-preview');
      
      // Get genre names from IDs
      const genreNames = genreService.getNames(podcast.genres);
      
      // Set podcast data using the component's method
      previewElement.setPodcastData({
        id: podcast.id,
        title: podcast.title,
        image: podcast.image,
        seasons: podcast.seasons.length,
        genres: genreNames,
        updated: DateUtils.format(podcast.updated)
      });

      // Listen for the custom event from the component
      previewElement.addEventListener('podcast-selected', (event) => {
        onCardClick(podcast);
      });

      container.appendChild(previewElement);
    });
  };

  /**
   * Clears all content from the grid
   * Removes all podcast-preview elements from the container
   */
  const clear = () => {
    container.innerHTML = '';
  };

  return {
    render,
    clear
  };
};

export default createGrid;