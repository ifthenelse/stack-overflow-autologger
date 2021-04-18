import puppeteer from 'puppeteer-core';

const login = async (page) => {
    const loginForm = await page.$('#login-form');
    
    // Check if login form can be found
    if (loginForm) {
        console.log('Login form found');
        await login(page);
    } else {
        console.log('Login form not found. Logging in manually.')
    }

    const userEmail = process.env.USEREMAIL;
    const userPassword = process.env.USERPASSWORD;

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
};

export default login;