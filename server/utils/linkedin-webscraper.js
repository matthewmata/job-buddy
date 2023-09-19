const puppeteer = require("puppeteer");

const linkedinWebScraper = async (url) => {
  // browser set up
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({ path: "testresult.png", fullPage: true });
  await browser.close();
  return allPosts;
};

linkedinWebScraper(
  "https://www.linkedin.com/jobs/search/?currentJobId=3724494736&distance=25&f_TPR=r86400&f_WT=2&geoId=103644278&keywords=react%20developer%20-sr%20-senior%20-C%23%20-staff&origin=JOB_SEARCH_PAGE_JOB_FILTER&refresh=true"
);

module.exports = linkedinWebScraper;