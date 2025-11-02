import { GenreService } from '../utils/GenreService.js';

/**
 * Creates a grid renderer factory for displaying podcast cards.
 * Uses the podcast-card Web Component for rendering individual podcasts.
 * 
 * @factory
 * @returns {Object} Grid renderer object with render method
 * 
 * @example
 * const grid = createGrid();
 * grid.render(podcastList);
 */

export function createGrid() {
  /**
   * The DOM element that will contain the grid of podcast cards.
   * @type {HTMLElement|null}
   */
  const container = document.getElementById('podcastGrid');

  /**
   * Renders a list of podcasts as custom podcast-card elements.
   * Clears existing content and creates new Web Components for each podcast.
   * 
   * @param {Array<Object>} podcasts - Array of podcast objects to render
   * @param {string} podcasts[].id - Specific podcast identifier
   * @param {string} podcasts[].title - Podcast title
   * @param {string} podcasts[].image - URL to podcast cover image
   * @param {Array<number>} podcasts[].genres - Array of genre IDs
   * @param {number} podcasts[].seasons - Number of seasons
   * @param {string} podcasts[].updated - ISO date string of last update
   * 
   * @throws {Error} If container element is not found
   */

  function render(podcasts) {
    if (!container) {
      console.error('Grid container not found');
      return;
    }

  return {
    /**
     * Renders a list of podcast cards into the grid.
     * @param {Object[]} podcastList - Array of podcast objects.
     */
    render(podcastList) {
      container.innerHTML = "";
      podcastList.forEach((p) => {
        const card = createPodcastCard(p, createModal.open);
        container.appendChild(card);
      });
    },
  };
};