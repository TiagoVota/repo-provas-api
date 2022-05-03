import { User } from '@prisma/client'

import { userRepository } from '../repositories/index.js'

import { encryptValue, isValidEncrypt } from '../utils/encryptor.js'
import { generateToken } from '../utils/authorizations.js'

import {
	ExistentUserError,
	InvalidPasswordError,
	NoUserError,
} from '../errors/index.js'


export type UserData = Omit<User, 'id'>
export interface UserInfo {
	userId: number
	email: string
}

const createUser = async ({ email, password }: UserData) => {
	await validateExistentUser(email)

	const hashPassword = encryptValue(password)

	const user = await insertUser({ email, password: hashPassword })
	
	return user
}


const AuthorizeUser = async ({ email, password }: UserData) => {
	const user = await userRepository.findByEmail(email)

	validateUser(user, email)
	validatePassword(password, user.password)

	const token = generateToken({ userId: user.id, email })

	return token
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

const validateUser = (user: User, email: string) => {
	const haveUser = Boolean(user?.id)
	if (!haveUser) throw new NoUserError(email)
}

const validatePassword = (password: string, hashPassword: string) => {
	const isValidPassword = isValidEncrypt(password, hashPassword)
	if (!isValidPassword) throw new InvalidPasswordError()
}



export {
	createUser,
	AuthorizeUser,
}
