import UnauthorizedError from './httpErrors/UnauthorizedError.js'


class AuthError extends UnauthorizedError {
	constructor() {
		super('Invalid token!')
		this.name = 'AuthError'
	}
}


export default AuthError

