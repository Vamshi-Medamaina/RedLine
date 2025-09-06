import { describe, expect, test } from "vitest";
import { normalizeURL, getURLsFromHTML } from "src/crawl";

test("check URLs", () => {
  expect(normalizeURL("https://blog.boot.dev/path/")).toBe(
    "blog.boot.dev/path"
  );

  expect(normalizeURL("https://blog.boot.dev/path")).toBe("blog.boot.dev/path");

  expect(normalizeURL("http://blog.boot.dev/path/")).toBe("blog.boot.dev/path");
  expect(normalizeURL("http://blog.boot.dev/path")).toBe("blog.boot.dev/path");
});

describe("To test the url fetching funtion", () => {
  test("absoluteURL", () => {
    const inputHTML = `<a href="https://example.com/path1">Link1</a>`;
    const baseURL = "https://example.com";
    expect(getURLsFromHTML(inputHTML, baseURL)).toEqual([
      "https://example.com/path1",
    ]);
  });

  test("connects relative urls", () => {
    const inputHTML = `<a href="/about">About</a>`;
    const baseURL = "https://example.com";

    expect(getURLsFromHTML(inputHTML, baseURL)).toEqual([
      "https://example.com/about",
    ]);
  });

  test("find multiple a tags", () => {
    const inputHTML = `
      <a href="/one">One</a>
      <a href="https://other.com/two">Two</a>
    `;
    const baseURL = "https://example.com";

    expect(getURLsFromHTML(inputHTML, baseURL)).toEqual([
      "https://example.com/one",
      "https://other.com/two",
    ]);
  });

  test("return epty array when no a tags", () => {
    const baseHTML = `<p>This is a p tag</p>`;
    const baseURL = "https://expample.com";

    expect(getURLsFromHTML(baseHTML, baseURL)).toEqual([]);
  });
});
