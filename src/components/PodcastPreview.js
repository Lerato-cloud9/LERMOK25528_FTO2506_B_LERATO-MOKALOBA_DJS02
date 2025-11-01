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
}