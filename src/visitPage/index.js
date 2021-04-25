import puppeteer from 'puppeteer-core';

const visitPage = async (page, url, timeout = process.env.timeout) => {
    try {
        return Promise.all([
            page.goto(url, {
                waitUntil: 'load',
                timeout: timeout
            }),
            page.waitForNavigation()
        ]);
    }
    catch (err) {
        throw `Error while loading the ${url}: `, err.message
    }
}

export default visitPage;