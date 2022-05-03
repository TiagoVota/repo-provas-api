import supertest from 'supertest'

import app from '../src/app.js'
import prisma from '../src/database/database.js'


describe('POST /auth/sign-up', async () => {
	beforeEach(async () => {
		await prisma.$executeRaw`TRUNCATE TABLE users;`
	})

	it('should return 422 for invalid body', async () => {
		const invalidBody = {
			password: 'password',
		}

		const result = await supertest(app).post('/auth/sign-up').send(invalidBody)
		const status = result.status
        
		expect(status).toEqual(422)
	})

	it('should return 201 for valid body', async () => {
		const body = {
			email: 'someone@email.com',
			password: 'password',
		}

		const result = await supertest(app).post('/auth/sign-up').send(body)
		const status = result.status

		const insertedUser = await prisma.user.findUnique({
			where: {
				email: body.email,
			},
		})
		
		expect(status).toEqual(201)
		expect(insertedUser).not.toBeNull()
	})

	it('should return 409 for conflict body', async () => {
		const body = {
			email: 'someone@email.com',
			password: 'password',
		}

		await prisma.user.create({
			data: body
		})

		const result = await supertest(app).post('/auth/sign-up').send(body)
		const status = result.status
        
		expect(status).toEqual(409)
	})
})


describe('POST /auth/login', async () => {
	beforeEach(async () => {
		await prisma.$executeRaw`TRUNCATE TABLE users;`
	})

	it('should return 422 for invalid body', async () => {
		const invalidBody = {
			password: 'password',
		}

		const result = await supertest(app).post('/auth/login').send(invalidBody)
		const status = result.status
        
		expect(status).toEqual(422)
	})

	it('should return 404 for not found user', async () => {
		const body = {
			email: 'someone@email.com',
			password: 'password',
		}

		const result = await supertest(app).post('/auth/login').send(body)
		const status = result.status
        
		expect(status).toEqual(404)
	})

	it('should return 200 for valid user info', async () => {
		const body = {
			email: 'someone@email.com',
			password: 'password',
		}

		await prisma.user.create({
			data: body
		})

		const result = await supertest(app).post('/auth/sign-up').send(body)
		const status = result.status

		expect(status).toEqual(201)
	})
})


afterAll(async () => {
	await prisma.$disconnect()
})

