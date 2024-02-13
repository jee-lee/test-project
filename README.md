# Protecht Test Demo

Welcome to the Protecht Test Demo project.
This is a project that runs API and UI tests against Protecht's sandbox environment.
The project is stood up by a couple frameworks: The API tests are built with [Mocha](https://mochajs.org/)/[Chai](https://www.chaijs.com/),
while the UI tests are built with [Playwright](https://playwright.dev/).

## Setup

This is a node project that was built with the current LTS version at the time of writing (February 12 2024) which is
version 20.11.0. Please install node v20.11.0 and yarn before setting up the project.

You can install the packages with `yarn install` and get started with testing!

## Running the Tests

There are several ways to execute the tests:

* `yarn run test:api` This runs Mocha and the tests found in `tests/api`
* `yarn run test:ui` This runs Playwright and the tests found in `tests/ui`
* `yarn run test` This runs both tests.

## Reports

The reports are generated upon completion of test execution. They are located in the `/reports` directory. Separated further by
`/api` and `/ui`.
