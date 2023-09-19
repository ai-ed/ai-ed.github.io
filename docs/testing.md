# Testing

### Unit tests

* Run `npm run test:watch` so the [jest](https://jestjs.io/) tests are continuously run. When you make any changes to the files which affect the tests and save, it will immediately show up on the test watch.
* If you only want the tests to be executed once, run `npm run test`

---
### Acceptance testing
* Run `npm run acceptance` so the [cypress](https://www.cypress.io/) tests are run.

For every test there will be a video of what occurred, capturing what happened from when the user goes to the landing page to when the the test has finished.

If the test failed, a screenshot of the website’s appearance at the end of the test will be taken.

To view the screenshot/video for a test,
run `open tests/cypress/[screenshot or video]/[test name]`

If you are developer, be sure to run the tests before creating a pull request.

---