const diceWebScraper = require("./dice-webscraper");
const linkedinWebScraper = require("./linkedin-webscraper");

// aggregates all web scraped job postings
const webscraperAggregation = async () => {
  const diceData = await diceWebScraper(
    "https://www.dice.com/jobs?q=react%20-sr%20-senior%20-lead%20-architect&location=Remote,%20OR%2097458,%20USA&latitude=43.0059455&longitude=-123.8925908&countryCode=US&locationPrecision=City&adminDistrictCode=OR&radius=30&radiusUnit=mi&page=1&pageSize=20&filters.postedDate=ONE&language=en&eid=S2Q_"
  );

  const linkedInData = await linkedinWebScraper(
    "https://www.linkedin.com/jobs/search/?currentJobId=3679519361&f_TPR=r86400&keywords=react%20developer%20-sr%20-senior%20-C%23%20-staff&origin=JOB_SEARCH_PAGE_JOB_FILTER&refresh=true",
    "https://www.linkedin.com/jobs/search/?distance=25&f_TPR=r86400&f_WT=2&geoId=103644278&keywords=react%20developer%20-sr%20-senior%20-C%23%20-staff&origin=JOB_SEARCH_PAGE_JOB_FILTER&refresh=true&start=75"
  );

  return [...diceData, ...linkedInData];
};

module.exports = webscraperAggregation;
