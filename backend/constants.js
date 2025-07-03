export const DB_NAME = "gitpeekDB"; // Name of the MongoDB database

export const LANGUAGES = [
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
export const STAR_BUCKETS = [
  [200, 500],
  [501, 2000],
  [2001, 5000],
  [5001, 10000],
  [10001, 25000], 
  [25001, 50000],
  [50001, 100000],
];

// some of popular licenses
export const ALLOWED_LICENSE_KEYS = new Set([
  "mit",
  "apache-2.0",
  "gpl-3.0",
  "gpl-2.0",
]);

export const MAX_PAGES = 3; 
export const PER_PAGE = 30;