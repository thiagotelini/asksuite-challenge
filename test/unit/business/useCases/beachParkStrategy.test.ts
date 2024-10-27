import 'reflect-metadata'
import Container from "typedi"
import { BeachParkStrategy } from "#business/useCases/searchStrategyUseCase/beachParkStrategy"
import { PagesEnum } from "#business/const/pagesToSearch"
import { initializeDependencies } from '#framework/infra/initializerDI'
import { IBrowserServiceToken } from '#business/services/iBrowserService'

describe('Business-UseCases-BeachParkStrategy', () => {
  beforeEach(() => {
    Container.reset()
    initializeDependencies()
    Container.set(IBrowserServiceToken, {
      searchBeachParkPage: jest.fn().mockResolvedValue([serviceResponse])
    })
  })

  const serviceResponse = {
    name: 'roomTest',
    description: 'descriptionTest',
    price:'R$ 1000,00',
    image: 'file.png'
  }

  const input = {
    page: PagesEnum.beachPark,
    checkin: '2025-02-10',
    checkout: '2025-02-20'
  }

  test('Success: BeachParkStrategy', async () => {
    const strategyUseCase = Container.get(BeachParkStrategy)
    const response = await strategyUseCase.run(input)
    expect(response).toEqual([serviceResponse])
  })

  test('Failure: Service error', async () => {
    Container.set(IBrowserServiceToken, {
      searchBeachParkPage: jest.fn().mockRejectedValue(new Error('Internal Error'))
    })

    const strategyUseCase = Container.get(BeachParkStrategy)
    await expect(strategyUseCase.run(input)).rejects.toEqual(new Error('Internal Error'))
  })
})