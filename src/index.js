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
 *
 * @principle SRP - Only responsible for application startup logic like event binding and rendering initial grid.
 */
function init() {
  document
    .getElementById("closeModal")
    .addEventListener("click", createModal.close);
  const grid = createGrid();
  grid.render(podcasts);
}

init();