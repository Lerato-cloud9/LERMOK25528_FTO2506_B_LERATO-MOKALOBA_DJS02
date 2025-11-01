import '../components/PodcastPreview.js';  // Web Component
import DateUtils from '../utils/DateUtils.js';  // Date formatter

export const createGrid = (genreService, onPodcastClick) => {  // ← New parameters
  const container = document.getElementById("podcastGrid");

  return {
    render(podcastList) {
      container.innerHTML = "";
      
      podcastList.forEach((podcast) => {
        // Create Web Component
        const previewElement = document.createElement('podcast-preview');
        
        // Get genre names
        const genreNames = genreService.getNames(podcast.genres);
        
        // Set data on component
        previewElement.setPodcastData({
          id: podcast.id,
          title: podcast.title,
          image: podcast.image,
          seasons: podcast.seasons.length,
          genres: genreNames,
          updated: DateUtils.format(podcast.updated)
        });

        // Listen for component event
        previewElement.addEventListener('podcast-selected', (event) => {
          onPodcastClick(podcast);
        });

        container.appendChild(previewElement);
      });
    },
  };
};
