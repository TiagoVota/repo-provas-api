const sanitizeDisciplineTests = (termsTests: any[]) => {
	const output = termsTests.map(term => {
		const newDisciplines = term.disciplines.map(discipline => {
			const interestingTeacherDiscipline = discipline.teacherDisciplines[0]
			if (!interestingTeacherDiscipline) return null

			const { teacher, tests } = interestingTeacherDiscipline
			const categories = separeCategories(tests, teacher)

			return { disciplineId: discipline.id, name: discipline.name, categories }
		}).filter(discipline => discipline !== null)

		return { termId: term.id, number: term.number, disciplines: newDisciplines }
	})

	return { terms: output }
}

const separeCategories = (tests: any[], teacher: object) => {
	const hashTable = {}

	tests.forEach(test => {
		const categoryId = test.category.id

		const testInfo = {
			testId: test.id,
			name: test.name,
			pdfUrl: test.pdfUrl,
		}

		if (!hashTable[categoryId]) {
			return hashTable[categoryId] = {
				categoryId,
				name: test.category.name,
				teacher,
				tests: [testInfo]
			}
		}

		hashTable[categoryId].tests = [ ...hashTable[categoryId].tests, testInfo ]
	})

	return Object.values(hashTable)
}


export default sanitizeDisciplineTests
