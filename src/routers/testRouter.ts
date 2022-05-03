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

testRouter.use(authMiddleware)

testRouter.get(
	'/discipline',
	schemaValidation.queryMiddleware(searchSchema),
	testController.getDisciplineTests,
)
testRouter.get(
	'/teacher',
	schemaValidation.queryMiddleware(searchSchema),
	testController.getTeacherTests,
)
testRouter.get(
	'/insert-info',
	testController.getTestInsertInfo,
)

testRouter.post(
	'/',
	schemaValidation.bodyMiddleware(addTesteSchema),
	testController.postTest,
)

testRouter.patch(
	'/:testId/views/add',
	schemaValidation.paramsMiddleware(addViewSchema),
	testController.AddView
)


export default testRouter
