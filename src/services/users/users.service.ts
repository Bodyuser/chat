import { IUserProfile } from "@/shared/types/user/user.types"

import { getUsersUrl } from "@/helpers/api.helper"
import { instance } from "@/api/instance"

interface IProfileResponse {
	user: IUserProfile
}

export const UsersService = {
	async GetProfile() {
		const user =
			await instance.get<IProfileResponse>(
				getUsersUrl("/profile")
			)
		return user.data
	},

	async DeleteProfile() {
		return await instance.delete(
			getUsersUrl("/profile")
		)
	},
}
