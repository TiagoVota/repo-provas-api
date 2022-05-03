import { CategoryName } from '@prisma/client'

import prisma from '../src/database/database.js'


const main = async () => {
	// Clear db
	const tableNames = [
		'users',
		'terms',
		'disciplines',
		'teachers',
		'teacherDisciplines',
		'categories',
		'tests',
	]

	const truncatePromises = tableNames.map(name => {
		prisma.$executeRaw`TRUNCATE TABLE ${name};`
	})
	await Promise.all(truncatePromises)


	// Insert categories, terms, teacher 
	const categoryList = ['P1', 'P2', 'P3', 'P2ch', 'Outras'] as CategoryName[]
	const termList = [1, 2, 3]
	const teacherList = ['Bruna', 'Galdino', 'Marcus']
	
	const categoryPromises = categoryList.map(categoryName => {
		const promise = prisma.category.upsert({
			where: {
				name: categoryName,
			},
			update: {},
			create: {
				name: categoryName,
			},
		})

		return promise
	})
	const termPromises = termList.map(number => {
		const promise = prisma.term.upsert({
			where: {
				number,
			},
			update: {},
			create: {
				number,
			},
		})

		return promise
	})
	const teacherPromises = teacherList.map(name => {
		const promise = prisma.teacher.upsert({
			where: {
				name,
			},
			update: {},
			create: {
				name,
			},
		})

		return promise
	})

	await Promise.all([
		...categoryPromises,
		...termPromises,
		...teacherPromises,
	])


	// Insert disciplines
	const termIds = (await prisma.term.findMany()).map(term => term.id)

	const disciplineList = ['React', 'Node', 'Tetes']

	const disciplinePromises = disciplineList.map((name, index) => {
		const promise = prisma.discipline.upsert({
			where: {
				name,
			},
			update: {},
			create: {
				name,
				termId: termIds[index]
			},
		})

		return promise
	})

	await Promise.all(disciplinePromises)


	// Insert teacherDisciplines
	const teacherIds = (await prisma.teacher.findMany()).map(t => t.id)
	const disciplineIds = (await prisma.discipline.findMany()).map(d => d.id)

	const tdList = teacherIds.map((teacherId, index) => {
		const tdData = { teacherId, disciplineId: disciplineIds[index] }
		return tdData
	})

	const tdPromise = prisma.teacherDiscipline.createMany({
		data: tdList
	})

	await tdPromise
}


main()
	.catch((e) => {
		console.log(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
