export const getContentType = () => ({
	"Content-Type": "application/json",
})

export const returnError = (
	error: any
): string => {
	const message =
		error?.response?.data?.message
	console.log(message, typeof message)

	return message
		? typeof error.response.data
				.message === "object"
			? message[0]
			: message
		: error.message
}

export const getAuthUrl = (
	path: string
) => `/auth${path}`
export const getUsersUrl = (
	path: string
) => `/users${path}`
export const getDialogsUrl = (
	path: string
) => `/dialogs${path}`
