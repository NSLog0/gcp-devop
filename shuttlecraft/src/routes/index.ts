import express from 'express'

import { welcomes } from '../components/Welcomes/welcomeController'

const router = express.Router()

router
  .get('/api/hello', welcomes)

export default router
