import { Request, Response, NextFunction } from 'express'

import { validationErrors } from '../../validations/handleValidation.js'
import { sanitizeInput } from '../../helpers/validationHelper.js'

import { SchemaError } from '../../errors/index.js'


function queryMiddleware(schema: object) {
	return (req: Request, res: Response, next: NextFunction) => {
		const query = sanitizeInput(req.query)

		const errors = validationErrors({
			objectToValid: query,
			objectValidation: schema
		})

		if (errors) throw new SchemaError(errors)

		next()
	}
}


export default queryMiddleware
