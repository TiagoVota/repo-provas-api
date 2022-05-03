import { NextFunction, Request, Response } from 'express'

import { TestInsertData } from '../interfaces/tests.js'

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


const postTest = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const testInfo = req.body as TestInsertData

	try {
		const test = await testService.insertTest(testInfo)

		return res.status(201).send(test)

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
		const test = await testService.addTestsViw(testId)

		return res.status(200).send(test)

	} catch (error) {
		next(error)
	}
}


export {
	getDisciplineTests,
	getTeacherTests,
	postTest,
	AddView,
}
