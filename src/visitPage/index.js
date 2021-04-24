import puppeteer from 'puppeteer-core';

const visitPage = async (page, url, timeout = process.env.timeout) => {
    try {
        await page.goto(url, {
            timeout: timeout
        });
        page.waitForNavigation();
        return page;
    }
    catch(err) {
        throw `Error while loading the ${url}: `, err.message
    }
}

export default visitPage;