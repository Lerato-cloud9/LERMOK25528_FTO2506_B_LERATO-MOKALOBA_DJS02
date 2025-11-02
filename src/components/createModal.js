import { GenreService } from "../utils/GenreService.js";
import { DateUtils } from "../utils/DateUtils.js";
import { seasons } from "../data.js";

/**
 * createModal - Factory function for modal controller
 * 
 * Creates a modal controller that manages the display of podcast details
 * in a modal overlay. Handles opening, closing, and updating modal content.
 * 
 * @factory
 * @principle SRP - Only responsible for modal display logic and content updates
 * @principle Encapsulation - Internal state and DOM references are private
 * 
 * @example
 * import { createModal } from './components/createModal.js';
 * 
 * createModal.open(podcastData);
 * createModal.close();
 */

/**
 * The modal container element from the DOM.
 * @type {HTMLElement|null}
 */

const modal = document.getElementById('modal');

/**
 * DOM element references for modal content.
 * @type {Object}
 */

const elements = {
  title: document.getElementById('modalTitle'),
  image: document.getElementById('modalImage'),
  description: document.getElementById('modalDesc'),
  genres: document.getElementById('modalGenres'),
  updated: document.getElementById('modalUpdated'),
  seasonList: document.getElementById('seasonList')
};

/**
 * Opens the modal and displays podcast details.
 * 
 * @param {Object} podcast - The podcast object to display
 * @param {string} podcast.id - Unique podcast identifier
 * @param {string} podcast.title - Podcast title
 * @param {string} podcast.image - URL to podcast cover image
 * @param {string} podcast.description - Podcast description
 * @param {Array<number>} podcast.genres - Array of genre IDs
 * @param {string} podcast.updated - ISO date string of last update
 * 
 * @throws {Error} If modal element is not found in DOM
 * 
 * @example
 * createModal.open({
 *   id: "10716",
 *   title: "Something Was Wrong",
 *   image: "https://...",
 *   description: "A true-crime docuseries...",
 *   genres: [1, 2],
 *   updated: "2022-11-03T07:00:00.000Z"
 * });
 */

  function open(podcast) {
  if (!modal) {
    console.error('Modal element not found');
    return;
  }

  // Update modal content
  updateContent(podcast);

  // Show the modal
  modal.classList.remove('hidden');

  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden';
}
  return {
    /**
     * Opens the modal with podcast details.
     * @param {Object} podcast - Podcast object.
     */
    open(podcast) {
      updateContent(podcast);
      modal.classList.remove("hidden");
    },
    /** Closes the modal. */
    close() {
      modal.classList.add("hidden");
    },
  };
})();
