import express from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'

import APIError from './error/APIError'
import { HttpStatusCode } from './constants/http'
import router from './routes'

const app: express.Application = express()
const port = process.env.PORT || 3000

// setup middile-ware
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/v1/', router)
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const error = new APIError('NOT FOUND', HttpStatusCode.NOT_FOUND, true, 'URI Not found')
  next(error)
})
app.use((
  err: APIError,
  req: express.Request,
  res: express.Response,
) => {
  console.error(err.stack)
  res.status(err.httpCode).json({
    data: {},
    code: err.httpCode,
    error: err.stack,
    message: err.message,
  })
})

// start server
app.listen(port, () => {
  console.info(`Server is running in http://localhost:${port}`)
})

app.on('error', (error: any) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
})
