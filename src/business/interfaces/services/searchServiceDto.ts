export interface SearchPageParams {
  baseUrl: string
  checkInDate: string
  checkOutDate: string
  pageSelectors: PageSelectors
}

export interface PageSelectors {
  name: string,
  description: string,
  price: string,
  image: string,
  htmlDefaultStructure?: string
}