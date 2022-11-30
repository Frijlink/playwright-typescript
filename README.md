# Playwright POC #

### Tools used ###
* [Playwright](https://playwright.dev/docs/api/class-playwright/)
* [Playwright Test](https://playwright.dev/docs/api/class-test/)

## Prerequisites ##

* [Have Node installed on your computer](https://nodejs.org/en/download/package-manager/)

## How do I get set up? ##

* Enter `npm i`, this will install all the necessary dependencies
* Create a `.env` file for all the credentials (in this case just copy pase them from `env.example`)

## How to run the tests ##

* Run all the tests with `npm run test`
* Run specific tests with `npm run test:grep '{name of test case here}'`, e.g. `npm run test:grep 'logging in'
* Run `npx playwright show-report test-results/html-report` to generate a HTML report

### video of test cases ###

for every UI test a video of the test is created. You can edit this (and other) behaviour in `playwright.config.ts`.

For video it is set on `retain-on-failure`, other options are `off`, `on`, and `on-first-retry`.

### Troubleshooting ###

In case Playwright doesn't install the necessary drivers and you get the error `browserType.launch: Executable doesn't exist at {LOCATION}`,
follow the information on the screen:

```
    ╔═════════════════════════════════════════════════════════════════════════╗
    ║ Looks like Playwright Test or Playwright was just installed or updated. ║
    ║ Please run the following command to download new browsers:              ║
    ║                                                                         ║
    ║     npx playwright install                                              ║
    ║                                                                         ║
    ║ <3 Playwright Team                                                      ║
    ╚═════════════════════════════════════════════════════════════════════════╝
```
