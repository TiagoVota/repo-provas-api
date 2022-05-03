const sanitizeDisciplineTests = (teachersTests: any[]) => {
	const output = teachersTests.map(teacher => {
		const testsArr = separeTests(teacher.teacherDisciplines)

		const allTests = [].concat( ...testsArr )

		const categories = separeCategories(allTests)


		return { teacherId: teacher.id, name: teacher.name, categories }
	})

	return { teachers: output }
}


const separeTests = (teachersDisciplines: any[]) => {
	const testsArr = teachersDisciplines.map(td => {
		const disciplineInfo = {
			disciplineId: td.discipline.id,
			name: td.discipline.name,
			term: td.discipline.term,
		}

		const newTests = td.tests.map(testInfo => {
			return {
				...testInfo,
				discipline: disciplineInfo
			}
		})

		return newTests
	})

	return testsArr
}


const separeCategories = (tests: any[]) => {
	const hashTable = {}

	tests.forEach(test => {
		const categoryId = test.category.id

		const testInfo = {
			testId: test.id,
			name: test.name,
			pdfUrl: test.pdfUrl,
			views: test.views,
			discipline: test.discipline,
		}

		if (!hashTable[categoryId]) {
			return hashTable[categoryId] = {
				categoryId,
				name: test.category.name,
				tests: [testInfo]
			}
		}

		hashTable[categoryId].tests = [ ...hashTable[categoryId].tests, testInfo ]
	})

	return Object.values(hashTable)
}


export default sanitizeDisciplineTests
