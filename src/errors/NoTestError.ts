import NotFoundError from './httpErrors/NotFoundError.js'


class NoTestError extends NotFoundError {
	constructor(testId: number) {
		super(`Test id '${testId}' not found!`)
		this.name = 'NoTestError'
	}
}


export default NoTestError
