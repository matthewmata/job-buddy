const puppeteer = require("puppeteer");

const indeedWebScraper = async (url) => {
  // browser set up
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(url);

  const allPosts = [];
  let pageNumber = 1;
  let pageNextExists = true;

  // loops through each page job posts
  while (true) {
    await page.waitForSelector("#mosaic-jobResults", { timeout: 10_000 });
    // gets post info
    const pagePosts = await page.evaluate(() => {
      const posts = document.querySelectorAll(".job_seen_beacon");
      return Array.from(posts).map((post) => {
        const title = post.querySelector("span").innerText ?? "n/a";
        const companyName =
          post.querySelector(".companyName").innerText ?? "n/a";
        const companyLocation =
          post.querySelector(".companyLocation").innerText ?? "n/a";
        const url = post.querySelector(".jobTitle > a").href ?? "n/a";
        const salary =
          post.querySelector(".salary-snippet-container")?.innerText ?? "n/a";
        const description = post.querySelector(".job-snippet").innerText;

        return {
          title,
          companyName,
          companyLocation,
          url,
          salary,
          description,
          date: new Date().toString(),
        };
      });
    });

    // adds posts
    allPosts.push(...pagePosts);
    // checks if we are on last page
    pageNextExists = await page.evaluate(() => {
      return document.querySelector('[data-testid="pagination-page-next"]');
    });

    pageNumber++;
    // moves to next page if exists
    if (pageNextExists !== null) {
      await Promise.all([
        page.waitForNavigation(),
        page.click(`a[aria-label="${pageNumber}"]`),
      ]);
    } else {
      break;
    }
  }

  await browser.close();
  return allPosts;
};

module.exports = indeedWebScraper;
