class BadRequestError extends Error {
	status: number

	constructor(message: string) {
		super(message || 'Bad Request!')
		this.name = 'HttpError'
		this.status = 400
	}
}


export default BadRequestError
