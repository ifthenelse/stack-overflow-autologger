import puppeteer from 'puppeteer-core';
import {
    initSession,
    login,
    visitPage
} from './src/index.js';

let browser, page;

const initBrowser = async () => {
    // Create browser session
    browser = await initSession();

    // Create page
    page = await browser.newPage();

    // Visit StackExchange login page
    await visitPage(page, process.env.STACKEXCHANGE_LOGIN);
    
    // Enter login credentials
    await login(page);

    // Go to StackExchange sites
    await visitPage(page, process.env.STACKEXCHANGE_SITES);
    
    await browser.close();
};

initBrowser();