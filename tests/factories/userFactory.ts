import supertest from 'supertest'

import app from '../../src/app'
import prisma from '../../src/database/database'


const findUser = async (email: string) => {
	const user = await prisma.user.findUnique({
		where: {
			email: email,
		},
	})

	return user
}


const createUser = async (body) => {
	const user = await prisma.user.create({
		data: body
	})

	return user
}


const authUser = async () => {
	const userBody = {
		email: 'someone@email.com',
		password: 'password',
	}
	await createUser(userBody)

	const response = await supertest(app).post('/auth/login').send(userBody)
	const token = response.body

	return token
}


export {
	findUser,
	createUser,
	authUser,
}
