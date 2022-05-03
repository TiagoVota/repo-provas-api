import { Router } from 'express'

import * as schemaValidation from '../middlewares/schemaValidation/index.js'
import authMiddleware from '../middlewares/authMiddleware.js'

import { testController } from '../controllers/index.js'

import { addViewSchema, searchSchema } from '../schemas/testSchema.js'


const testRouter = Router()

testRouter.get(
	'/discipline',
	authMiddleware,
	schemaValidation.queryMiddleware(searchSchema),
	testController.getDisciplineTests,
)
testRouter.get(
	'/teacher',
	authMiddleware,
	schemaValidation.queryMiddleware(searchSchema),
	testController.getTeacherTests,
)

testRouter.patch(
	'/:testId/views/add',
	authMiddleware,
	schemaValidation.paramsMiddleware(addViewSchema),
	testController.AddView
)


export default testRouter
