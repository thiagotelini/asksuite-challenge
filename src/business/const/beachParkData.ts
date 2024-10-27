export const beachParkData = {
  baseUrl: 'https://beachpark.letsbook.com.br/reserva/selecao-de-hotel?numeroAdultos=1&codigoCidade=AQZ&codigoHotel=15',
  pageSelectors: {
    htmlDefaultStructure: 'div.room-list > span',
    name: 'div.room-option > div.room-infos > div.room-infos-guests-block > div.room-option-title > h3 > span',
    description: 'div.room-option > div.room-infos > div.room-infos-guests-block > div.room-option-title > p',
    price: 'div.room-option > div.room-infos > div.room-rates-wrapper > div.room-rates-price > div.daily-price > p.daily-price--total > strong',
    image: 'div.room-option > div.carousel-wrapper > div > span > div.q-carousel > div.q-carousel__slides-container > div > div.q-carousel__slide'
  }
}