import puppeteer from 'puppeteer-core';

const initSession = async () => {
    try {
        return puppeteer.launch({
            headless: process.env.HEADLESS,
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH
        });
    }
    catch(err) {
        throw 'Error initializing Puppeteer session: ', err.message
    }
}

export default initSession;