import { podcasts } from "./data.js";
import { createModal } from "./components/createModal.js";
import { createGrid } from "./views/createGrid.js";
import './components/PodcastCard.js'; // Import to register the Web Component

/**
 * Application Entry Point
 * 
 * Initializes the podcast application by:
 * 1. Setting up event listeners for the modal
 * 2. Rendering the podcast grid
 * 3. Listening for podcast card click events
 * 
 * @principle SRP - Only responsible for application startup logic,
 * event binding, and coordinating between components.
 */

/**
 * Initializes the podcast application.
 * Sets up event listeners and renders the initial grid of podcasts.
 */
function init() {
  // Set up modal close button
  const closeButton = document.getElementById('closeModal');
  if (closeButton) {
    closeButton.addEventListener('click', createModal.close);
  }

  // Create and render the grid
  const grid = createGrid();
  grid.render(podcasts);

  // Listen for podcast card selections
  setupPodcastCardListeners();
}