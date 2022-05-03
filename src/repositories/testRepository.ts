import prisma from '../database/database.js'


const findById = async (testId: number) => {
	const test = await prisma.test.findUnique({
		where: {
			id: testId,
		}
	})

	return test
}


const findByTerms = async (search: string) => {
	const testsByTerms = await prisma.term.findMany({
		include: {
			disciplines: {
				where: {
					name: {
						contains: search,
						mode: 'insensitive',
					},
				},
				include: {
					teacherDisciplines: {
						include: {
							teacher: true,
							tests: {
								include: {
									category: true,
								},
							},
						},
					},
				},
			},
		},
	})

	return testsByTerms
}


const findByTeachers = async (search: string) => {
	const testsByTeachers = await prisma.teacher.findMany({
		where: {
			name: {
				contains: search,
				mode: 'insensitive',
			},
		},
		include: {
			teacherDisciplines: {
				include: {
					discipline: {
						include: {
							term: true
						}
					},
					tests: {
						include: {
							category: true
						}
					}
				}
			}
		}
	})

	return testsByTeachers
}


const addViewById = async (testId: number) => {
	const testsByTeachers = await prisma.test.update({
		where: {
			id: testId
		},
		data: {
			views: {
				increment: 1,
			},
		},

	})

	return testsByTeachers
}


export {
	findByTerms,
	findByTeachers,
	addViewById,
	findById,
}
