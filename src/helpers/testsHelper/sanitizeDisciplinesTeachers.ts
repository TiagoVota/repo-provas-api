const sanitizeDisciplinesTeachers = (dtArr: any[]) => {
	const output = dtArr.map(dt => {
		const newTeachers = dt.teacherDisciplines.map(td => {
			const teacherInfo = {
				teacherId: td.teacherId,
				name: td.teacher.name,
				teacherDisciplineId: td.id,
			}

			return teacherInfo
		})

		return { disciplineId: dt.id, name: dt.name, teachers: newTeachers }
	})

	return output
}


export default sanitizeDisciplinesTeachers
