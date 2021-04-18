import puppeteer from 'puppeteer-core';

const visitPage = async (page, url) => {
    try {
        page.goto(url, {
            timeout: 0
        })
    }
    catch(err) {
        throw `Error while loading the ${url}: `, err.message
    }
}

export default visitPage;