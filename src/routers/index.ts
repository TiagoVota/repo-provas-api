import { Router } from 'express'

import healthRouter from './healthRouter.js'
import authRouter from './authRouter.js'
import testRouter from './testRouter.js'


const router = Router()

router.use('/health', healthRouter)
router.use('/auth', authRouter)
router.use('/tests', testRouter)


export default router
