const puppeteer = require("puppeteer");

const scrape = async (url) => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  const pageNumber = 0;
  await page.goto(url + pageNumber);

  const pagePosts = await page.evaluate(() => {
    
    const posts = document.querySelectorAll(".job_seen_beacon");

    return Array.from(posts).map((post) => {
      const title = post.querySelector("span").innerText ?? "n/a";
      const companyName = post.querySelector(".companyName").innerText ?? "n/a";
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
  console.log(pagePosts);
  await browser.close();
};

scrape(
  "https://www.indeed.com/jobs?q=react+-senior+-sr+-staff+-architect+-Principal+-manager&l=Remote&fromage=1&start="
);
