import { Inject, Service } from 'typedi'
import { PagesEnum } from '#business/const/pagesToSearch'
import { SearchOperationInput } from '#business/interfaces/searchOperation/searchOperationInput'
import { SearchOperationOutput } from '#business/interfaces/searchOperation/searchOperationOutput'
import { RoomData } from '#business/interfaces/searchStrategy/searchStrategyDto'
import { BeachParkStrategy } from '#business/useCases/searchStrategyUseCase/beachParkStrategy'
import { PratagyStrategy } from '#business/useCases/searchStrategyUseCase/pratagyStrategy'
import { logger } from '#framework/utility/logger'

@Service()
export class SearchOperation {
  @Inject()
  private readonly beachParkStrategy!: BeachParkStrategy

  @Inject()
  private readonly pratagyStrategy!: PratagyStrategy

  async run (input: SearchOperationInput): Promise<SearchOperationOutput> {
    logger.debug('Start Search Operation with input :: %s', input)
    return { roomsList: await this.generateStrategyFactory(input) }
  }

  private async generateStrategyFactory (input: SearchOperationInput): Promise<RoomData[]> {
    const strategyInput = {
      checkin: input.checkin,
      checkout: input.checkout
    }

    switch (input.page) {
      case PagesEnum.beachPark:
        return this.beachParkStrategy.run(strategyInput)
      case PagesEnum.pratagy:
        return this.pratagyStrategy.run(strategyInput)
      default:
        logger.error('Throwing Invalid Page error')
        throw new Error('Invalid Page to search')
    }
  }
}