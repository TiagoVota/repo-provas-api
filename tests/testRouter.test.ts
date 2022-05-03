import supertest from 'supertest'

import '../src/setup.js'

import app from '../src/app.js'
import prisma from '../src/database/database.js'

import { authUser } from './factories/userFactory.js'
import {
	findCategory,
	findTd,
	findTest,
	insertTest
} from './factories/testsFactory.js'


describe('GET /tests/discipline', async () => {
	beforeEach(async () => {
		await prisma.$executeRaw`TRUNCATE TABLE users;`
		await prisma.$executeRaw`TRUNCATE TABLE tests;`
	})

	it('should return 401 for invalid token', async () => {
		const result = await supertest(app).get('/tests/discipline')
		const status = result.status
        
		expect(status).toEqual(401)
	})

	it('should return 200 for valid token', async () => {
		const token = await authUser()

		const result = await supertest(app)
			.get('/tests/discipline')
			.set('Authorization', `Bearer ${token}`)
		const status = result.status
        
		expect(status).toEqual(200)
		expect(result.body).not.toBeNull()
	})

	it('should return 200 for valid token with search', async () => {
		const token = await authUser()
		const search = 'HT'

		const result = await supertest(app)
			.get(`/tests/discipline?search=${search}`)
			.set('Authorization', `Bearer ${token}`)
		const status = result.status
        
		expect(status).toEqual(200)
		expect(result.body).not.toBeNull()
	})
})


describe('GET /tests/teacher', async () => {
	beforeEach(async () => {
		await prisma.$executeRaw`TRUNCATE TABLE users;`
		await prisma.$executeRaw`TRUNCATE TABLE tests;`
	})

	it('should return 401 for invalid token', async () => {
		const result = await supertest(app).get('/tests/teacher')
		const status = result.status
        
		expect(status).toEqual(401)
	})

	it('should return 200 for valid token', async () => {
		const token = await authUser()

		const result = await supertest(app)
			.get('/tests/teacher')
			.set('Authorization', `Bearer ${token}`)
		const status = result.status
        
		expect(status).toEqual(200)
		expect(result.body).not.toBeNull()
	})

	it('should return 200 for valid token with search', async () => {
		const token = await authUser()
		const search = 'Marcus'

		const result = await supertest(app)
			.get(`/tests/teacher?search=${search}`)
			.set('Authorization', `Bearer ${token}`)
		const status = result.status
        
		expect(status).toEqual(200)
		expect(result.body).not.toBeNull()
	})
})


describe('GET /tests/insert-info', async () => {
	beforeEach(async () => {
		await prisma.$executeRaw`TRUNCATE TABLE users;`
		await prisma.$executeRaw`TRUNCATE TABLE tests;`
	})

	it('should return 401 for invalid token', async () => {
		const result = await supertest(app).get('/tests/insert-info')
		const status = result.status
        
		expect(status).toEqual(401)
	})

	it('should return 200 for valid token', async () => {
		const token = await authUser()

		const result = await supertest(app)
			.get('/tests/insert-info')
			.set('Authorization', `Bearer ${token}`)
		const status = result.status
        
		expect(status).toEqual(200)
		expect(result.body.categories).not.toBeNull()
		expect(result.body.disciplineAndTeachers).not.toBeNull()
	})
})


describe('POST /tests', async () => {
	beforeEach(async () => {
		await prisma.$executeRaw`TRUNCATE TABLE users;`
		await prisma.$executeRaw`TRUNCATE TABLE tests;`
	})

	it('should return 401 for invalid token', async () => {
		const body = {
			name: 'Meu primeiro teste',
			pdfUrl: 'https://www.google.com',
			categoryId: 3,
			teacherDisciplineId: 3,
		}

		const result = await supertest(app).post('/tests').send(body)
		const status = result.status
        
		expect(status).toEqual(401)
	})

	it('should return 422 for invalid body', async () => {
		const token = await authUser()

		const invalidBody = {
			pdfUrl: 'https://www.google.com',
			categoryId: 3,
			teacherDisciplineId: 3,
		}

		const result = await supertest(app)
			.post('/tests')
			.send(invalidBody)
			.set('Authorization', `Bearer ${token}`)
		const status = result.status
        
		expect(status).toEqual(422)
	})

	it('should return 404 for not found category', async () => {
		const token = await authUser()

		const td = await findTd()
		
		const invalidCategoryId = 65824784527
		const body = {
			name: 'Meu primeiro teste',
			pdfUrl: 'https://www.google.com',
			categoryId: invalidCategoryId,
			teacherDisciplineId: td.id,
		}

		const result = await supertest(app)
			.post('/tests')
			.send(body)
			.set('Authorization', `Bearer ${token}`)
		const status = result.status
        
		expect(status).toEqual(404)
	})

	it('should return 404 for not found teacher-discipline', async () => {
		const token = await authUser()

		const category = await findCategory()

		const invalidTdId = 65824784527
		const body = {
			name: 'Meu primeiro teste',
			pdfUrl: 'https://www.google.com',
			categoryId: category.id,
			teacherDisciplineId: invalidTdId,
		}

		const result = await supertest(app)
			.post('/tests')
			.send(body)
			.set('Authorization', `Bearer ${token}`)
		const status = result.status
        
		expect(status).toEqual(404)
	})

	it('should return 201 for credentials', async () => {
		const token = await authUser()

		const category = await findCategory()
		const td = await findTd()

		const body = {
			name: 'Meu primeiro teste',
			pdfUrl: 'https://www.google.com',
			categoryId: category.id,
			teacherDisciplineId: td.id,
		}

		const result = await supertest(app)
			.post('/tests')
			.send(body)
			.set('Authorization', `Bearer ${token}`)
		const status = result.status
		const testId = result.body.id
		
		const insertedTest = await findTest(testId)
		
		expect(status).toEqual(201)
		expect(insertedTest).not.toBeNull()
	})
})


describe('POST /tests/:testId/views/add', async () => {
	beforeEach(async () => {
		await prisma.$executeRaw`TRUNCATE TABLE users;`
		await prisma.$executeRaw`TRUNCATE TABLE tests;`
	})

	it('should return 401 for invalid token', async () => {
		const testId = 10

		const result = await supertest(app).post(`/tests/${testId}/views/add`)
		const status = result.status
    
		expect(status).toEqual(401)
	})

	it('should return 422 for invalid param', async () => {
		const token = await authUser()

		const invalidTestId = 'test'

		const result = await supertest(app)
			.post(`/tests/${invalidTestId}/views/add`)
			.set('Authorization', `Bearer ${token}`)
		const status = result.status
        
		expect(status).toEqual(422)
	})

	it('should return 404 for not found test', async () => {
		const token = await authUser()

		const invalidTestId = 65824784527

		const result = await supertest(app)
			.post(`/tests/${invalidTestId}/views/add`)
			.set('Authorization', `Bearer ${token}`)
		const status = result.status
        
		expect(status).toEqual(404)
	})

	it('should return 200 for increase test view', async () => {
		const token = await authUser()
	
		const test = await insertTest()
	
		const testId = test.id
		const previousTestViews = test.views
	
		const result = await supertest(app)
			.post(`/tests/${testId}/views/add`)
			.set('Authorization', `Bearer ${token}`)
		const status = result.status
			
		const insertedTest = await findTest(testId)
			
		expect(status).toEqual(200)
		expect(insertedTest.views).toBeGreaterThan(previousTestViews)
	})
})


afterAll(async () => {
	await prisma.$disconnect()
})
