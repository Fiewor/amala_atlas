# Amala Atlas

Discover, submit, and verify the best Amala spots in Lagos.

## Table of Contents
- [Amala Atlas](#amala-atlas)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Setup \& Installation](#setup--installation)
  - [Environment Variables](#environment-variables)
  - [Usage](#usage)
  - [API Integration](#api-integration)
  - [Development](#development)
  - [Testing](#testing)
  - [Contributing](#contributing)
  - [License](#license)

---

## Overview
Amala Atlas is a web application for discovering, submitting, and verifying Amala restaurants in Lagos. It features a map view, search, chat agent, and user verification.

---

## Features
- **Map View:** Interactive map with clickable pins for restaurants.
- **Search:** Search for restaurants by name, address, or city, with API integration.
- **Chat Agent:** Chatbot for restaurant recommendations and queries.
- **Verification:** Users can verify restaurant authenticity.
- **Add Restaurant:** Submit new Amala spots via a modal form.
- **Dark Mode:** Modern dark UI with lime accent colors.

---

## Tech Stack
- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:**
  - **MCP Server:** Model Context Protocol server for agent orchestration (Python, FastAPI)
  - **ADK:** Agent Development Kit for building and managing agents
  - **FastAPI:** Used for REST endpoints and integration with MCP/ADK
  - **Ngrok:** For local development and tunneling
- **Map:** Google Maps JavaScript API
- **State Management:** React hooks
- **Styling:** Tailwind CSS, custom CSS variables

---

## Project Structure
```
app/                # Next.js app directory
  globals.css       # Global styles
  page.tsx          # Landing page
  api/              # API routes
components/         # Reusable React components
  local/            # App-specific components (Map, RestaurantCard, etc.)
  ui/               # shadcn/ui components (Drawer, Popover, etc.)
lib/
  types/            # TypeScript types
  utils/            # Utility functions (API config, etc.)
public/             # Static assets (images, icons)
agent/              # Backend agent logic (Python, Terraform, etc.)
mcp_server/         # MCP server (Python, FastAPI, ADK)
notebooks/          # Jupyter notebooks for testing/evaluation
tests/              # Unit and integration tests
```

---

## Setup & Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Fiewor/amala_atlas.git
   cd amala_atlas
   ```
2. **Install dependencies:**
   ```bash
   bun install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env.local` and fill in required values (see below).
4. **Run the development server:**
   ```bash
   bun dev
   ```
5. **Backend (MCP/ADK/FastAPI):**
   - See `mcp_server/README.md` for Python backend setup and instructions.
   - Typical steps:
     ```bash
     cd mcp_server
     pip install -r requirements.txt
     uvicorn server:app --reload
     ```

---

## Environment Variables
Create a `.env.local` file in the root directory:
```
NEXT_PUBLIC_API_BASE_URL=https://649d9e0a016a.ngrok-free.app
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

---

## Usage
- **Search:** Use the search bar to find Amala spots. Results are fetched from the API.
- **Map:** Click pins to view restaurant details in a popup.
- **Chat:** Click the chatbot icon (bottom right) to chat with the agent.
- **Add Restaurant:** Click "Add Amala Spot" to submit a new location.
- **Verify:** Click "Verify this Location" on a restaurant card to submit a verification.

---

## API Integration
- **Session Creation:**  
  `POST /apps/my_sample_agent/users/u_123/sessions/s_123`
- **Run Query:**  
  `POST /run`  
  ```json
  {
    "app_name": "my_sample_agent",
    "user_id": "u_123",
    "session_id": "s_123",
    "new_message": {
      "role": "user",
      "parts": [{ "text": "your query here" }]
    }
  }
  ```
- **Custom User-Agent:** All API requests send a custom user agent to bypass ngrok test page.
- **Backend:** MCP server (Python, FastAPI, ADK) handles agent orchestration and API endpoints.

---

## Development
- **Styling:** Uses Tailwind CSS and custom variables for dark/lime theme.
- **Components:** Built with shadcn/ui for modern UI elements (Drawer, Popover, etc.).
- **Map:** Google Maps API for interactive map and markers.
- **API Utility:** See `lib/utils/api.ts` for reusable API config.
- **Backend:**
  - MCP server and ADK agent logic in `mcp_server/`
  - FastAPI for REST endpoints

---

## Testing
- **Unit & Integration Tests:** Located in `tests/` directory.
- **Jupyter Notebooks:** For agent evaluation and testing in `notebooks/`.
- **Backend:** See `mcp_server/tests/` for Python backend tests.

---

## Contributing
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a pull request

---

## License
MIT License. See `LICENSE` file for details.

---
