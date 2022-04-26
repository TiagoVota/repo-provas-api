import prisma from '../database/database.js'

import { UserData } from '../services/userService.js'


const findByEmail = async (email: string) => {
	const user = await prisma.user.findUnique({
		where: { email }
	})

	return user
}


const insert = async (userData: UserData) => {
	const user = await prisma.user.create({
		data: userData
	})

	return user
}


export {
	findByEmail,
	insert,
}
