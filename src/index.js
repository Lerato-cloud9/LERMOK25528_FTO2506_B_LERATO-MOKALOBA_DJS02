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

/**
 * Sets up a global event listener for podcast card selections.
 * Uses event delegation to handle clicks from all podcast-card components.
 * 
 * The podcast-card Web Component dispatches a 'podcast-selected' event
 * with the podcast ID in the detail property.
 */
function setupPodcastCardListeners() {
  document.addEventListener('podcast-selected', (event) => {
    const podcastId = event.detail.podcastId;
    
    // Find the full podcast data
    const podcast = podcasts.find(p => p.id === podcastId);
    
    if (podcast) {
      // Open the modal with the selected podcast
      createModal.open(podcast);
    }
  });
}

// Start the application
init();