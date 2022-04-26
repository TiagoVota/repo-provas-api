class NotFoundError extends Error {
	status: number

	constructor(message: string) {
		super(message || 'Not found!')
		this.name = 'HttpError'
		this.status = 404
	}
}


export default NotFoundError
