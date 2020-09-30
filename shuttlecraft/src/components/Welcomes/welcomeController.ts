import { Request, NextFunction, Response } from 'express'

import * as ENV from '../../config/env'
import { HttpStatusCode } from '../../constants/http'

export const welcomes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(HttpStatusCode.OK).json({
      data: { env: 'push to master' },
      message: 'success',
      code: HttpStatusCode.OK,
    })
  } catch (err) {
    next(err)
  }
}
