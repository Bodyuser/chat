import { instance } from "@/api/instance"
import { IMessage } from "@/shared/types/message/message.types"

export const MessagesService = {
	async leaveMessage(
		text: string,
		id: number
	) {
		return (
			await instance.post<IMessage>(
				`/messages/${id}`,
				{ text }
			)
		).data
	},

	async readAllMessages(id: number) {
		return (
			await instance.patch<IMessage[]>(
				`/messages/${id}`
			)
		).data
	},
}
