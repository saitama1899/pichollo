// const { chromium } = require('playwright-chromium')
const shops = require('../portales')
const Info = require('../models/Info')
// const { delay } = require('./utils')
const { mandarNotificacion } = require('./sendNotifications')

const actualizarDB = async (portal, res, zona, limite) => {
  const info = {
    portal,
    zona,
    limite,
    info: res
  }

  try {
    const buscarInfo = await Info.findOne({ portal: info.portal, zona: info.zona })
    if (buscarInfo) {
      await Info.findByIdAndUpdate(buscarInfo._id, info)
      if (buscarInfo.info < info.info) await mandarNotificacion(info)
    } else {
      const infoToSave = new Info(info)
      await infoToSave.save()
    }
    // console.log({ info })
  } catch (e) { console.error(e) }
}

const checkear = async (zona, limite) => {
  // const browser = await chromium.launch({ headless: false })

  for (const shop of shops) {
    // await delay(2413)
    // const { check, zonas, vendor, url } = shop
    const { vendor } = shop
    // const page = await browser.newPage()

    // await page.waitForTimeout(2580)
    // const zonaUrl = zonas ? zonas[zona] || zona : zona

    // await page.waitForTimeout(2152)
    // await page.goto(url({ zonaUrl, limite }))

    // await page.waitForLoadState()
    // await page.waitForTimeout(2122)
    // const res = await check({ page })
    // await page.close()
    const res = 172
    await actualizarDB(vendor, parseInt(res), zona, limite)
  }

  // await browser.close()
}

module.exports = {
  checkear
}
