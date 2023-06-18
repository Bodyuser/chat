import { useTypedSelector } from "@/hooks/useTypedSelector"
import { DialogsService } from "@/services/dialogs/dialogs.service"
import { MessagesService } from "@/services/messages/messages.service"
import { IDialog } from "@/shared/types/dialog/dialog.types"
import { IMessage } from "@/shared/types/message/message.types"
import { socket } from "@/socket/socket.connect"
import {
	useMutation,
	useQuery,
} from "@tanstack/react-query"
import { useState } from "react"

export const useChat = () => {
	const [
		activeDialog,
		setActiveDialog,
	] = useState<number | null>(null)
	const [dialog, setDialog] =
		useState<IDialog | null>(null)
	const [text, setText] =
		useState<string>("")
	const [message, setMessage] =
		useState<IMessage | null>(null)

	const { data, refetch } = useQuery(
		["get dialogs"],
		() => DialogsService.getMyDialogs()
	)

	const { mutateAsync } = useMutation(
		["get dialogs"],
		(id: number) =>
			DialogsService.createOrGetDialog(
				id
			),
		{
			async onSuccess() {
				await refetch()
			},
		}
	)

	const {
		mutateAsync: readAllMessages,
	} = useMutation(
		["read all dialogs"],
		(id: number) =>
			MessagesService.readAllMessages(
				id
			),
		{
			async onSuccess(data) {
				await refetch()
				socket.emit("read", {
					userId: data[0].dialog.id,
					dialogId: data[0].user.id,
				})
			},
		}
	)

	const { mutateAsync: sendMessage } =
		useMutation(
			["leave message"],
			({
				text,
				id,
			}: {
				text: string
				id: number
			}) =>
				MessagesService.leaveMessage(
					text,
					id
				),
			{
				async onSuccess() {
					setText("")
					await refetch()
				},
			}
		)

	return {
		data,
		mutateAsync,
		activeDialog,
		setActiveDialog,
		dialog,
		text,
		setText,
		sendMessage,
		message,
		refetch,
		readAllMessages,
		setMessage,
		setDialog,
	}
}
