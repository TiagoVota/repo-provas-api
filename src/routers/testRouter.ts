import { Router } from 'express'

import * as schemaValidation from '../middlewares/schemaValidation/index.js'
import authMiddleware from '../middlewares/authMiddleware.js'

import { testController } from '../controllers/index.js'

import {
	addTesteSchema,
	addViewSchema,
	searchSchema
} from '../schemas/testSchema.js'


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

testRouter.post(
	'/',
	authMiddleware,
	schemaValidation.bodyMiddleware(addTesteSchema),
	testController.postTest,
)

testRouter.patch(
	'/:testId/views/add',
	authMiddleware,
	schemaValidation.paramsMiddleware(addViewSchema),
	testController.AddView
)


export default testRouter
