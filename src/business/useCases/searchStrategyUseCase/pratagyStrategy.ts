import { Inject, Service } from 'typedi'
import { RoomData } from '#business/interfaces/searchStrategy/searchStrategyDto'
import { PagesEnum, PagesSelectorsData, PagesUrls } from '#business/const/pagesToSearch'
import { SearchStrategyInput } from '#business/interfaces/searchStrategy/searchStrategyDto'
import { IBrowserServiceToken, IBrowserService } from '#business/services/iBrowserService'
import { SearchStrategyBase } from '#business/useCases/searchStrategyUseCase/searchStrategyBase'
import { logger } from '#framework/utility/logger'

@Service()
export class PratagyStrategy extends SearchStrategyBase {
  @Inject(IBrowserServiceToken)
  private readonly browserService!: IBrowserService

  async run (input: SearchStrategyInput): Promise<RoomData[]> {
    logger.debug('Starting PratagyStrategy')

    logger.debug('Validating date range')
    this.validateDateRange(input)

    logger.debug('Searching data in Pratagy Page')
    const roomsList = await this.browserService.searchPratagyPage({
      baseUrl: PagesUrls[PagesEnum.pratagy],
      checkInDate: input.checkin,
      checkOutDate: input.checkout,
      pageSelectors: PagesSelectorsData[PagesEnum.pratagy]
    })

    logger.debug('Formating roomsList')
    roomsList.map((room) => {
      room.description = this.formatDescriptionString(room.description)
      room.price = this.formatPriceString(room.price)
    })

    logger.info('Returning output with Success')
    return roomsList
  }

  private formatDescriptionString (unformattedDescription: string): string {
    return unformattedDescription?.replace(/\n/g,'') || ''
  }

  private formatPriceString (unformattedPrice: string): string {
    const splittedPrice = unformattedPrice ? unformattedPrice.split('R$') : ''
    const formattedPrice = splittedPrice ? splittedPrice[1].replace('&nbsp;', '') : ''
    return formattedPrice ? `R$ ${formattedPrice}` : 'Tarifas indisponíveis para o período selecionado'
  }
}