export const pratagyData = {
  baseUrl: 'https://reservas.pratagy.com.br/hotels/HOTEL_OMNI_3958?adults=2&children=0&rooms[]=a2',
  pageSelectors: {
    htmlDefaultStructure: 'main > div > div:nth-of-type(2) > div:nth-of-type(3) > div > div',
    name: 'div:nth-of-type(2) > div:nth-of-type(2) > h1',
    description: 'div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(4) > div',
    price: 'div:nth-of-type(4) > div:nth-of-type(2) > div > div > div > div:nth-of-type(2) > div > div > span > span',
    image: 'div:nth-of-type(2) > div > div > div:nth-of-type(3) > div > div'
  }
}