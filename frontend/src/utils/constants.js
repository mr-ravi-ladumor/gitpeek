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
    { value: '', label: 'No sort', order: '' },
    { value: 'starsCount', label: 'Stars (desc)', order: 'desc' },
    { value: 'starsCount', label: 'Stars (asc)', order: 'asc' },
    { value: 'forksCount', label: 'Forks (desc)', order: 'desc' },
    { value: 'forksCount', label: 'Forks (asc)', order: 'asc' },
    { value: 'openIssuesCount', label: 'Issues (desc)', order: 'desc' },
    { value: 'openIssuesCount', label: 'Issues (asc)', order: 'asc' },
    { value: 'createdAt', label: 'Created (desc)', order: 'desc' },
    { value: 'createdAt', label: 'Created (asc)', order: 'asc' },
  ];