# 🌐 Concurrent Web Crawler (TypeScript + Node.js)

A **concurrent web crawler** built with **TypeScript, Node.js, and p-limit** to control concurrency.  
It crawls a given website, fetches internal links recursively, and generates a report of how many times each page was discovered.

---

## ✨ Features
- 🌍 Crawl any website starting from a base URL
- ⚡ Concurrency control with [`p-limit`](https://github.com/sindresorhus/p-limit)  
- 🔗 Extracts links from HTML using [JSDOM](https://github.com/jsdom/jsdom)  
- 📊 Generates a **report** showing internal link counts
- 🛡️ Error handling for invalid links, non-HTML content, and failed requests

- 📦 Tech Stack
TypeScript
Node.js
JSDOM → HTML parsing
p-limit → Concurrency control

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/typescript-crawler.git
cd typescript-crawler
```


### 2. Install dependencies
```bash
npm install
```


### 3. Run the crawler
```bash
npm run start https://example.com
```

### Output example:
```pgsql
=============================
  REPORT for https://example.com
=============================
Found 5 links to https://example.com
Found 3 links to https://example.com/about
Found 2 links to https://example.com/contact
```
