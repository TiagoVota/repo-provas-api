import NotFoundError from './httpErrors/NotFoundError.js'


class NoCategoryError extends NotFoundError {
	constructor(categoryId: number) {
		super(`Category id '${categoryId}' not found!`)
		this.name = 'NoCategoryError'
	}
}


export default NoCategoryError
