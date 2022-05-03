import { Test } from '@prisma/client'


type TestInsertData = Omit<Test, 'id' | 'views'>


export {
	TestInsertData,
}
