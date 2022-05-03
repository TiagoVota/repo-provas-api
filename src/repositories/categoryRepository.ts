import prisma from '../database/database.js'


const findById = async (id: number) => {
	const category = await prisma.category.findUnique({
		where: {
			id,
		},
	})

	return category
}


const findAll = async () => {
	const categories = await prisma.category.findMany()

	return categories
}


export {
	findById,
	findAll,
}
