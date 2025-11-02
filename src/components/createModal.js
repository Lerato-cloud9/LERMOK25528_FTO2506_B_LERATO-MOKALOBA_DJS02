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

/**
 * Closes the modal and restores page scroll.
 * 
 * @example
 * createModal.close();
 */
function close() {
  if (!modal) {
    console.error('Modal element not found');
    return;
  }

  // Hide the modal
  modal.classList.add('hidden');

  // Restore body scroll
  document.body.style.overflow = '';
}

/**
 * Updates the modal content with podcast details.
 * Populates all modal elements with the provided podcast data.
 * 
 * @private
 * @param {Object} podcast - The podcast object containing all details
 */
function updateContent(podcast) {
  // Update title
  if (elements.title) {
    elements.title.textContent = podcast.title;
  }

  // Update image
  if (elements.image) {
    elements.image.src = podcast.image;
    elements.image.alt = `${podcast.title} cover`;
  }

    // Update description
  if (elements.description) {
    elements.description.textContent = podcast.description;
  }

  // Update genres
  if (elements.genres) {
    const genreNames = GenreService.getNames(podcast.genres);
    elements.genres.innerHTML = genreNames
      .map(name => `<span class="tag">${name}</span>`)
      .join('');
  }

  // Update last updated date
  if (elements.updated) {
    elements.updated.textContent = DateUtils.format(podcast.updated);
  }

  // Update seasons list
  if (elements.seasonList) {
    renderSeasons(podcast.id);
  }
}

 /**
 * Renders the list of seasons for a given podcast.
 * Retrieves season data and creates list items for each season.
 * 
 * @private
 * @param {string} podcastId - The podcast ID to get seasons for
 */
function renderSeasons(podcastId) {
  if (!elements.seasonList) return;

  // Find seasons for this podcast
  const podcastSeasons = seasons.find(s => s.id === podcastId);

  if (!podcastSeasons || !podcastSeasons.seasonDetails) {
    elements.seasonList.innerHTML = '<li>No season information available</li>';
    return;
  }

   // Create season list items
  elements.seasonList.innerHTML = podcastSeasons.seasonDetails
    .map(season => createSeasonItem(season))
    .join('');
}

/**
 * Creates an HTML string for a single season list item.
 * 
 * @private
 * @param {Object} season - Season object
 * @param {string} season.title - Season title
 * @param {number} season.episodes - Number of episodes
 * @returns {string} HTML string for the season item
 * 
 * @example
 * createSeasonItem({ title: "Season 1", episodes: 10 })
 * // Returns: '<li class="season-item">...</li>'
 */
function createSeasonItem(season) {
  const episodeText = season.episodes === 1 ? 'episode' : 'episodes';
  
  return `
    <li class="season-item">
      <span class="season-title">${season.title}</span>
      <span class="episodes">${season.episodes} ${episodeText}</span>
    </li>
  `;
}
