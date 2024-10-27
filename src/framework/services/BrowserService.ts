import { Service } from 'typedi'
import puppeteer, { Browser, Page, SerializableOrJSHandle } from 'puppeteer'

import { RoomData } from '#business/interfaces/searchStrategy/searchStrategyDto'
import { SearchPageParams } from '#business/interfaces/services/searchServiceDto'
import { IBrowserServiceToken } from '#business/services/iBrowserService'
import { logger } from '#framework/utility/logger'

@Service({ id: IBrowserServiceToken })
export class BrowserService {
  async getBrowser (): Promise<Browser> {
    return puppeteer.launch()
  }

  async closeBrowser (browser: Browser): Promise<void> {
    if (!browser) {
      return
    }
    return browser.close()
  }

  async searchBeachParkPage (params: SearchPageParams): Promise<RoomData[]> {
    try {
      const browser = await this.getBrowser()
      const pageUrl = `${params.baseUrl}&checkin=${params.checkInDate}&checkout=${params.checkOutDate}`
      const browserTab = await this.validPage(browser, pageUrl)

      if(!browserTab) {
        logger.error('Throwing page blocked access error')
        throw new Error('Page blocked access because it identified automation use')
      }

      await browserTab.waitForSelector('[class="room-option-wrapper"]', {
        visible: true
      })

      const roomsList = await browserTab.evaluate((selectors) => {
        const validRooms = []

        const roomsArray = document.querySelector(`${selectors.htmlDefaultStructure}`)
        const roomsArrayLength = roomsArray?.childElementCount || 0

        for (let i = 0; i < roomsArrayLength; i++) {
          const divDepth = i < 1 ? 'div' : `div:nth-of-type(${i+1})`

          const name = document.querySelector(`${selectors.htmlDefaultStructure} > ${divDepth} > ${selectors.name}`)?.innerHTML || ''
          const description = document.querySelector(`${selectors.htmlDefaultStructure} > ${divDepth} > ${selectors.description}`)?.innerHTML || ''
          const price = document.querySelector(`${selectors.htmlDefaultStructure} > ${divDepth} > ${selectors.price}`)?.textContent || ''
          const image = document.querySelector(`${selectors.htmlDefaultStructure} > ${divDepth} > ${selectors.image}`)?.getAttribute('style') || ''

          validRooms.push({name, description, price, image})
        }

        return validRooms
      }, params.pageSelectors as unknown as SerializableOrJSHandle)

      await this.closeBrowser(browser)
      return roomsList
    } catch (error) {
      logger.error('Unexpected error: %s', error)
      throw new Error(`${error}`)
    }
  }

  private async validPage (browser: Browser, pageUrl: string): Promise<Page | null> {
    const maxRetries = 3
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const browserTab = await browser.newPage()
      await browserTab.goto(pageUrl, { waitUntil: 'networkidle2' })
      await browserTab.waitForSelector('.shield-wrapper')

      const hasBotAlertModal = await browserTab.evaluate(() => {
        const botAlert = document.querySelector('div.shield-wrapper')
        const botAlertVisibility = botAlert?.getBoundingClientRect()
        return botAlertVisibility ? (botAlertVisibility.width > 0 && botAlertVisibility.height > 0) : true
      })

      if (hasBotAlertModal) {
        logger.warn('botAlert founded -> attempt number %s', attempt)
      } else {
        return browserTab
      }
    }

    return null
  }

  async searchPratagyPage (params: SearchPageParams): Promise<RoomData[]> {
    try {
      const browser = await this.getBrowser()
      const browserTab = await browser.newPage()
      const pageUrl = `${params.baseUrl}&startDate=${params.checkInDate}&endDate=${params.checkOutDate}`
      await browserTab.goto(pageUrl, { waitUntil: 'networkidle0' })
  
      const roomsList = await browserTab.evaluate((selectors) => {
        const validRooms = []
  
        const roomsArray = document.querySelector(`${selectors.htmlDefaultStructure}`)
        const roomsArrayLength = roomsArray?.childElementCount || 0
  
        for (let i = 0; i < roomsArrayLength; i++) {
          const divDepth = i < 1 ? 'div' : `div:nth-of-type(${i+1})`
  
          const name = document.querySelector(`${selectors.htmlDefaultStructure} > ${divDepth} > ${selectors.name}`)?.innerHTML || ''
          const description = document.querySelector(`${selectors.htmlDefaultStructure} > ${divDepth} > ${selectors.description}`)?.innerHTML || ''
  
          const priceSelectorResponse = document.querySelectorAll(`${selectors.htmlDefaultStructure} > ${divDepth} > ${selectors.price}`)
          const priceSpanArray = [...priceSelectorResponse]
          let price = ''
          for (const priceSpan of priceSpanArray) {
            price = price + priceSpan.innerHTML
          }
  
          const image = `${document.querySelector(`${selectors.htmlDefaultStructure} > ${divDepth} > ${selectors.image}`)?.attributes['0'].value}`
  
          validRooms.push({name, description, price, image})
        }
  
        return validRooms
      }, params.pageSelectors as unknown as SerializableOrJSHandle)
  
      await this.closeBrowser(browser)
      return roomsList
    } catch (error) {
      logger.error('Unexpected error: %s', error)
      throw new Error(`${error}`)
    }
  }
}
