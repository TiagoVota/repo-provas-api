import Joi from 'joi'


const searchSchema = Joi.object({
	search: Joi.string().allow(null, ''),
})

const addViewSchema = Joi.object({
	testId: Joi.number().integer().min(1),
}).length(1)


export {
	searchSchema,
	addViewSchema,
}
