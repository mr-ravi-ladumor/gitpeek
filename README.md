# GitPeek 🔍

A full-stack web application to discover and explore active open source GitHub repositories. Built to help developers find interesting projects to contribute to, with filtering and bookmarking features.

**Live Demo:** [https://gitpeek-app.vercel.app/](https://gitpeek-app.vercel.app/)

## Features

- **Repository Discovery**: Browse through 10,000+ pre-fetched open source repositories
- **Advanced Filtering**: Filter by programming language, star count, and topics
- **Smart Sorting**: Sort repositories by stars, forks, or recent activity
- **Bookmark System**: Save interesting repositories with local storage
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Data**: Automated daily updates using GitHub Actions

## Tech Stack

### Backend

- **Node.js** & **Express.js** - REST API server
- **MongoDB** - Database for storing repository data
- **GitHub API** - Data source for repositories
- **GitHub Actions** - Automated data updates

### Frontend

- **React** - User interface
- **React Router** - Client-side routing
- **CSS3** - Styling and responsive design
- **Vite** - Build tool and development server

### Deployment

- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

## Project Structure

```
GitPeek/
├── backend/               # Node.js API server
│   ├── config/            # Database connection
│   ├── controllers/       # Route handlers
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── scripts/           # Data fetching scripts
│   ├── constants.js       # Project constants
│   ├── package.json       # Backend dependencies
│   ├── .env               # Environment variables
│   ├── .gitignore         # Git ignore rules
│   └── server.js          # Express server entry point
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   └── utils/         # Helper functions
│   ├── public/            # Static assets
│   ├── package.json       # Frontend dependencies
│   ├── vite.config.js     # Vite configuration
│   ├── eslint.config.js   # ESLint configuration
│   ├── .gitignore         # Git ignore rules
│   └── index.html         # HTML entry point
├── .github/               # GitHub Actions workflows
│   └── workflows/
└── README.md              # Project documentation
```

## Setup & Installation

### Prerequisites

- Node.js (v16+)
- MongoDB Atlas account
- GitHub Personal Access Token

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GITHUB_TOKEN=your_github_token
CORS_ORIGIN=http://localhost:5173
```

Start server:

```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create `.env` file:

```env
VITE_REACT_APP_API_URL=http://localhost:5000
```

### Data Population

Run the GitHub fetching script:

```bash
cd backend
node scripts/githubRepos.js
```

## Key Features Explained

### Repository Filtering

- **Language Filter**: 20 popular programming languages
- **Star Filter**: Range from 200 to 100k+ stars
- **Topic Filter**: Searchable repository topics
- **Sorting**: By stars, forks, or recent activity

### Automated Updates

- **GitHub Actions**: Scheduled workflow runs daily
- **Data Refresh**: Updates repository statistics
- **Rate Limiting**: Handles GitHub API limits gracefully

### Bookmark System

- **Local Storage**: Bookmarks saved in browser
- **Easy Management**: Add/remove bookmarks with one click

## Performance Considerations

- **Pre-fetched Data**: Repositories stored locally for fast browsing
- **Pagination**: Efficient data loading with 30 repos per page
- **Responsive Design**: Optimized for mobile and desktop screen sizes
- **Error Handling**: Graceful degradation for API failures

## Deployment

The application is deployed using:

- **Frontend**: Vercel (automatic deployments from main branch)
- **Backend**: Render (with environment variables configured)
- **Database**: MongoDB Atlas (cloud database)
