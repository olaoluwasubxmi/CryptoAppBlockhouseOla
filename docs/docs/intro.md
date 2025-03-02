# Project Setup Guide

This guide will help you get started with running both the web and mobile applications of the CryptoApp project.

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js (version 18.0 or above)
- npm or yarn package manager
- Git

## Web Application Setup

### 1. Clone the Repository

```bash
git clone https://github.comolaoluwasubxmiblockhouseassignmentola
cd CryptoApp
```

### 2. Web App Installation

Navigate to the web application directory and install dependencies:

```bash
cd web-app
npm install
```

### 3. Running the Web App

Start the development server:

```bash
npm run dev
```

The web application will be available at `http://localhost:3000`



## Project Structure

The web application follows this basic structure:

```
web-app/
├── app/            # Next.js app directory
├── components/     # Reusable React components
├── public/         # Static assets
└── styles/        # Global styles and CSS modules
```

## Available Scripts

In the web application directory, you can run:

- `npm run dev` - Starts the development server
- `npm run build` - Creates a production build
- `npm run start` - Runs the production build
- `npm run lint` - Runs ESLint for code quality

## Troubleshooting

Common issues and their solutions:

1. **Module not found errors**
   - Run `npm install` again to ensure all dependencies are installed
   - Clear your npm cache: `npm cache clean --force`

2. **Environment Variables not working**
   - Ensure your `.env` file is in the correct location
   - Restart the development server after adding new environment variables

For additional help or reporting issues, please refer to the project's GitHub repository.
