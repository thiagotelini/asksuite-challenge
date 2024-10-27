import { RoomData } from '#business/interfaces/searchStrategy/searchStrategyDto'
import { SearchPageParams } from '#business/interfaces/services/searchServiceDto'
import { Browser, Page } from 'puppeteer'
import { Token } from 'typedi'

export const IBrowserServiceToken = new Token<IBrowserService>('IBrowserService')

export interface IBrowserService {
  getBrowser (): Promise<Browser>
  closeBrowser (browser: Browser): Promise<void>
  searchBeachParkPage (params: SearchPageParams): Promise<RoomData[]>
  validPage (browser: Browser, pageUrl: string): Promise<Page | null>
  searchPratagyPage (params: SearchPageParams): Promise<RoomData[]>
}