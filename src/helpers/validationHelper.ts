import { stripHtml } from 'string-strip-html'


const sanitizeInput = (obj: object) => {
	for (const key in obj) {
		if (isSanitizableValue(obj[key])) obj[key] = sanitizeStr(obj[key])
	}

	return obj
}

const sanitizeStr = (str: string) => stripHtml(str).result.trim()

const isSanitizableValue = (value: any) => {
	return typeof value !== 'number'
}


export {
	sanitizeInput,
}
