import { NextFunction, Request, Response } from 'express'

import { userService } from '../services/index.js'


const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
	const userData = req.body

	try {
		const createdUser = await userService.createUser(userData)

		return res.status(201).send(createdUser)

	} catch (error) {
		next(error)
	}
}


const loginUser = async (req: Request, res: Response, next: NextFunction) => {
	const userData = req.body

	try {
		const token = await userService.AuthorizeUser(userData)

		return res.status(200).send(token)

	} catch (error) {
		next(error)
	}
}


export {
	signUpUser,
	loginUser,
}
