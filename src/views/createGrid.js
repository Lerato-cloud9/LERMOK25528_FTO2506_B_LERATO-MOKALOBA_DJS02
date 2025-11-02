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