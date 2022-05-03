import Joi from 'joi'


const userSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(5).max(80).required(),
}).length(2)


export {
	userSchema,
}
