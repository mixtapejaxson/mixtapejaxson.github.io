# MixtapeJaxson's Personal Website

This is the source code for my personal website. It is a modern web application built with React Router, TypeScript, and Tailwind CSS, powered by Vite and Node.js.

## Features

*   **Home Page:** A dynamic landing page with animated elements and a welcoming introduction.
*   **About Page:** Detailed information about me, my journey, skills, and experience.
*   **Projects Page:** Showcase of my featured projects with descriptions and links.
*   **Socials Page:** Links to connect with me on various social media platforms.
*   **Responsive Design:** Fully responsive design that works seamlessly on desktop and mobile devices.
*   **Dark Mode:** Beautiful dark theme with purple and pink gradient accents.
*   **Server-Side Rendering (SSR):** Built with React Router v7 for optimal performance and SEO.

## Prerequisites

*   **Node.js** 20.x or higher
*   **npm** (comes with Node.js)

## Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mixtapejaxson/mixtapejaxson.github.io.git
   cd mixtapejaxson.github.io
   ```

2. Install dependencies:
   ```bash
   npm ci
   ```

## Development

To run the development server with hot module replacement:

```bash
npm run dev
```

The site will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Building for Production

To create a production build:

```bash
npm run build
```

This will generate optimized client and server bundles in the `build/` directory.

## Running Production Build

To run the production build locally:

```bash
npm run start
```

The server will start and serve the built application.

## Type Checking

To run TypeScript type checking:

```bash
npm run typecheck
```

## Docker (Optional)

You can also run the application using Docker:

```bash
# Build the Docker image
docker build -t mixtapejaxson-website .

# Run the container
docker run -p 3000:3000 mixtapejaxson-website
```

## Tech Stack

*   **Framework:** React Router v7
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS v4
*   **Build Tool:** Vite
*   **Runtime:** Node.js
*   **Analytics:** Vercel Analytics

## License

This project is licensed under the **MIT** License. See the [LICENSE](LICENSE) file for details.