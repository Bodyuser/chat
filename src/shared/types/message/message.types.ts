import { IDialog } from "../dialog/dialog.types"
import { IUser } from "../user/user.types"

export interface IMessage {
	id: number

	text: string

	read: boolean

	createdAt: string

	user: IUser

	dialog: IDialog
}
