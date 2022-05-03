import prisma from '../../src/database/database'


const findCategory = async () => {
	const category = await prisma.category.findFirst()

	return category
}


const findTd = async () => {
	const td = await prisma.teacherDiscipline.findFirst()

	return td
}


const findTest = async (id: number) => {
	const test = await prisma.test.findUnique({
		where: {
			id,
		},
	})

	return test
}


const insertTest = async () => {
	const category = await findCategory()
	const td = await findTd()

	const testData = {
		name: 'My first test',
		pdfUrl: 'https://www.google.com',
		categoryId: category.id,
		teacherDisciplineId: td.id,
	}

	const test = await prisma.test.create({
		data: testData
	})

	return test
}


export {
	findCategory,
	findTd,
	findTest,
	insertTest,
}
