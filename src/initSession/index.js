import puppeteer from 'puppeteer-core';

const initSession = async () => {
    return await puppeteer.launch({
        headless: process.env.HEADLESS,
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH
    });
};

export default initSession;