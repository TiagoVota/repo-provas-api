import NotFoundError from './httpErrors/NotFoundError.js'


class NoUserError extends NotFoundError {
	constructor(email: string) {
		super(`User not found with email '${email}'!`)
		this.name = 'NoUserError'
	}
}


export default NoUserError

