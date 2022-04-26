import { User } from '@prisma/client'

import { userRepository } from '../repositories/index.js'

import { encryptValue, isValidEncrypt } from '../utils/encryptor.js'
import { generateToken } from '../utils/authorizations.js'

import { ExistentUserError, InvalidPasswordError } from '../errors/index.js'


export type UserData = Omit<User, 'id'>

const createUser = async ({ email, password }: UserData) => {
	await validateExistentUser(email)

	const hashPassword = encryptValue(password)

	const user = await insertUser({ email, password: hashPassword })
	
	return user
}


const AuthorizeUser = async ({ email, password }: UserData) => {
	const user = await userRepository.findByEmail(email)

	validatePassword(password, user.password)

	const token = generateToken({ userId: user.id, email })

	return token
}


const deleteUser = async (data) => {
	return {}
}


const validateExistentUser = async (email: string) => {
	const existentUserEmail = await userRepository.findByEmail(email)
	if (existentUserEmail) throw new ExistentUserError(email)
}

const insertUser = async (userData: UserData) => {
	const user = await userRepository.insert(userData)
	delete user.password

	return user
}

const validatePassword = (password: string, hashPassword: string) => {
	const isValidPassword = isValidEncrypt(password, hashPassword)
	if (!isValidPassword) throw new InvalidPasswordError()
}



export {
	createUser,
	AuthorizeUser,
	deleteUser,
}
