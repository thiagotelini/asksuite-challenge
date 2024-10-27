import 'reflect-metadata'
import 'dotenv/config'

import express from 'express'
import cors from 'cors'

import router from '#framework/routes/router'

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(cors())

app.use('/', router)
app.listen(port || 8080, () => {
    console.log(`Listening on port ${port}`)
})
