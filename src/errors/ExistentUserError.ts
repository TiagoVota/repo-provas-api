import ConflictError from './httpErrors/ConflictError.js'


class ExistentUserError extends ConflictError {
	constructor(email: string) {
		super(`User with e-mail '${email}' already registered!`)
		this.name = 'ExistentUserError'
	}
}


export default ExistentUserError

