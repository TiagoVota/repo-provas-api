import { NextFunction, Request, Response } from 'express'


const getDisciplineTests = async (req: Request, res: Response, next: NextFunction) => {
	const search = req.query.search

	try {
		const tests = []

		return res.status(200).send(tests)
	} catch (error) {
		next(error)
	}
}


const getTeacherTests = async (req: Request, res: Response, next: NextFunction) => {
	const search = req.query.search

	try {
		const tests = []

		return res.status(200).send(tests)
	} catch (error) {
		next(error)
	}
}


export {
	getDisciplineTests,
	getTeacherTests,
}
