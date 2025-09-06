import { JSDOM } from "jsdom";
import pLimit from "p-limit";
import { Url, UrlObject } from "url";

//convert relative urls to absolute url
export function normalizeURL(url: string) {
  const urlObj: UrlObject = new URL(url);

  let fullURL: string = `${urlObj.host}${urlObj.pathname}`;

  if (fullURL.slice(-1) === "/") {
    fullURL = fullURL.slice(0, -1);
  }
  return fullURL;
}

// fetches a tags href links from the html of a url
export function getURLsFromHTML(html: string, root_url: string) {
  let urls: string[] = [];

  // this return an absolute url directly since we provide root url
  const dom = new JSDOM(html);

  const anchors = dom.window.document.querySelectorAll("a");

  for (const a of anchors) {
    let href = a.getAttribute("href");

    if (href) {
      try {
        href = new URL(href, root_url).href;
        urls.push(href);
      } catch (e) {
        console.log(`${(e as Error).message}: ${href}`);
      }
    }
  }

  return urls;
}

// export function getURLsFromHTML(html: string, baseURL: string) {
//   const urls = [];
//   const dom = new JSDOM(html);
//   const anchors = dom.window.document.querySelectorAll("a");

//   for (const anchor of anchors) {
//     let href = anchor.getAttribute("href");
//     if (href) {
//       try {
//         // convert any relative URLs to absolute URLs
//         href = new URL(href, baseURL).href;
//         urls.push(href);
//       } catch (err) {
//         console.log(`${(err as Error).message}: ${href}`);
//       }
//     }
//   }

//   return urls;
// }

class ConcurrentCrawler {
  baseURL!: string;
  pages!: Record<string, number>;
  limit!: <T>(fn: () => Promise<T>) => Promise<T>;

  constructor(baseURL: string, maxConcurrency: number = 5) {
    (this.baseURL = baseURL),
      (this.pages = {}),
      (this.limit = pLimit(maxConcurrency));
  }

  addPageVisit(normalizedURL: string): boolean {
    if (normalizedURL in this.pages) {
      this.pages[normalizedURL]++;
      return false;
    } else {
      this.pages[normalizedURL] = 1;
      return true;
    }
  }

  private async getHTML(url: string) {
    return await this.limit(async () => {
      let response: Response;
      try {
        response = await fetch(url);
      } catch (e) {
        throw new Error(`Got Network error: ${(e as Error).message}`);
      }

      if (response!.status > 399) {
        throw new Error(
          `Got HTTP error: ${response!.status} ${response!.statusText}`
        );
      }
      const content_type = response!.headers.get("content-type");

      if (!content_type || !content_type.includes("text/html")) {
        throw new Error(`Got non-HTML response: ${content_type}`);
      }
      // console.log(data.toString());
      return response.text();
    });
  }

  // crawls a website and recursively crawls links found on that website
  private async crawlPage(currentURL: string) {
    const base_url: UrlObject = new URL(this.baseURL);
    const current_url: UrlObject = new URL(currentURL);
    if (base_url.hostname !== current_url.hostname) {
      return;
    }

    const normalizd_current_url = normalizeURL(currentURL);

    if (!this.addPageVisit(normalizd_current_url)) return;

    console.log(`Crawling: ${currentURL}`);

    let html = "";
    try {
      html = await this.getHTML(currentURL);
    } catch (e) {
      console.error(`${(e as Error).message}`);
      return;
    }

    // the exclamation on the end of the below line is to let know ts that i believe the below await get a non null response
    const nextURLs = getURLsFromHTML(html!, this.baseURL);

    const promises = nextURLs.map((nextURL) => this.crawlPage(nextURL));

    await Promise.all(promises);
  }

  async crawl() {
    await this.crawlPage(this.baseURL);
    return this.pages;
  }
}

export async function crawlSiteAsync(
  baseURL: string,
  maxConcurrency: number = 5
) {
  const cc = new ConcurrentCrawler(baseURL, maxConcurrency);

  try {
    const resp = await cc.crawl();
    return resp;
  } catch (e) {
    console.error("Error: ", e);
  }
}
