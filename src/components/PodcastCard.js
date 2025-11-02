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
}