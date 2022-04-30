import { stripHtml } from 'string-strip-html'


const sanitizeInput = (body: object) => {
	const bodyAttributes = Object.keys(body)

	bodyAttributes.forEach((key) => {
		if (isSanitizableValue(body[key])) body[key] = sanitizeStr(body[key])
	})

	return body
}

const sanitizeStr = (str: string) => stripHtml(str).result.trim()

const isSanitizableValue = (value: any) => {
	return typeof value !== 'number'
}


export {
	sanitizeInput,
}
