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
  [100001, 500000]
];


export const DATE_BUCKETS = [
  { label: 'new', value: 'created:>2023-01-01' },
  { label: 'mid', value: 'created:2018-01-01..2022-12-31' },
  { label: 'old', value: 'created:<2018-01-01' }
];



export const ALLOWED_LICENSE_KEYS = new Set([
  "agpl-3.0",
  "apache-2.0",
  "bsd-2-clause",
  "bsd-3-clause",
  "bsl-1.0",
  "cc0-1.0",
  "epl-2.0",
  "gpl-2.0",
  "gpl-3.0",
  "lgpl-2.1",
  "mit",
  "mpl-2.0",
  "unlicense"
]);



export const OPEN_ISSUES_THRESHOLD = 20; 
export const MAX_PAGES = 1; 
export const PER_PAGE = 30;