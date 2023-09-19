const diceWebScraper = require('./dice-webscraper');
const indeedWebScraper = require('./indeed-webscraper');

// aggregates all web scraped job postings
const webscraperAggregation = async () => {
    const diceData = await diceWebScraper(
      "https://www.dice.com/jobs?q=react%20-sr%20-senior%20-lead%20-architect&location=Remote,%20OR%2097458,%20USA&latitude=43.0059455&longitude=-123.8925908&countryCode=US&locationPrecision=City&adminDistrictCode=OR&radius=30&radiusUnit=mi&page=1&pageSize=20&filters.postedDate=ONE&language=en&eid=S2Q_"
    );
    const indeedData = await indeedWebScraper("https://www.indeed.com/jobs?q=react+-senior+-sr+-staff+-architect+-Principal+-manager&l=Remote&fromage=1");
    
    return [
      ...diceData, 
      ...indeedData
    ];
}

module.exports = webscraperAggregation;