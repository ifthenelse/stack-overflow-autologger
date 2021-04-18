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
    await page.setViewport({width: 1440, height: 900});

    // Visit StackExchange login
    await visitPage(page, 'https://stackoverflow.com/users/login?ssrc=head&returnurl=https%3a%2f%2fstackoverflow.com%2f');
    
    // Check if page has been loaded correctly
    if (!page) {
        throw ('Page not loaded because error');
    }
    
    console.log('Page loaded correctly');
    await login(page);
    
    await browser.close();
};

initBrowser();