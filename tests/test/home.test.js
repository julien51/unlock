const url = require('../helpers/url')

describe('Unlock', () => {
  beforeEach(() => {
    jest.setTimeout(100000)
  })
  it('should display "unlock" text on page', async () => {
    const page = await browser.newPage()
    await page.goto(url('/'))
    await expect(page).toMatch('Unlock')
  })

  it('clicking dashboard takes the user to dashboard page', async () => {
    const dashboardButton = '//button[text() = "Go to Your Dashboard"]'
    const page = await browser.newPage()
    await page.goto(url('/'))
    await page.waitForXPath(dashboardButton)
    const button = (await page.$x(dashboardButton))[0]

    await expect(page).not.toMatch('Creator Dashboard')

    await Promise.all([
      page.waitForNavigation(),
      button.click(),
    ])
    await expect(page).toMatch('Creator Dashboard')
  })
})
