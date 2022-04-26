import UnauthorizedError from './httpErrors/UnauthorizedError.js'


class InvalidPasswordError extends UnauthorizedError {
	constructor() {
		super('Invalid user password!')
		this.name = 'InvalidPasswordError'
	}
}


export default InvalidPasswordError

