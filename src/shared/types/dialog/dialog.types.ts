import { IMessage } from "../message/message.types"
import { IUser } from "../user/user.types"

export interface IDialog {
	id: number

	createdAt: string

	members?: IUser[]

	messages: IMessage[]
}
