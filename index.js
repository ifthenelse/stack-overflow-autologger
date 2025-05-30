import UserAgent from 'user-agents';
import {
  initSession,
  login,
  visitPage,
  getCommunitiesList,
  scrapeCommunity,
} from './src/index.js';

let d, browser, page, communities;

const initBrowser = async () => {
  d = new Date();
  console.log(`\
IMPORTANT NOTICE:\
This project is provided 'as is' without any warranty or guarantee of any kind, either expressed or implied. The user assumes all risk associated with the use of this project. The project's contributors shall not be liable for any damages or losses resulting from the use of this project, and **it is intended for educational purposes only**. This project may include third-party open source software that is subject to its own licenses and disclaimers. By using this project, you agree to abide by the terms of the licenses and disclaimers of any included third-party software. If you have any questions or concerns about this project, please do your own research and seek out experts for advice.\
Mind that stack exchange and stack overflow have a strict policy against bots. Any abuse may turn into temporary or permanent ban from the website. For further information please read the Terms of use of stack exchange and stack overflow.\
`);
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
    console.log(`${i}. ${communities[i].name}`);
    await visitPage(page, communities[i].url);
    await scrapeCommunity(page);
  }

  await browser.close();

  d = new Date();
  console.log(`${d.toISOString()} Finish`);
  console.log('----');
};

initBrowser();
