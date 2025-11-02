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

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .card {
          background: white;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: transform 0.2s;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .card:hover {
          transform: scale(1.02);
        }

        .card-image {
          width: 100%;
          border-radius: 6px;
          aspect-ratio: 1;
          object-fit: cover;
        }

        .card-title {
          margin: 0.5rem 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
        }

        .card-info {
          margin: 0;
          font-size: 0.8rem;
          color: #555;
        }

        .tags {
          margin: 0.5rem 0;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tag {
          background: #eee;
          padding: 0.3rem 0.6rem;
          border-radius: 4px;
          display: inline-block;
          font-size: 0.8rem;
          color: #555;
        }

        .updated-text {
          font-size: 0.8rem;
          color: #555;
          margin-top: auto;
          padding-top: 0.5rem;
        }
      </style>

      <article class="card">
        <img 
          class="card-image" 
          src="${image}" 
          alt="${title} cover"
          loading="lazy"
        />
        <h3 class="card-title">${title}</h3>
        <p class="card-info">Seasons: ${seasons}</p>
        <div class="tags">
          ${genreList}
        </div>
        <p class="updated-text">${this.formatDate(updated)}</p>
      </article>
    `;
  }
