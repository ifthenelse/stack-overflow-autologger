import puppeteer from 'puppeteer-core';

const getCommunitiesList = async (page, timeout = process.env.timeout) => {
    try {
        const linkMenuSel = '.-link.js-site-switcher-button.js-gps-track';
        const linkCommSel = '#your-communities-header h3 a';
        const itemCommSel = '.account-site h2 a';

        // click on menu to open menu
        await page.waitForSelector(linkMenuSel);
        await page.click(linkMenuSel);

        // click on "your communities" link and wait new page to load
        await page.waitForSelector(linkCommSel);
        await Promise.all([
            page.click(linkCommSel),
            page.waitForNavigation()
        ]);

        await page.waitForSelector(itemCommSel);
        return await page.$$eval(itemCommSel, items => items.map(item => ({
            name: '' + item.textContent.trim(),
            url: '' + item.href
        })));
    }
    catch (err) {
        throw `Error while getting communities list: `, err.message
    }
}

export default getCommunitiesList;