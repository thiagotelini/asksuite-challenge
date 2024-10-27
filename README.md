<div align="center"><img src="assets/Asksuite.png"></div>

# Templates
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Puppeteer](https://img.shields.io/badge/Puppeteer-white.svg?style=for-the-badge&logo=Puppeteer&logoColor=black)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

## Como usar?
Para instalar, clone este repositório, adicione um .env seguindo o .env.example e execute:
```bash
npm install
```
Para executar o código:
```bash
npm run dev
```
Para executar a verificação de lint:
```bash
npm run lint
```
Para executar o ciclo de testes:
```bash
npm run test
```

## Documentação da API:
### Health check:
```bash
Request route: GET/

Response body: { "data": "It Works!" }
```
### Search:
```bash
Request route: POST/search

Request body: {
  "page": "BEACH_PARK", // PRATAGY or BEACH_PARK
  "checkin": "2025-02-15", // Check-in date
  "checkout": "2025-02-27" // Check-out date
}

Response body: {
  "data": {
    "roomsList": [
      {
        "name": "Suíte Premium",
        "description": "Ar Condicionado, Frigobar, Serviço de Quarto 24 horas, TV a Cabo",
        "price": "R$ 1500,00",
        "image": "https://site.com/image.png"
      },
      {
        "name": "Suíte Econômica",
        "description": "Ar Condicionado, Frigobar",
        "price": "R$ 800,00",
        "image": "https://site.com/image.png"
      }
    ]
  }
}
```
## Utils
### Link para [Documentação externa](https://foggy-drug-9b5.notion.site/AskSuite-Challenge-Docs-129d2b14ba7a805f8984db49c0aa4e06)
### Desafio realizado com base no [Repositório modelo](https://bitbucket.org/paveisistemas-ondemand/asksuite-test-dev/src/master/)
