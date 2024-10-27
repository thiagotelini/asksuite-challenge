import 'reflect-metadata'
import Container from "typedi"
import { PratagyStrategy } from "#business/useCases/searchStrategyUseCase/pratagyStrategy"
import { PagesEnum } from "#business/const/pagesToSearch"
import { initializeDependencies } from '#framework/infra/initializerDI'
import { IBrowserServiceToken } from '#business/services/iBrowserService'

describe('Business-UseCases-PratagyStrategy', () => {
  beforeEach(() => {
    Container.reset()
    initializeDependencies()
    Container.set(IBrowserServiceToken, {
      searchPratagyPage: jest.fn().mockResolvedValue([serviceResponse])
    })
  })

  const serviceResponse = {
    name: 'roomTest',
    description: 'descriptionTest',
    price:'R$ 1000,00',
    image: 'file.png'
  }

  const input = {
    page: PagesEnum.pratagy,
    checkin: '2025-02-10',
    checkout: '2025-02-20'
  }

  test('Success: PratagyStrategy', async () => {
    const strategyUseCase = Container.get(PratagyStrategy)
    const response = await strategyUseCase.run(input)
    expect(response).toEqual([serviceResponse])
  })

  test('Failure: Service error', async () => {
    Container.set(IBrowserServiceToken, {
      searchPratagyPage: jest.fn().mockRejectedValue(new Error('Internal Error'))
    })

    const strategyUseCase = Container.get(PratagyStrategy)
    await expect(strategyUseCase.run(input)).rejects.toEqual(new Error('Internal Error'))
  })
})