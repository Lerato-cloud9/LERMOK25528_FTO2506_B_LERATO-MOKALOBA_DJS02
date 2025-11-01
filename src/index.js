import { podcasts } from "./data.js";
import { createGenreService } from './utils/GenreService.js';  // New import
import { createModal } from "./components/createModal.js";
import { createGrid } from "./views/createGrid.js";

const initApp = () => {
  // Create services
  const genreService = createGenreService(genres);  // New
  const modal = createModal(genreService);  // New
  
  // Create grid with dependencies
  const grid = createGrid(genreService, (podcast) => {  // New parameters
    modal.open(podcast);
  });
  
  grid.render(podcasts);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}