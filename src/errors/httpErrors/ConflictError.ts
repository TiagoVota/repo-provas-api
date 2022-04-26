class ConflictError extends Error {
	status: number

	constructor(message: string) {
		super(message || 'Conflict!')
		this.name = 'HttpError'
		this.status = 409
	}
}


export default ConflictError
