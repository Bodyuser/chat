import { useTypedSelector } from "@/hooks/useTypedSelector"
import { IDialog } from "@/shared/types/dialog/dialog.types"
import { IMessage } from "@/shared/types/message/message.types"
import { IUser } from "@/shared/types/user/user.types"
import { socket } from "@/socket/socket.connect"
import {
	QueryObserverResult,
	RefetchOptions,
	RefetchQueryFilters,
	UseMutateAsyncFunction,
} from "@tanstack/react-query"
import {
	Dispatch,
	SetStateAction,
	useEffect,
} from "react"

export const useSocketConnect = (
	dialog: IDialog | null,
	refetch: <TPageData>(
		options?:
			| (RefetchOptions &
					RefetchQueryFilters<TPageData>)
			| undefined
	) => Promise<
		QueryObserverResult<
			{
				users: IUser[]
				dialogs: any[]
			},
			unknown
		>
	>,
	readAllMessages: UseMutateAsyncFunction<
		IMessage[],
		unknown,
		number,
		unknown
	>,
	setMessage: Dispatch<
		SetStateAction<IMessage | null>
	>,
	data:
		| {
				users: IUser[]
				dialogs: any[]
		  }
		| undefined,
	activeDialog: number | null,
	setDialog: Dispatch<
		SetStateAction<IDialog | null>
	>
) => {
	const id = useTypedSelector(
		(state) => state.auth.user?.id
	)

	useEffect(() => {
		if (dialog) {
			socket.off("notification")
			socket.on(
				"message",
				async (message) => {
					console.log(
						"new message",
						message
					)

					await refetch()
					if (message.user.id !== id) {
						await readAllMessages(
							dialog.id
						)
					}
				}
			)
		} else {
			socket.off("message")
			socket.on(
				"notification",
				async (message) => {
					console.log(
						"notification",
						message
					)

					setMessage(message)
					await refetch()
					setTimeout(() => {
						setMessage(null)
					}, 500)
				}
			)
		}
	}, [dialog])

	useEffect(() => {
		socket.on(
			"read",
			async (dialogId) => {
				await refetch()
			}
		)
		socket.on("online", async () => {
			await refetch()
		})
	}, [])

	useEffect(() => {
		if (activeDialog && data) {
			setDialog((prev) => {
				if (prev?.id) {
					socket.emit(
						"leave-dialog",
						prev.id
					)
				}
				return (
					data.dialogs.find(
						(dialog) =>
							dialog.id === activeDialog
					) || null
				)
			})
			socket.emit(
				"join-dialog",
				data.dialogs.find(
					(dialog) =>
						dialog.id === activeDialog
				)?.id
			)

			if (
				data.dialogs.find(
					(dialog) =>
						dialog.id === activeDialog
				).unreadMessages.length
			) {
				readAllMessages(
					Number(
						data.dialogs.find(
							(dialog) =>
								dialog.id ===
								activeDialog
						)?.id
					)
				)
			}
		}
	}, [activeDialog, data])

	return {}
}
