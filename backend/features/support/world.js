// features/support/world.js
/*
const { setWorldConstructor } = require("@cucumber/cucumber");

class CustomWorld {
  constructor() {
    this.variable = 0;
  }

  setTo(number) {
    this.variable = number;
  }

  incrementBy(number) {
    this.variable += number;
  }
}

setWorldConstructor(CustomWorld);



const { setWorldConstructor, World } = require('@cucumber/cucumber')
const seleniumWebdriver = require('selenium-webdriver')

class CustomWorld extends World {
    driver = new seleniumWebdriver.Builder()
        .forBrowser('firefox')
        .build()

    constructor(options) {
        // needed so `attach`, `log` and `parameters` are properly set
        super(options)
    }

    // Returns a promise that resolves to the element
    async waitForElement(locator) {
        const condition = seleniumWebdriver.until.elementLocated(locator)
        return await this.driver.wait(condition)
    }
}

setWorldConstructor(CustomWorld)
*/
