export const languages = [
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "Python",
  "Node",
  "Go",
  "Java",
  "PHP",
  "Ruby",
  "Kotlin",
  "Swift",
  "Dart",
  "R",
  "Julia",
  "Jupyter Notebook",
  "C",
  "C++",
  "Rust",
  "Shell"
];

export const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  Ruby: '#701516',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  Shell: '#89e051',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
  Dart: '#00B4AB',
};

export const starOptions = [
  "Any",
  "100", "500", "1000", "5000", "10000", "50000", "100000", "500000"
];


export const topics = [
  // General
  "web", "cli", "tool", "library", "framework", "app", "awesome",

  // Web Development
  "frontend", "backend", "fullstack", "html", "css", "sass", "scss", "tailwindcss", "bootstrap",
  "javascript", "typescript", "react", "vue", "angular", "nodejs", "express", "nextjs", "nuxtjs",
  "pwa", "web-performance", "ssr", "jamstack",

  // Mobile Development
  "mobile", "android", "ios", "flutter", "react-native", "swift", "kotlin",

  // Data Science & ML
  "machine-learning", "deep-learning", "ai", "artificial-intelligence",
  "data-science", "data-analysis", "nlp", "computer-vision",
  "tensorflow", "pytorch", "scikit-learn", "jupyter-notebook", "pandas", "numpy", "matplotlib",

  // DevOps & Infra
  "devops", "docker", "kubernetes", "ansible", "terraform", "ci-cd", "github-actions",
  "monitoring", "logging", "prometheus", "grafana",

  // Cloud
  "cloud", "aws", "azure", "gcp", "serverless",

  // Databases
  "database", "sql", "postgresql", "mysql", "sqlite", "mongodb", "nosql", "redis", "firebase",

  // API
  "api", "rest", "graphql", "openapi", "swagger", "api-client",

  // Security
  "security", "cybersecurity", "authentication", "authorization", "jwt", "oauth",

  // Blockchain
  "blockchain", "cryptocurrency", "ethereum", "solidity", "web3", "nft", "defi",

  // Game Dev
  "game", "game-development", "unity", "unreal-engine", "godot",

  // OS & Shell
  "linux", "shell", "bash", "powershell", "windows", "macos",

  // Languages (used as topics too)
  "python", "java", "go", "rust", "c", "cpp", "php", "ruby",
  "dart", "r", "julia", "elixir", "scala", "haskell",

  // UI/UX & Design
  "design", "ui", "ux", "accessibility", "figma",

  // Testing
  "testing", "unit-testing", "integration-testing", "jest", "mocha", "cypress", "selenium",

  // Docs
  "markdown", "yaml", "readme", "documentation",

  // Learning & Educational
  "interview-prep", "algorithms", "data-structures", "system-design", "roadmap", "cheatsheet",

  // Misc
  "opensource", "starter-template", "boilerplate", "portfolio", "resume", "blog", "template",

  //other 
  "hacktoberfest",
];


// sort by option and order
export const sortOptions = [
  { value: '', label: 'Default Discovery', order: '', shortLabel: 'Default', icon: 'shuffle', hint: 'Randomized exploration' },
  { value: 'starsCount', label: 'Most Stars', order: 'desc', shortLabel: 'Most Stars', icon: 'star', direction: 'High → Low' },
  { value: 'starsCount', label: 'Fewest Stars', order: 'asc', shortLabel: 'Fewest Stars', icon: 'star', direction: 'Low → High' },
  { value: 'forksCount', label: 'Most Forks', order: 'desc', shortLabel: 'Most Forks', icon: 'fork', direction: 'High → Low' },
  { value: 'forksCount', label: 'Fewest Forks', order: 'asc', shortLabel: 'Fewest Forks', icon: 'fork', direction: 'Low → High' },
  { value: 'openIssuesCount', label: 'Most Open Issues', order: 'desc', shortLabel: 'Most Issues', icon: 'issue', direction: 'High → Low' },
  { value: 'openIssuesCount', label: 'Fewest Open Issues', order: 'asc', shortLabel: 'Fewest Issues', icon: 'issue', direction: 'Low → High' },
  { value: 'createdAt', label: 'Recently Added', order: 'desc', shortLabel: 'Recently Added', icon: 'calendar', direction: 'Newest first' },
  { value: 'createdAt', label: 'Oldest Added', order: 'asc', shortLabel: 'Oldest Added', icon: 'calendar', direction: 'Oldest first' },
];