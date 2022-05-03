import prisma from '../database/database.js'


const findTeacherDisciplineById = async (id: number) => {
	const teacherDiscipline = await prisma.teacherDiscipline.findUnique({
		where: {
			id,
		},
	})

	return teacherDiscipline
}


const findDisciplinesAndTeachers = async () => {
	const disciplinesAndTeachers = await prisma.discipline.findMany({
		where: {
			teacherDisciplines: {
				some: {
					id: {
						gt: 1,
					},
				},
			},
		},
		include: {
			teacherDisciplines: {
				include: {
					teacher: true,
				},
			},
		},
	})

	return disciplinesAndTeachers
}


export {
	findTeacherDisciplineById,
	findDisciplinesAndTeachers,
}
