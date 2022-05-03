import NotFoundError from './httpErrors/NotFoundError.js'


class NoTeacherDisciplineError extends NotFoundError {
	constructor(teacherDisciplineId: number) {
		super(`Relation teacher-discipline id '${teacherDisciplineId}' not found!`)
		this.name = 'NoTeacherDisciplineError'
	}
}


export default NoTeacherDisciplineError
