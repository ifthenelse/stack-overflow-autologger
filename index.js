import puppeteer from 'puppeteer-core';
import {
    initSession

let browser, page;

const initBrowser = async () => {
    browser = await initSession();
    
    const userEmail = process.env.USEREMAIL;
    const userPassword = process.env.USERPASSWORD;
    
    const login = async function () {
        const loginInputFkey = await loginForm.$('input[name="fkey"]')[0];
        const loginInputSsrc = await loginForm.$('input[name="ssrc"]')[0];
        const loginInputEmail = await loginForm.$('input#email');
        const loginInputPassword = await loginForm.$('input#password');
        const loginSubmit = await loginForm.$('button#submit-button');
        await page.type('input#email', userEmail, {delay: 100});
        await page.type('input#password', userPassword, {delay: 100});
        await Promise.all([
            loginSubmit.click(),
            page.waitForNavigation({waitUntil: 'networkidle2'})
        ]).then((response) => {
            console.log('Everything went well');
        }).catch((reason) => {
            throw 'There was an error', reason;
        });
    }
    
    const gotoLogin = async function () {
        await login();
    }
    
    // Load StackOverflow page
    page = await browser.newPage();
    await page.setViewport({width: 1440, height: 900});
    await page.goto('https://stackoverflow.com/users/login?ssrc=head&returnurl=https%3a%2f%2fstackoverflow.com%2f');
    
    // Check if page has been loaded correctly
    if (!page) {
        throw ('Page not loaded because error');
    }
    
    console.log('Page loaded correctly');
    const loginForm = await page.$('#login-form');
    
    // Check if login form can be found
    if (loginForm) {
        console.log('Login form found');
        await login();
    } else {
        console.log('Login form not found. Logging in manually.')
        await gotoLogin();
    }
    
    await browser.close();
};

initBrowser();