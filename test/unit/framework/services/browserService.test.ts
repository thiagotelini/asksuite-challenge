import 'reflect-metadata'
import Container from "typedi"
import { initializeDependencies } from '#framework/infra/initializerDI'
import { IBrowserServiceToken } from '#business/services/iBrowserService'
// @ts-ignore
import { stubBrowser, stubPage } from '#test/utility/mocks/puppeteer.mock'

jest.mock('puppeteer', () => ({
  launch() {
    return stubBrowser;
  }
}))

describe('Framework-Services-BrowserService', () => {
  beforeEach(() => {
    Container.reset()
    initializeDependencies()
  })

  const externalResponse = {
    name: 'roomTest',
    description: 'descriptionTest',
    price:'R$ 1000,00',
    image: 'file.png'
  }

  const genericPageInput = {
    baseUrl: 'system.com',
    checkInDate: '2025-02-10',
    checkOutDate: '2025-02-20',
    pageSelectors: {
      name: 'div.name',
      description: 'div.description',
      price: 'div.price',
      image: 'div.image',
      htmlDefaultStructure: '.main'
    }
  }

  test('Success: getBrowser', async () => {
    const service = Container.get(IBrowserServiceToken)
    const response = await service.getBrowser()
    expect(response).toEqual(stubBrowser)
  })

  test('Success: closeBrowser', async () => {
    const service = Container.get(IBrowserServiceToken)
    const response = await service.closeBrowser(stubBrowser)
    expect(response).toBeUndefined()
  })

  test('Success: searchBeachParkPage', async () => {
    jest.spyOn(stubPage, 'evaluate').mockResolvedValueOnce(false).mockResolvedValueOnce(externalResponse)

    const service = Container.get(IBrowserServiceToken)
    const response = await service.searchBeachParkPage(genericPageInput)
    expect(response).toEqual(externalResponse)
  })

  test('Success: validPage', async () => {
    jest.spyOn(stubPage, 'evaluate').mockResolvedValueOnce(false)

    const service = Container.get(IBrowserServiceToken)
    const response = await service.validPage(stubBrowser, 'url.com')
    expect(response).toEqual(stubPage)
  })

  test('Success: searchPratagyPage', async () => {
    jest.spyOn(stubPage, 'evaluate').mockResolvedValueOnce(externalResponse)

    const service = Container.get(IBrowserServiceToken)
    const response = await service.searchPratagyPage(genericPageInput)
    expect(response).toEqual(externalResponse)
  })
})