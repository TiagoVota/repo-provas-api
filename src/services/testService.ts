import { testRepository } from '../repositories/index.js'

import sanitizeDisciplineTests from '../helpers/testsHelper/sanitizeDisciplineTests.js'
import sanitizeTeachersTests from '../helpers/testsHelper/sanitizeTeachersTests.js'

import { NoTestError } from '../errors/index.js'


const getTestsByDiscipline = async (search: string) => {
	const tests = await testRepository.findByTerms(search)

	const sanitizedTests = sanitizeDisciplineTests(tests)

	return sanitizedTests
}


const getTestsByTeacher = async (search: string) => {
	const tests = await testRepository.findByTeachers(search)

	const sanitizedTests = sanitizeTeachersTests(tests)

	return sanitizedTests
}


const addTestsViw = async (testId: number) => {
	await validateTest(testId)

	const updatedTest = await testRepository.addViewById(testId)

	return updatedTest
}


const validateTest = async (testId: number) => {
	const test = await testRepository.findById(testId)
	if (!test) throw new NoTestError(testId)
}


export {
	getTestsByDiscipline,
	getTestsByTeacher,
	addTestsViw,
}
