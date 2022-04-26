import UnprocessableEntityError from './httpErrors/UnprocessableEntityError.js'


class SchemaError extends UnprocessableEntityError {
	constructor(message: string) {
		super(message)
		this.name = 'SchemaError'
		this.message = message
		this.status = 422
	}
}


export default SchemaError
