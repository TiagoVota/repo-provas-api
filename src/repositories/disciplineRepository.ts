import prisma from '../database/database.js'


const findTeacherDisciplineById = async (id: number) => {
	const teacherDiscipline = await prisma.teacherDiscipline.findUnique({
		where: {
			id,
		},
	})

	return teacherDiscipline
}


export {
	findTeacherDisciplineById,
}
