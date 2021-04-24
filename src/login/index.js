import puppeteer from 'puppeteer-core';

const defaultProps = {
    userEmail: process.env.USEREMAIL,
    userPassword: process.env.USERPASSWORD,
}

const login = async (page, props = {}) => {
    props = Object.assign({}, defaultProps, props);

    try {
        const inputUserSelector = 'input#email';
        const inputPassowrdSelector = 'input#password';
        const inputSubmit = 'button#submit-button';
        const nocaptchaSelector = '#nocaptcha-form';

        const userEmail = props.userEmail;
        const userPassword = props.userPassword;

        await page.type(inputUserSelector, userEmail, { delay: 100 });
        await page.type(inputPassowrdSelector, userPassword, { delay: 100 });

        await Promise.all([
            page.click(inputSubmit),
            page.waitForNavigation({ waitUntil: 'networkidle2' })
        ]);

        if (page.$(nocaptchaSelector).length) {
            throw 'Stackexchange asks for bot verification - please start another session'
        }
        console.log('Successfully logged in to StackExchange');
    }
    catch (err) {
        throw 'Couldn\'t complete login: ', err.message
    }
};

export default login;