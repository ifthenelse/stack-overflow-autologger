import puppeteer from 'puppeteer-core';

const defaultProps = {
    timeout: parseInt(process.env.TIMEOUT, 10),
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    width: parseInt(process.env.WIDTH, 10),
    height: parseInt(process.env.HEIGHT, 10),
    headless: process.env.HEADLESS === "true" ? true : false
}

const initSession = async (props = {}) => {
    props = Object.assign({}, defaultProps, props);

    try {
        return puppeteer.launch({
            headless: props.headless,
            executablePath: props.executablePath,
            defaultViewport: {
                width: props.width,
                height: props.height
            },
            timeout: props.timeout
        });
    }
    catch(err) {
        throw 'Error initializing Puppeteer session: ', err.message
    }
}

export default initSession;