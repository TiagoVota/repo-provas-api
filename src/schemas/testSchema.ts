import Joi from 'joi'

import { TestInsertData } from '../interfaces/tests.js'

import { urlRegex } from '../utils/regexPatterns.js'


const searchSchema = Joi.object({
	search: Joi.string().allow(null, ''),
})

const addViewSchema = Joi.object({
	testId: Joi.number().integer().min(1).required(),
}).length(1)

const addTesteSchema = Joi.object<TestInsertData>({
	name: Joi.string().min(5).max(255).required(),
	pdfUrl: Joi.string().pattern(urlRegex).required(),
	categoryId: Joi.number().integer().min(1).required(),
	teacherDisciplineId: Joi.number().integer().min(1).required(),
}).length(4)


export {
	searchSchema,
	addViewSchema,
	addTesteSchema,
}
