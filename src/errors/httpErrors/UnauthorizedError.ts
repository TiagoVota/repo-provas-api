class UnauthorizedError extends Error {
	status: number

	constructor(message: string) {
		super(message || 'Unauthorized!')
		this.name = 'HttpError'
		this.status = 401
	}
}


export default UnauthorizedError
