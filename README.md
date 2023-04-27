# Stackoverflow autologger 🥇🥇🥇

Script that opens a login session to StackOverflow, simulates user navigation via browser and then logs out.
Best used as scheduled task, e.g. as with [crontab](https://gist.github.com/simov/cdbebe2d65644279db1323042fcf7624).

## Configuration and installation

1. Copy `.env.default` and name it `.env`.

2. Replace in `.env` your StackExchange or StackOverflow credentials

3. Set other options in the .env file (options TBD)

4. Run the code
    ```shell script
    npm install
    npm run start
    ```
    or
    ```shell script
    yarn
    yarn start
    ```

That's it!
