/**
 * Main app file
 * 
 * Starts the podcast app and sets up all parts like services, components, and views.
 */
import { podcasts, genres } from "./data.js";
import { createGenreService } from './utils/GenreService.js';  // New import
import { createModal } from "./components/createModal.js";
import { createGrid } from "./views/createGrid.js";

/**
 * Start the podcast app
 * 
 * Sets up services, modal, grid, and shows the podcast list.
 * Runs once when the page is ready.
 */

const initApp = () => {
  // Create genre service to get genre names from IDs
  const genreService = createGenreService(genres);  // New

  // Create modal to show podcast details
  const modal = createModal(genreService);  // New
  
  // Create grid to show podcast cards
  // When a card is clicked, open the modal
  const grid = createGrid(genreService, (podcast) => {  // New parameters
    modal.open(podcast);
  });
  
  // Show all podcasts in the grid
  grid.render(podcasts);
};

/**
 * Start the app when the page is ready
 * 
 * If the page is still loading, wait for DOMContentLoaded.
 * Otherwise, start the app immediately.
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}