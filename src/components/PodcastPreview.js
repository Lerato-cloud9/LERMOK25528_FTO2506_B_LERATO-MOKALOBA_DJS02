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

  /**
   * Returns encapsulated CSS styles
   */
  getStyles() {
    return `
      <style>
        :host {
          display: block;
          cursor: pointer;
        }

        .card {
          background: white;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
          height: 100%;
          box-sizing: border-box;
        }

        :host(:hover) .card {
          transform: scale(1.02);
        }

        .card-image {
          width: 100%;
          border-radius: 6px;
          display: block;
        }

        .card-title {
          margin: 0.5rem 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
        }

        .card-seasons {
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
          font-size: 0.8rem;
          color: #555;
        }

        .updated-text {
          font-size: 0.8rem;
          color: #555;
          margin: 0.5rem 0 0 0;
        }

        @media (max-width: 480px) {
          .card-title {
            font-size: 1rem;
          }
          
          .card-seasons,
          .updated-text,
          .tag {
            font-size: 0.75rem;
          }
        }
      </style>
    `;
  }

  /**
   * Attaches event listeners
   */
  addEventListeners() {
    const card = this.shadowRoot.querySelector('.card');
    
    card.addEventListener('click', () => {
      // Dispatch custom event when clicked
      this.dispatchEvent(
        new CustomEvent('podcast-selected', {
          bubbles: true,
          composed: true,
          detail: {
            podcastId: this.getAttribute('podcast-id')
          }
        })
      );
    });
  }

}