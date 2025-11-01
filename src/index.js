/**
 * Application Entry Point
 * 
 * Orchestrates the initialization and setup of the podcast application.
 * Coordinates all services, components, and views to create a functioning app.
 * This module acts as the main controller that wires everything together.
 * 
 * @module index
 */

import { podcasts, genres } from './data.js';
import createGenreService from './utils/GenreService.js';
import createModal from './components/createModal.js';
import createGrid from './views/createGrid.js';

/**
 * Initializes the podcast application
 * 
 * Sets up all necessary services, creates the modal controller, initializes
 * the grid view, and renders the initial podcast list. This function is called
 * once when the DOM is ready.
 * 
 * @function initApp
 * 
 * @description
 * Initialization sequence:
 * 1. Create the genre service for ID-to-name conversion
 * 2. Get the main grid container from the DOM
 * 3. Create the modal controller for detail views
 * 4. Create the grid renderer with a callback for card clicks
 * 5. Render all podcasts to the grid
 * 
 * @example
 * // Automatically called when DOM is ready
 * initApp();
 */
const initApp = () => {
  // Initialize the genre service with genre data
  const genreService = createGenreService(genres);

  // Get the main grid container element
  const gridContainer = document.getElementById('podcastGrid');

  // Create modal controller for showing podcast details
  const modal = createModal(genreService);

  /**
   * Create grid renderer with click handler
   * When a podcast card is clicked, open the modal with that podcast's data
   */
  const grid = createGrid(gridContainer, genreService, (podcast) => {
    modal.open(podcast);
  });

  // Render all podcasts to the grid
  grid.render(podcasts);
};

/**
 * Application bootstrap
 * 
 * Ensures the app initializes only after the DOM is fully loaded.
 * Checks the document's ready state and either initializes immediately
 * or waits for the DOMContentLoaded event.
 */
if (document.readyState === 'loading') {
  // DOM is still loading, wait for it to be ready
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  // DOM is already ready, initialize immediately
  initApp();
}