/**
 * Grid Renderer - Responsible for rendering the grid of podcast cards using Web Components.
 *
 * This module manages the layout and rendering of podcast preview components.
 * It creates podcast-preview custom elements for each podcast and handles
 * their lifecycle and event delegation.
 *
 * @principle SRP - Manages layout and rendering only; delegates card creation 
 * to the PodcastPreview Web Component and modal logic to the caller.
 * 
 * @module createGrid
 */

import '../components/PodcastPreview.js';  // Import the Web Component (registers the custom element)
import { DateUtils } from '../utils/DateUtils.js';  // Import date formatting utility

/**
 * Creates a grid renderer instance
 * 
 * Factory function that returns an object with methods to render and manage
 * the podcast grid. This function encapsulates the grid container reference
 * and provides a clean interface for rendering operations.
 */

export const createGrid = (genreService, onPodcastClick) => {  // ← New parameters
  // Get reference to the grid container element
  const container = document.getElementById("podcastGrid");

  return {
    /**
     * Renders a list of podcast cards into the grid using Web Components.
     * 
     * Clears the existing grid content and creates a new podcast-preview
     * custom element for each podcast in the list. Each component is
     * populated with formatted data and configured to emit events on user
     * interaction.
     */
    render(podcastList) { 
    // Clear existing content to prevent duplicates      
      container.innerHTML = "";
      
      // Create a Web Component for each podcast
      podcastList.forEach((podcast) => {
      // Create the custom podcast-preview element
        const previewElement = document.createElement('podcast-preview');
        
      // Resolve genre IDs to human-readable names using the service
        const genreNames = genreService.getNames(podcast.genres);
        
      // Set all podcast data on the Web Component at once
      // This uses the component's helper method for cleaner code
        previewElement.setPodcastData({
          id: podcast.id,
          title: podcast.title,
          image: podcast.image,
          seasons: podcast.seasons.length, // Count of seasons
          genres: genreNames,              // Resolved genre names (not IDs)
          updated: DateUtils.format(podcast.updated) // Formatted date
        });

        // Listen for component event
        previewElement.addEventListener('podcast-selected', (event) => {
          onPodcastClick(podcast);
        });

        // Append the Web Component to the grid container
        container.appendChild(previewElement);
      });
    },

    /**
     * Clears all content from the grid
     * 
     * Removes all podcast-preview elements from the container.
     * Useful for refreshing the grid or cleaning up before navigation.
     * 
     * @example
     * grid.clear();
     */
    clear() {
      container.innerHTML = "";
    }
  };
};
