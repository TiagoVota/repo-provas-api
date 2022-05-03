import { NextFunction, Request, Response } from 'express'

import { testService } from '../services/index.js'


const getDisciplineTests = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const search = req.query.search as string

	try {
		const tests = await testService.getTestsByDiscipline(search)

		return res.status(200).send(tests)

	} catch (error) {
		next(error)
	}
}


const getTeacherTests = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const search = req.query.search as string

	try {
		const tests = await testService.getTestsByTeacher(search)

		return res.status(200).send(tests)

	} catch (error) {
		next(error)
	}
}


const AddView = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const testId = Number(req.params.testId)

	try {
		const tests = await testService.addTestsViw(testId)

		return res.status(200).send(tests)

	} catch (error) {
		next(error)
	}
}


export {
	getDisciplineTests,
	getTeacherTests,
	AddView,
}
