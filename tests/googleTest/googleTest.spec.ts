import { test } from "@playwright/test";
import { GoogleSearchResultsPage, GoogleSearchPage } from "./pages";
import { GenericTools } from "./tools/genericTools";
import path from "path";

test.describe('Chromium only', () => {
    let page;
    let searchPage;
    let resultsPage;
    let tools;

    test.beforeEach(async ({ browser }) => {
        // Create a new browser context and page for each test
        page = await browser.newPage();
        searchPage = new GoogleSearchPage(page);
        resultsPage = new GoogleSearchResultsPage(page);
        tools = new GenericTools();
    });

    test.afterEach(async () => {
        // Close the browser context after each test
        await page.close();
    });

    test('should have a title', async () => {
        // Define the search term
        const searchTerm = "car";

        // Navigate to the search page and search for the term
        await searchPage.navigateTo();
        await searchPage.search(searchTerm);

        // Get the search results and calculate the average load time
        const searchResults = await resultsPage.getSearchResults();
        const averageLoadTime = await resultsPage.calculateAverageLoadTime();

        // Log the results and average load time to the console
        console.log("Search Results:", searchResults);
        console.log("Average Load Time:", averageLoadTime);

        // Generate a filename based on the current date and save the results to a JSON file
        const date = new Date();
        const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}_${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}${date.getSeconds().toString().padStart(2, '0')}`;
        const filename = `search_results_${formattedDate}.json`;
        const filePath = path.join(__dirname, filename);

        await tools.writeObjectToJsonFile({ results: searchResults, averageLoadTime }, filePath);
    });
});
