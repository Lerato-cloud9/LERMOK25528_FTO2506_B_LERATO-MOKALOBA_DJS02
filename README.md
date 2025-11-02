# DJS01 Vanila JS Podcast App

This project is a **modular vanilla JavaScript application** that displays a list of podcasts as cards and shows detailed information in a modal when a card is clicked. It uses **factory functions**, **utility services**, and **clean folder structure** to emphasise good software design practices.

> **Note:** This solution focuses on **functionality and modular JavaScript design**. It does **not include extensive styling** or visual polish.  
> You are encouraged to **customise the look and feel** of the app using your own CSS or Tailwind.

## Project Structure

```
/src
│
├── /components
│ ├── createPodcastCard.js // Factory to generate podcast preview cards
│ └── createModal.js // Modal controller factory (open/close/update content)
│
├── /utils
│ ├── DateUtils.js // Utility for formatting date strings
│ └── GenreService.js // Service to resolve genre IDs into names
│
├── /views
│ └── createGrid.js // Grid renderer factory that places cards on the page
│
├── data.js // Sample data: podcasts, genres, seasons
└── index.js // Application entry point and setup
```

## Features

- Renders podcast cards dynamically
- Opens a modal with more information on click
- Uses genre and season data for display
- Formats dates cleanly and consistently
- Follows **modular design** using **factory functions**

## Key Takeaways

### 1. **Modular Design**

- Code is split into small, focused modules.
- Each file has a **single responsibility**, making it easier to understand and maintain.

### 2. **Factory Functions**

- Modules like `createPodcastCard`, `createGrid`, and `createModal` return objects that encapsulate logic.
- This promotes **encapsulation** and **reuse**.

  Example:

  ```js
  const grid = createGrid();
  grid.render(podcastList);
  ```

### 3. Abstraction

- Internals (like how date formatting or genre mapping works) are hidden behind clear interfaces (`DateUtils.format, GenreService.getNames`).

- Consumers don’t need to know how something works, only what it does.

### 4. SRP (Single Responsibility Principle)

- Each module does one thing:
  - `DateUtils.js` – formats dates
  - `createModal.js` – controls the modal
  - `createPodcastCard.js` – creates UI for one podcast
  - `createGrid.js` – manages layout and rendering

### 5. Clear Entry Point

- `index.js` acts as the orchestrator, setting up the app and wiring components together.
- This keeps global logic and setup in one place.

## How to Run

1. Open `index.html` in your browser.
2. Browse through the podcast cards.
3. Click a card to view more information in the modal.
4. Click "Close" to return to the list.

🎙️ My Podcast App

What I Built
This is a podcast listing app that displays podcast cards in a grid. When you click on a card, a modal pops up with more details about that podcast.
I archieved this by using Web Components because I wanted to learn how they work and make my code more reusable. with just plain JavaScript!

The Web Component Approach
Why I Used Web Components
I wanted each podcast card to be a self-contained, reusable component. Web Components let me do that using browser standards.
Here's what I like about this approach:

Encapsulation: Styles are scoped to the component (Shadow DOM FTW!)
Reusability: I can drop <podcast-card> anywhere
Standards-based: It's built into the browser
No dependencies: Just vanilla JS

How It Works

Each <podcast-card> shows podcast info and dispatches a podcast-selected event when clicked.

index.js listens for this event, finds the podcast data, and opens the modal.

createModal fills in the modal with all details like title, image, genres, and seasons.

Key Features

Web Components with Shadow DOM for reusable cards

Event-based communication between cards and modal

Utility functions for date formatting and genre mapping

Things I Learned

Shadow DOM keeps styles scoped

Custom events are great for decoupling components

Web Components are simple once you understand the lifecycle