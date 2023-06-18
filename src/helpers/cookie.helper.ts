import Cookies from 'js-cookie'

export const SaveToken = async (token: string) => {
	Cookies.set('accessToken', token)
}

export const RemoveToken = async () => {
	Cookies.remove('accessToken')
}
