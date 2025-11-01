/**
 * PodcastPreview Web Component
 * 
 * A custom HTML element that displays a podcast preview card with encapsulated
 * styles and behavior.
 * 
 * @element podcast-preview
 */
class PodcastPreview extends HTMLElement {
  /**
   * Called when element is added to the DOM
   */
  connectedCallback() {
    // Attach shadow DOM for style encapsulation
    this.attachShadow({ mode: 'open' });
    
    // Render the component
    this.render();
    
    // Add click handlers
    this.addEventListeners();
  }

  /**
   * Define which attributes to watch for changes
   */
  static get observedAttributes() {
    return ['podcast-id', 'title', 'image', 'seasons', 'genres', 'updated'];
  }

  /**
   * Called when an observed attribute changes
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.shadowRoot) {
      this.render();
    }
  }

   /**
   * Renders the component's HTML and styles
   */
  render() {
    // Get attributes
    const title = this.getAttribute('title') || 'Untitled Podcast';
    const image = this.getAttribute('image') || '';
    const seasons = this.getAttribute('seasons') || '0';
    const genres = this.getAttribute('genres') || '';
    const updated = this.getAttribute('updated') || '';

    // Split genres into array
    const genreList = genres
      .split(',')
      .map(g => g.trim())
      .filter(g => g.length > 0);

      // Render HTML
    this.shadowRoot.innerHTML = `
      ${this.getStyles()}
      <div class="card">
        <img src="${image}" alt="${title}" class="card-image" />
        <h3 class="card-title">${title}</h3>
        <p class="card-seasons">Seasons: ${seasons}</p>
        <div class="tags">
          ${genreList.map(genre => `<span class="tag">${genre}</span>`).join('')}
        </div>
        <p class="updated-text">Updated: ${updated}</p>
      </div>
    `;
  }
}