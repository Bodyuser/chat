import { IResponseMessage } from "@/shared/types/response-message/response-message.types"

import {
	IAuthResponse,
	ILoginData,
	IRegisterData,
} from "./auth.interface"
import { axiosClassic } from "@/api/axiosClassic"
import { getAuthUrl } from "@/helpers/api.helper"
import { SaveToken } from "@/helpers/cookie.helper"
import { instance } from "@/api/instance"

export const AuthService = {
	async login(data: ILoginData) {
		const response =
			await axiosClassic.post<IAuthResponse>(
				getAuthUrl("/login"),
				data
			)

		if (response.data.token) {
			await SaveToken(
				response.data.token
			)
		}
		return response.data
	},
	async register(data: IRegisterData) {
		const response =
			await axiosClassic.post<IAuthResponse>(
				getAuthUrl("/register"),
				data
			)

		if (response.data.token) {
			await SaveToken(
				response.data.token
			)
		}
		return response.data
	},
	async logout() {
		await axiosClassic.get(
			`${getAuthUrl("/logout")}`
		)
		return
	},
	async getNewTokens() {
		const response =
			await axiosClassic.get<IAuthResponse>(
				`${getAuthUrl("/token")}`
			)
		if (response.data.token) {
			await SaveToken(
				response.data.token
			)
		}
		return response.data
	},
	async resetPassword(
		resetLink: string,
		password: string
	) {
		const response =
			await axiosClassic.post<IResponseMessage>(
				getAuthUrl(
					`/reset/${resetLink}`
				),
				{
					password,
				}
			)
		return response.data.message
	},
	async checkResetLink(
		resetLink: string
	) {
		const response =
			await axiosClassic.get<IResponseMessage>(
				getAuthUrl(
					`/reset/${resetLink}`
				)
			)
		return response.data.message
	},
}
