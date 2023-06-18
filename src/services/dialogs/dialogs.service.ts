import { axiosClassic } from "@/api/axiosClassic"
import { instance } from "@/api/instance"
import { getDialogsUrl } from "@/helpers/api.helper"
import { IDialog } from "@/shared/types/dialog/dialog.types"
import { IUser } from "@/shared/types/user/user.types"

export const DialogsService = {
	async createOrGetDialog(id: number) {
		return (
			await instance.post<IDialog>(
				getDialogsUrl(`/${id}`)
			)
		).data
	},

	async getMyDialogs() {
		return (
			await instance.get<{
				users: IUser[]
				dialogs: any[]
			}>(getDialogsUrl("/my"))
		).data
	},
}
