class UnprocessableEntityError extends Error {
	status: number

	constructor(message: string) {
		super(message || 'Unprocessable Entity!')
		this.name = 'HttpError'
		this.status = 422
	}
}


export default UnprocessableEntityError
