import jwt from 'jsonwebtoken'

import { UserInfo } from '../services/userService'


const generateToken = (tokenInfo: UserInfo) => {
	const secretKey = process.env.JWT_SECRET
	const configurations = { expiresIn: '15 days' }
	const token = jwt.sign(tokenInfo, secretKey, configurations)

	return token
}


const verifyToken = (token: string) => {
	const secretKey = process.env.JWT_SECRET
	const payload = jwt.verify(token, secretKey)

	return payload
}


export {
	generateToken,
	verifyToken,
}
