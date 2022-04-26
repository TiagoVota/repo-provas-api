import { Router } from 'express'

import authMiddleware from '../middlewares/authMiddleware.js'

import { testController } from '../controllers/index.js'


const testRouter = Router()

testRouter.get('/discipline', authMiddleware, testController.getDisciplineTests)
testRouter.get('/teacher', authMiddleware, testController.getTeacherTests)


export default testRouter
