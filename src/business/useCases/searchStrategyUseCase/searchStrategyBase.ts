import { RoomData } from '#business/interfaces/searchStrategy/searchStrategyDto'
import { SearchStrategyInput } from '#business/interfaces/searchStrategy/searchStrategyDto'
import { logger } from '#framework/utility/logger'

export abstract class SearchStrategyBase {
  protected abstract run (input: SearchStrategyInput): Promise<RoomData[]>

  validateDateRange (input: SearchStrategyInput): void {
    const checkin = new Date(input.checkin)
    const checkout = new Date(input.checkout)

    if (checkout < checkin) {
      logger.error('Throwing date validation error')
      throw new Error('Check-in date must be less than check-out date')
    }
  }
}