export default function PrintReport(
  pages: Record<string, number>,
  baseURL: string
) {
  console.log(`
=============================
  REPORT for ${baseURL}
=============================
`);
  const entries = Object.entries(pages);

  const sortedPages = entries.sort((a, b) => b[1] - a[1]);

  for (const [url, cnt] of sortedPages) {
    console.log(`Found ${cnt} links to ${url}`);
  }
}

// printReport takes a dictionary of pages and prints them
// to the console in a human-friendly way
// export default function PrintReport(
//   pages: Record<string, number>,
//   baseURL: string
// ) {
//   console.log("=============================");
//   console.log("REPORT for " + baseURL);
//   console.log("=============================");
//   const sortedPages = sortPages(pages);
//   for (const sortedPage of sortedPages) {
//     const url = sortedPage[0];
//     const count = sortedPage[1];
//     console.log(`Found ${count} internal links to ${url}`);
//   }
// }

// // sortPages sorts a dictionary of pages
// // into a list of tuples (url, count)
// // with the highest counts first in the list
// export function sortPages(pages: Record<string, number>) {
//   // 2D array where the
//   // inner array: [ url, count ]
//   const pagesArr = Object.entries(pages);
//   pagesArr.sort((pageA, pageB) => {
//     if (pageB[1] === pageA[1]) {
//       return pageA[0].localeCompare(pageB[0]);
//     }
//     return pageB[1] - pageA[1];
//   });
//   return pagesArr;
// }
