import { Inject, Service } from 'typedi'
import { PagesEnum, PagesSelectorsData, PagesUrls } from '#business/const/pagesToSearch'
import { RoomData } from '#business/interfaces/searchStrategy/searchStrategyDto'
import { SearchStrategyInput } from '#business/interfaces/searchStrategy/searchStrategyDto'
import { SearchStrategyBase } from '#business/useCases/searchStrategyUseCase/searchStrategyBase'
import { IBrowserServiceToken, IBrowserService } from '#business/services/iBrowserService'
import { logger } from '#framework/utility/logger'

@Service()
export class BeachParkStrategy extends SearchStrategyBase {
  @Inject(IBrowserServiceToken)
  private readonly browserService!: IBrowserService

  async run (input: SearchStrategyInput): Promise<RoomData[]> {
    logger.debug('Starting BeachParkStrategy')

    logger.debug('Validating date range')
    this.validateDateRange(input)

    logger.debug('Searching data in BeachPark Page')
    const roomsList = await this.browserService.searchBeachParkPage({
      baseUrl: PagesUrls[PagesEnum.beachPark],
      checkInDate: input.checkin,
      checkOutDate: input.checkout,
      pageSelectors: PagesSelectorsData[PagesEnum.beachPark]
    })

    logger.debug('Formating roomsList')
    roomsList.map((room) => {
      room.image = this.formatImageUrl(room.image)
    })

    logger.info('Returning output with Success')
    return roomsList
  }

  private formatImageUrl (unformattedImage: string): string {
    const splittedImage = unformattedImage?.match(/url\("(.*)"/) || ''
    return splittedImage[1] ? splittedImage[1] : ''
  }
}