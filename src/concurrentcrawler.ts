// import pLimit from "p-limit";
// import { Url, UrlObject } from "url";
// import { getURLsFromHTML, normalizeURL } from "./crawl";

// class ConcurrentCrawler {
//   baseURL!: string;
//   pages!: Record<string, number>;
//   limit!: Function;

//   constructor(baseURL: string, pages: Record<string, number>, limit: Function) {
//     (this.baseURL = baseURL), (this.pages = pages), (this.limit = pLimit(1));
//   }

//   addPageVisit(normalizedURL: string): boolean {
//     if (normalizedURL in this.pages) {
//       this.pages[normalizedURL]++;
//       return false;
//     } else {
//       this.pages[normalizedURL] = 1;
//       return true;
//     }
//   }

//   private async getHTML(url: string) {
//     return await this.limit(async () => {
//       try {
//         const response: Response = await fetch(url);
//         const data = await response.text();

//         if (response.status > 400) {
//           console.error("Error in status code :", response.statusText);
//           return;
//         }
//         const content_type = response.headers.get("Content-type");

//         if (!content_type?.includes("text/html")) {
//           console.error("Content-Type doesnt match ");
//           return;
//         }
//         console.log(data.toString());
//         return data.toString();
//       } catch (e) {
//         console.error("Error while fetch: ", e);
//       }
//     });
//   }

//   async crawl() {
//     this.crawlPage(this.baseURL, this.baseURL);
//   }

//   // crawls a website and recursively crawls links found on that website
//   private async crawlPage(
//     baseURL: string,
//     currentURL: string,
//     pages: Record<string, number> = {}
//   ) {
//     if (!this.addPageVisit(currentURL)) return;
//     try {
//       console.log("reached try block");

//       const base_url: UrlObject = new URL(baseURL);
//       const current_url: UrlObject = new URL(currentURL);

//       if (base_url.hostname !== current_url.hostname) {
//         return pages;
//       }

//       console.log("reached before normalize url block");

//       const normalizd_current_url = normalizeURL(currentURL);

//       console.log("reached after normalize url block");

//       if (normalizd_current_url in pages) {
//         pages[normalizd_current_url]++;

//         return pages;
//       } else {
//         pages[normalizd_current_url] = 1;
//       }
//       console.log("reached before getHTML url block");
//       console.log(`Crawling: ${currentURL}`);

//       const html = await this.getHTML(currentURL);

//       // the exclamation on the end of the below line is to let know ts that i believe the below await get a non null response
//       const nextURLs = getURLsFromHTML(html!, baseURL);

//       const promises = [];
//       for (const nextURL of nextURLs) {
//         promises.push(this.crawlPage(baseURL, nextURL, pages));
//       }

//       await Promise.all(promises);
//       return pages;
//     } catch (e) {
//       console.error("Error while crawling: ", e);
//     }
//   }
// }

// async function crawlSiteAsync() {
//   const cc = new ConcurrentCrawler();

//   try {
//     const resp = await cc.crawl();
//     return resp;
//   } catch (e) {
//     console.error("Error: ", e);
//   }
// }
