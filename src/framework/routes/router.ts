import express from 'express'
import Container from 'typedi'
import { Router, Request, Response } from 'express'
import { SearchOperation } from '#controller/searchOperation/searchOperation'
import { initializeDependencies } from '#framework/infra/initializerDI'

initializeDependencies()

const router: Router = express.Router()
const searchOperation = Container.get(SearchOperation)

router.get('/', (req: Request, res: Response) => {
  res.send({ data: 'It Works!' })
})

router.post('/search', async (req: Request, res: Response) => {
  const input = req.body

  try {
    res.send({
      data: await searchOperation.run(input)
    })
  } catch (error) {
    res.status(500).send({
      message: `${error}`
    })
  }
})

export default router
