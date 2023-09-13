const puppeteer = require("puppeteer");

const indeedWebScraper = async (
  url = "https://www.indeed.com/jobs?q=react+-senior+-sr+-staff+-architect+-Principal+-manager&l=Remote&fromage=1"
) => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  const allPosts = [];
  let pageNumber = 1;
  let pageNextExists = true;
  await page.goto(url);

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
        const description = Array.from(
          post.querySelectorAll(".job-snippet li")
        ).map((p) => p.innerText);

        return {
          title,
          companyName,
          companyLocation,
          url,
          salary,
          description,
        };
      });
    });
    allPosts.push(...pagePosts);
    pageNextExists = await page.evaluate(() => {
      return document.querySelector('[data-testid="pagination-page-next"]');
    });

    pageNumber++;
    if (pageNextExists !== null) {
      await Promise.all([
        page.waitForNavigation(), // The promise resolves after navigation has finished
        page.click(`a[aria-label="${pageNumber}"]`), // Clicking the link will indirectly cause a navigation
      ]);
    } else {
      break;
    }
  }

  await browser.close();
  return allPosts;
};

export default { indeedWebScraper };