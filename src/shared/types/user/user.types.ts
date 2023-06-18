import { UserRole } from "@/shared/enums/UserRole.enum"
import { IDialog } from "../dialog/dialog.types"
import { IMessage } from "../message/message.types"

export interface IUser {
	id: number

	name: string

	email: string

	username: string

	online: boolean

	password: string

	role: UserRole

	createdAt: string

	avatarPath: string

	socketId: string

	messages: IMessage[]

	dialogs?: IDialog[]
}

export interface IUserProfile
	extends Omit<IUser, "password"> {}
export interface IGlobalUser
	extends Omit<IUserProfile, "email"> {}
