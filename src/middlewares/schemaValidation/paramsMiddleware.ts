import { Request, Response, NextFunction } from 'express'

import { validationErrors } from '../../validations/handleValidation.js'
import { sanitizeInput } from '../../helpers/validationHelper.js'

import { SchemaError } from '../../errors/index.js'


function paramsMiddleware(schema: object) {
	return (req: Request, res: Response, next: NextFunction) => {
		const params = sanitizeInput(req.params)

		const errors = validationErrors({
			objectToValid: params,
			objectValidation: schema
		})

		if (errors) throw new SchemaError(errors)

		next()
	}
}


export default paramsMiddleware
