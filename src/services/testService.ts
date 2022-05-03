import { TestInsertData } from '../interfaces/tests.js'

import {
	categoryRepository,
	disciplineRepository,
	testRepository
} from '../repositories/index.js'

import sanitizeDisciplineTests from '../helpers/testsHelper/sanitizeDisciplineTests.js'
import sanitizeTeachersTests from '../helpers/testsHelper/sanitizeTeachersTests.js'

import {
	NoCategoryError,
	NoTeacherDisciplineError,
	NoTestError
} from '../errors/index.js'


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


const insertTest = async (testInfo: TestInsertData) => {
	await validateCategory(testInfo.categoryId)
	await validateTeacherDisciplineId(testInfo.teacherDisciplineId)

	const insertedTest = await testRepository.insert(testInfo)

	return insertedTest
}


const addTestsViw = async (testId: number) => {
	await validateTest(testId)

	const updatedTest = await testRepository.addViewById(testId)

	return updatedTest
}

const validateCategory = async (categoryId: number) => {
	const category = await categoryRepository.findById(categoryId)
	if (!category) throw new NoCategoryError(categoryId)
}

const validateTeacherDisciplineId = async (tdId: number) => {
	const teacherDiscipline = await disciplineRepository
		.findTeacherDisciplineById(tdId)
	if (!teacherDiscipline) throw new NoTeacherDisciplineError(tdId)
}

const validateTest = async (testId: number) => {
	const test = await testRepository.findById(testId)
	if (!test) throw new NoTestError(testId)
}


export {
	getTestsByDiscipline,
	getTestsByTeacher,
	insertTest,
	addTestsViw,
}
