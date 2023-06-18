import {
	FC,
	Dispatch,
	SetStateAction,
} from "react"

import styles from "./Dialog.module.scss"
import { IDialog } from "@/shared/types/dialog/dialog.types"
import { getPartner } from "@/utils/getPartner"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { UseMutateAsyncFunction } from "@tanstack/react-query"
import { IMessage } from "@/shared/types/message/message.types"
import IconComponent from "@/components/ui/IconComponent/IconComponent"
import cn from "classnames"

interface ICurrentDialog {
	dialog: IDialog
	sendMessage: UseMutateAsyncFunction<
		IMessage,
		unknown,
		{
			text: string
			id: number
		},
		unknown
	>
	setText: Dispatch<
		SetStateAction<string>
	>
	text: string
}

const Dialog: FC<ICurrentDialog> = ({
	dialog,
	sendMessage,
	setText,
	text,
}) => {
	const id = useTypedSelector(
		(state) => state.auth.user?.id
	)
	const partner = getPartner(
		dialog.members || [],
		Number(id)
	)

	return (
		<div className={styles.dialog}>
			<div className={styles.info}>
				{partner.email}
			</div>
			{dialog.messages.length && (
				<div
					className={styles.messages}
				>
					{dialog.messages.map(
						(message) => (
							<div
								key={message.id}
								className={cn({
									[styles.me]:
										message.user.id ===
										id,
								})}
							>
								<div>
									{message.user.name}
								</div>
								<div>
									<div>
										{message.text}
									</div>
									{message.user.id ===
										id && (
										<div>
											<IconComponent
												name={
													message.read
														? "BsCheckAll"
														: "BsCheck"
												}
											/>
										</div>
									)}
								</div>
							</div>
						)
					)}
				</div>
			)}
			<div className={styles.form}>
				<input
					type="text"
					placeholder="Enter text..."
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
					Send
				</button>
			</div>
		</div>
	)
}

export default Dialog
