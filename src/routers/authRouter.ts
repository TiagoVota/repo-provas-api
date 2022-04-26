import { Router } from 'express'

import { authController } from '../controllers/index.js'

import { schemaValidation } from '../middlewares/schemaValidationMiddleware.js'

import { userSchema } from '../schemas/userSchema.js'


const authRouter = Router()

authRouter.post(
	'/login',
	schemaValidation(userSchema),
	authController.loginUser
)
authRouter.post(
	'/sign-up',
	schemaValidation(userSchema),
	authController.signUpUser
)


export default authRouter
