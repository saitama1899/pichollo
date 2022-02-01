const { chromium } = require('playwright-chromium')

const shops = require('./portales')

const delay = (time) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

const checkear = async function (zona, limite) {
  const browser = await chromium.launch({ headless: false })

  for (const shop of shops) {
    await delay(2013)
    const { check, zonas, vendor, url } = shop
    const page = await browser.newPage()

    await page.waitForTimeout(2000)
    const zonaUrl = zonas ? zonas[zona] || zona : zona

    await page.waitForTimeout(2122)
    await page.goto(url({ zonaUrl, limite }))

    await page.waitForLoadState()
    await page.waitForTimeout(2122)
    const response = await check({ page })

    console.log(vendor + ': ' + response)

    await page.close()
  }

  await browser.close()
}

checkear('montgat', 900)
