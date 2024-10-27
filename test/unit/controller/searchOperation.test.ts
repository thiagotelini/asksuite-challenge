import 'reflect-metadata'
import Container from "typedi"
import { BeachParkStrategy } from "#business/useCases/searchStrategyUseCase/beachParkStrategy"
import { PagesEnum } from "#business/const/pagesToSearch"
import { SearchOperation } from "#controller/searchOperation/searchOperation"
import { initializeDependencies } from '#framework/infra/initializerDI'
import { PratagyStrategy } from '#business/useCases/searchStrategyUseCase/pratagyStrategy'

describe('Controller-SearchOperation', () => {
  beforeEach(() => {
    Container.reset()
    initializeDependencies()
    Container.set(BeachParkStrategy, {
      run: jest.fn().mockResolvedValueOnce([strategyOutput])
    })
    Container.set(PratagyStrategy, {
      run: jest.fn().mockResolvedValueOnce([strategyOutput])
    })
  })

  const strategyOutput = {
    name: 'roomTest',
    description: 'descriptionTest',
    price:'R$ 1000,00',
    image: 'file.png'
  }

  const beachParkInput = {
    page: PagesEnum.beachPark,
    checkin: '2025-02-10',
    checkout: '2025-02-20'
  }

  const pratagyInput = {
    page: PagesEnum.pratagy,
    checkin: '2025-02-10',
    checkout: '2025-02-20'
  }

  const invalidInput = {
    page: 'FakeHotel',
    checkin: '2025-02-10',
    checkout: '2025-02-20'
  }

  test('Success: BeachParkStrategy', async () => {
    const operation = Container.get(SearchOperation)
    const response = await operation.run(beachParkInput)
    expect(response).toEqual({ roomsList: [strategyOutput] })
  })

  test('Success: PratagyStrategy', async () => {
    const operation = Container.get(SearchOperation)
    const response = await operation.run(pratagyInput)
    expect(response).toEqual({ roomsList: [strategyOutput] })
  })

  test('Failure: Invalid Page', async () => {
    const operation = Container.get(SearchOperation)
    await expect(operation.run(invalidInput)).rejects.toEqual(new Error('Invalid Page to search'))
  })
})