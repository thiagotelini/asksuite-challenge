import { beachParkData } from '#business/const/beachParkData'
import { pratagyData } from '#business/const/pratagyData'

export enum PagesEnum {
  pratagy = 'PRATAGY',
  beachPark = 'BEACH_PARK'
}

export const PagesUrls = {
  'PRATAGY': pratagyData.baseUrl,
  'BEACH_PARK': beachParkData.baseUrl
}

export const PagesSelectorsData = {
  'PRATAGY': pratagyData.pageSelectors,
  'BEACH_PARK': beachParkData.pageSelectors
}