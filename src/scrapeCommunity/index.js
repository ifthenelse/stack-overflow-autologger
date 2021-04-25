import puppeteer from 'puppeteer-core';
import { visitPage } from '../index.js';

const scrapeCommunity = async (page) => {
    try {
        const linkHPSel = '#nav-questions';
        const linkFirstQuestionSel = '.question-hyperlink';
        const btnVoteUpSel = '.votecell .js-vote-up-btn';
        const contentVoteSel = '.js-vote-count';

        console.log(`\t${page.url()}`);

        // go to the Community home page
        await page.waitForSelector(linkHPSel);
        await Promise.all([
            page.$eval(linkHPSel, linkHP => linkHP.click()),
            page.waitForNavigation()
        ]).catch(err => {
            throw '\tError on getting to the home page:', err.message;
        });

        console.log(`\t${page.url()}`);

        // click on the first question
        await page.waitForSelector(linkFirstQuestionSel);
        await Promise.all([
            page.$eval(linkFirstQuestionSel, linkQuestion => linkQuestion.click()),
            page.waitForNavigation()
        ]).catch(err => {
            throw '\tError on getting to the first question:', err.message;
        });

        console.log(`\t${page.url()}`);

        // vote it up
        await page.waitForSelector(btnVoteUpSel);
        await page.waitForSelector(contentVoteSel);
        console.log(`\tVotes before vlick: ${await page.$eval(contentVoteSel, contentVote => contentVote.textContent)}`);
        await page.$eval(btnVoteUpSel, btnVoteUp => btnVoteUp.click());
        console.log(`\tVotes after click: ${await page.$eval(contentVoteSel, contentVote => contentVote.textContent)}`);

        // go back three times
        for (let i = 0; i < 3; i += 1) {
            await Promise.all([
                page.goBack(),
                page.waitForNavigation()
            ]);
        }

        console.log(`\t${page.url()}`);
    }
    catch (err) {
        return 'Error while scraping community: ', err.message;
    }
}

export default scrapeCommunity;