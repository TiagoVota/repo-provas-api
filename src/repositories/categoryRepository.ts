import prisma from '../database/database.js'


const findById = async (id: number) => {
	const category = await prisma.category.findUnique({
		where: {
			id,
		},
	})

	return category
}


export {
	findById,
}
