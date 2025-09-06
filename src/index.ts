import { argv } from "node:process";
import { crawlSiteAsync } from "./crawl";
import PrintReport from "./report";

async function main() {
  if (argv.length < 3) {
    console.error("Error input no found");
    process.exit(1);
  } else if (argv.length > 3) {
    console.error("Input entered is wrong only enter base url", argv.length);
    process.exit(1);
  } else if (argv.length === 3) {
    const baseURL = argv[2];

    console.log(`starting crawl of ${baseURL}`);

    const start = Date.now();
    const pages = await crawlSiteAsync(baseURL);
    //console.log(pages);
    PrintReport(pages!, baseURL);
    const end = Date.now() - start;
    console.log("It took ", end, "seconds");

    process.exit(0);
  }
}

main();
