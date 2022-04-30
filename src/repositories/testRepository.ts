import prisma from '../database/database.js'


const findByTerms = async (search: string) => {
	const testsByTerms = await prisma.term.findMany({
		include: {
			disciplines: {
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


export {
	findByTerms,
	findByTeachers,
}
