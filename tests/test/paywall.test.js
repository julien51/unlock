const url = require('../helpers/url')
const waitForFrame = require('../helpers/frame')

describe('Paywall', () => {
  let page
  let demo
  beforeEach(async (done) => {
    jest.setTimeout(100000)
    const createLockButtonXpath = '//button[text() = "Create Lock"]'
    const submitButtonXpath = '//button[text() = "Submit"]'
    page = await browser.newPage()
    await page.goto(url('/dashboard'))
    await page.waitForXPath(createLockButtonXpath)
    const createLockButton = (await page.$x(createLockButtonXpath))[0]
    await Promise.all([
      page.waitForXPath(submitButtonXpath),
      createLockButton.click(),
    ])
    const submitButton = (await page.$x(submitButtonXpath))[0]
    await submitButton.click()
    await page.waitForSelector('button[title="Show embed code"]')
    await page.evaluate(() => {
      const previewButton = document.querySelector('button[title="Show embed code"]')
      previewButton.click()
    })
    await page.waitFor(1000) // make sure the lock address is updated
    await page.waitForSelector('a[title="Preview lock"]')
    const demoLink = await page.$('a[title="Preview lock"]')
    await demoLink.click()
    demo = await browser.waitForTarget(target => target.url().match(/demo/))
    demo = await demo.page()
    done()
  })
  it('should load the paywall if a lock is present', async () => {
    const paywall = await waitForFrame(demo, /paywall/)
    expect(await paywall.content()).toMatch('You have reached your limit of free articles')
  })
})
