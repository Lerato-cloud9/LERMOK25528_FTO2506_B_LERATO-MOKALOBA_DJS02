/**
 * PodcastCard Web Component
 * 
 * A custom HTML element that displays a podcast preview card with image,
 * title, genres, seasons, and last updated date.
 * 
 * @element podcast-card
 * 
 * @attr {string} podcast-id - The unique identifier for the podcast
 * @attr {string} title - The podcast title
 * @attr {string} image - URL to the podcast cover image
 * @attr {string} genres - Comma-separated genre names
 * @attr {number} seasons - Number of seasons
 * @attr {string} updated - ISO date string of last update
 * 
 * @fires podcast-selected - Dispatched when card is clicked, contains podcast ID
 * 
 * @example
 * <podcast-card
 *   podcast-id="10716"
 *   title="Something Was Wrong"
 *   image="https://example.com/image.jpg"
 *   genres="Personal Growth, Investigative Journalism"
 *   seasons="14"
 *   updated="2022-11-03T07:00:00.000Z">
 * </podcast-card>
 */

class PodcastCard extends HTMLElement {
  /**
   * Creates an instance of PodcastCard.
   * Sets up Shadow DOM for encapsulation.
   */
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  /**
   * Lifecycle callback invoked when the element is added to the DOM.
   * Renders the component's initial content and sets up event listeners.
   */
  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  /**
   * Specifies which attributes to observe for changes.
   * 
   * @returns {string[]} Array of attribute names to observe
   */
  static get observedAttributes() {
    return ['title', 'image', 'genres', 'seasons', 'updated'];
  }

  /**
   * Lifecycle callback invoked when an observed attribute changes.
   * Re-renders the component with updated data.
   * 
   * @param {string} name - The name of the changed attribute
   * @param {string} oldValue - The previous value
   * @param {string} newValue - The new value
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
}

/**
   * Formats an ISO date string into a human-readable format.
   * 
   * @param {string} isoDate - ISO date string (e.g., "2022-11-03T07:00:00.000Z")
   * @returns {string} Formatted date string (e.g., "Updated: 03 Nov 2022")
   */
  formatDate(isoDate) {
    if (!isoDate) return '';
    
    const date = new Date(isoDate);
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const formatted = date.toLocaleDateString('en-US', options);
    
    return `Updated: ${formatted}`;
  }

  /**
   * Renders the component's HTML and CSS into the Shadow DOM.
   * This method creates the complete structure of the podcast card.
   */
  render() {
    const title = this.getAttribute('title') || '';
    const image = this.getAttribute('image') || '';
    const genres = this.getAttribute('genres') || '';
    const seasons = this.getAttribute('seasons') || '0';
    const updated = this.getAttribute('updated') || '';

    // Split genres string into array and create tags
    const genreList = genres
      .split(',')
      .map(genre => genre.trim())
      .filter(genre => genre)
      .map(genre => `<span class="tag">${genre}</span>`)
      .join('');
  }