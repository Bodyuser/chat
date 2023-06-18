import { FC, useState } from "react"

import styles from "./Chat.module.scss"
import { useChat } from "./hooks/useChat"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { toastr } from "react-redux-toastr"
import Image from "next/image"
import Dialogs from "./dialogs/Dialogs"
import Dialog from "./dialog/Dialog"
import Notification from "./notification/Notification"
import { useSocketConnect } from "./hooks/useSocketConnect"

const Chat: FC = () => {
	const {
		data,
		mutateAsync,
		activeDialog,
		dialog,
		setActiveDialog,
		setText,
		text,
		sendMessage,
		message,
		refetch,
		readAllMessages,
		setMessage,
		setDialog,
	} = useChat()

	useSocketConnect(
		dialog,
		refetch,
		readAllMessages,
		setMessage,
		data,
		activeDialog,
		setDialog
	)

	if (message) {
		;<Notification message={message} />
	}
	return (
		<div className={styles.chat}>
			{(data?.dialogs ||
				data?.users) && (
				<Dialogs
					activeDialog={activeDialog}
					data={data}
					mutateAsync={mutateAsync}
					setActiveDialog={
						setActiveDialog
					}
				/>
			)}
			{dialog && (
				<Dialog
					dialog={dialog}
					sendMessage={sendMessage}
					setText={setText}
					text={text}
				/>
			)}
			{/* {dialog && (
				<div>
					{
						dialog?.members?.filter(
							(dialog) =>
								dialog.id !== id
						)[0].name
					}
					<input
						type="text"
						placeholder={`Enter message to ${
							dialog?.members?.filter(
								(dialog) =>
									dialog.id !== id
							)[0].name
						}_${
							dialog?.members?.filter(
								(dialog) =>
									dialog.id !== id
							)[0].id
						}`}
						value={text}
						onChange={(e) =>
							setText(e.target.value)
						}
					/>
					<button
						onClick={() =>
							sendMessage({
								text,
								id: dialog.id,
							})
						}
					>
						Send to{" "}
						{
							dialog?.members?.filter(
								(dialog) =>
									dialog.id !== id
							)[0].name
						}
						_$
						{
							dialog?.members?.filter(
								(dialog) =>
									dialog.id !== id
							)[0].id
						}
					</button>
				</div>
			)} */}
		</div>
	)
}

export default Chat
