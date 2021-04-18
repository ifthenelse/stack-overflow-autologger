import puppeteer from 'puppeteer-core';
import {
    initSession,
    login
} from './src/index.js';

let browser, page;

const initBrowser = async () => {
    browser = await initSession();
    
    // Load StackOverflow page
    page = await browser.newPage();
    await page.setViewport({width: 1440, height: 900});
    await page.goto('https://stackoverflow.com/users/login?ssrc=head&returnurl=https%3a%2f%2fstackoverflow.com%2f');
    
    // Check if page has been loaded correctly
    if (!page) {
        throw ('Page not loaded because error');
    }
    
    console.log('Page loaded correctly');
    await login(page);
    
    await browser.close();
};

initBrowser();