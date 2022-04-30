import { testRepository } from '../repositories/index.js'

import sanitizeDisciplineTests from '../helpers/testsHelper/sanitizeDisciplineTests.js'
import sanitizeTeachersTests from '../helpers/testsHelper/sanitizeTeachersTests.js'


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


export {
	getTestsByDiscipline,
	getTestsByTeacher,
}
