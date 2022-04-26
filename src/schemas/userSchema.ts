import Joi from 'joi'


const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(5).max(80).required()
}).length(2)


const signUpSchema = Joi.object({
	name: Joi.string().min(2).max(80).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(5).max(80).required(),
}).length(3)


export {
	loginSchema,
	signUpSchema,
}
