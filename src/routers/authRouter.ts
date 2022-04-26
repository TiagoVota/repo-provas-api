import { Router } from 'express'

import { authController } from '../controllers/index.js'


const authRouter = Router()

authRouter.post('/login', authController.loginUser)
authRouter.post('/sign-up', authController.signUpUser)

authRouter.delete('/logout', authController.logoutUser)


export default authRouter
