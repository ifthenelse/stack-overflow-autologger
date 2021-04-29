import UserAgent from 'user-agents';
import {
    initSession,
    login,
    visitPage,
    getCommunitiesList,
    scrapeCommunity
} from './src/index.js';

let d, browser, page, communities;

const initBrowser = async () => {
    d = new Date();
    console.log(`${d.toISOString()} Start`);
    // Create browser session
    browser = await initSession();

    // Create page
    page = await browser.newPage();

    const ua = new UserAgent();
    page.setUserAgent(ua.data.toString());
    page.setDefaultNavigationTimeout(process.env.TIMEOUT);
    console.log('Generated User Agent: ', ua.toString());

    // Visit StackExchange login page
    await visitPage(page, process.env.STACKEXCHANGE_LOGIN);

    // Enter login credentials
    await login(page);

    // Go to StackExchange sites
    communities = await getCommunitiesList(page);

    if (!(communities && communities.length)) {
        await browser.close();

        d = new Date();
        console.log(`${d.toISOString()} Finish`);
        console.log('----');
    }

    console.log(`Got ${communities.length} communities`);

    // go to each Community user's profile page
    for (let i = 0; i < communities.length; i++) {
        console.log(`${i}. ${communities[i].name}`)
        await visitPage(page, communities[i].url);
        await scrapeCommunity(page);
    }

    await browser.close();

    d = new Date();
    console.log(`${d.toISOString()} Finish`);
    console.log('----');
};

initBrowser();