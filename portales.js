module.exports = [
  {
    vendor: 'Fotocasa',
    url: ({ zonaUrl, limite }) => {
      const conGuion = zonaUrl.replaceAll('_', '-')
      return `https://www.fotocasa.es/es/alquiler/viviendas/pene/${conGuion}/l?maxPrice=${limite}&sortType=publicationDate`
    },
    check: async ({ page }) => {
      await page.click('[data-testid="TcfAccept"]')
      const count = await page.textContent('[class="re-SearchTitle-count"]')
      return count
    }
  },
  {
    vendor: 'Habitaclia',
    url: ({ zonaUrl, limite }) => {
      return `https://www.habitaclia.com/alquiler-${zonaUrl}.htm?pmax=${limite}&ordenar=mas_recientes`
    },
    zonas: {
      maresme: 'en-maresme',
      valles_occidental: 'en-valles_occidental', // Etc. para las comarcas
      valles_oriental: 'en-valles_oriental',
      parets_del_valles: 'area-parets'
    },
    check: async ({ page }) => {
      await page.click('[data-testid="TcfAccept"]')
      const result = await page.textContent('[class="list-subtitle f-right"]')
      const count = result.replace(/\D/g, '')
      return count
    }
  }
  // {
  //   vendor: 'Idealista',
  //   url: ({ zonaUrl, limite }) => {
  //     return `https://www.idealista.com/alquiler-viviendas/${zonaUrl}/con-precio-hasta_${limite}/?ordenado-por=fecha-publicacion-desc`
  //   },
  //   zonas: {
  //     maresme: 'barcelona/maresme',
  //     valles_occidental: 'barcelona/valles-occidental',
  //     valles_oriental: 'barcelona/valles-oriental',
  //     montgat: 'montgat-barcelona'
  //   },
  //   check: async ({ page }) => {
  //     // await page.click('[data-testid="TcfAccept"]')
  //     await page.waitForTimeout(2033)
  //     const result = await page.textContent('[class="breadcrumb-info"]')

  //     // const count = result.replace(/\D/g, '')
  //     return result
  //   }
  // }
]

//
