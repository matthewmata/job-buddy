const puppeteer = require("puppeteer");

const linkedinWebScraper = async (url) => {
  // browser set up
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(url);

  const allPosts = [];

  await page.waitForSelector(".jobs-search__results-list", {
    timeout: 10_000,
  });
  // gets post info
  const pagePosts = await page.evaluate(() => {
    const posts = document.querySelectorAll(".jobs-search__results-list > li");
    return Array.from(posts).map((post) => {
      const title =
        post.querySelector(".base-search-card__title").innerText ?? "n/a";
      const companyName =
        post.querySelector(".base-search-card__subtitle").innerText ?? "n/a";
      const companyLocation =
        post.querySelector(".job-search-card__location").innerText ?? "n/a";
      const url = post.querySelector("a").href ?? "n/a";
      const salary =
        post.querySelector(".job-search-card__salary-info")?.innerText ?? "n/a";
      return {
        title,
        companyName,
        companyLocation,
        url,
        salary,
        description: "n/a",
        date: new Date().toString(),
      };
    });
  });

  // adds posts
  allPosts.push(...pagePosts);
  
  await browser.close();
  return allPosts;
};

module.exports = linkedinWebScraper;
