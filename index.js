import puppeteer from 'puppeteer-core';
import UserAgent from 'user-agents';
import {
    initSession,
    login,
    visitPage,
    getCommunitiesList,
    scrapeCommunity
} from './src/index.js';

let d, browser, page, communities;

const initBrowser = async () => {
    // Create browser session
    browser = await initSession();

    // Create page
    page = await browser.newPage();

    const ua = new UserAgent();
    page.setUserAgent(ua.data.toString());
    console.log('Generated User Agent: ', ua.toString());

    // Visit StackExchange login page
    await visitPage(page, process.env.STACKEXCHANGE_LOGIN);

    // Enter login credentials
    await login(page);

    // Go to StackExchange sites
    communities = await getCommunitiesList(page);

    await browser.close();
    console.log(`Got ${communities.length} communities`);

    // go to each Community user's profile page
    for (let i = 0; i < communities.length; i++) {
        console.log(`${i}. ${communities[i].name}`)
        await visitPage(page, communities[i].url);
        await scrapeCommunity(page);
    }

    await browser.close();
    console.log('----');
};

initBrowser();