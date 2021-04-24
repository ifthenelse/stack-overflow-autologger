import puppeteer from 'puppeteer-core';
import UserAgent from 'user-agents';
import {
    initSession,
    login,
    visitPage,
    getCommunitiesList
} from './src/index.js';

let browser, page;

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
    await visitPage(page, process.env.STACKEXCHANGE_SITES);
    
    await browser.close();
};

initBrowser();