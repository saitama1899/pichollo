const { chromium } = require('playwright-chromium')
const shops = require('../portales')
const Info = require('../models/Info')
const { delay, between } = require('./utils')
const { mandarNotificacion } = require('./sendNotifications')

const actualizarDB = async (portal, res, zona, limite) => {
  const info = {
    portal,
    zona,
    limite,
    info: res
  }
  console.log(info)
  try {
    const buscarInfo = await Info.findOne({ portal: info.portal, zona: info.zona })
    if (buscarInfo) {
      await Info.findByIdAndUpdate(buscarInfo._id, info)
      console.log('Registro actualizado en la BD')
      if (buscarInfo.info < info.info) await mandarNotificacion(info)
    } else {
      const infoToSave = new Info(info)
      await infoToSave.save()
      console.log('Nuevo registro guardado en la BD')
    }
  } catch (e) { console.error(e) }
}

const checkear = async (zona, limite) => {
  console.log('Inicio checkeo')
  const browser = await chromium.launch({ headless: true })

  for (const shop of shops) {
    console.log('Inicio checkeo tienda')
    await delay(between(2000, 4000))
    const { check, zonas, vendor, url } = shop
    const page = await browser.newPage()

    await page.waitForTimeout(between(2000, 4000))
    const zonaUrl = zonas ? zonas[zona] || zona : zona

    await page.waitForTimeout(between(2000, 4000))
    await page.goto(url({ zonaUrl, limite }))

    await page.waitForLoadState()
    await page.waitForTimeout(between(2000, 4000))
    const res = await check({ page })
    await page.close()
    await actualizarDB(vendor, parseInt(res), zona, limite)
    console.log('Fin checkeo tienda')
  }

  await browser.close()
  console.log('Fin checkeo')
}
module.exports = {
  checkear
}
