import {
	Dispatch,
	FC,
	SetStateAction,
} from "react"

import styles from "./Dialogs.module.scss"
import { IDialog } from "@/shared/types/dialog/dialog.types"
import { IUser } from "@/shared/types/user/user.types"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { UseMutateAsyncFunction } from "@tanstack/react-query"
import DialogItem from "./dialog-item/DialogItem"

interface IDialogs {
	data:
		| {
				dialogs: IDialog[]
				users: IUser[]
		  }
		| undefined
	mutateAsync: UseMutateAsyncFunction<
		IDialog,
		unknown,
		number,
		unknown
	>
	activeDialog: number | null
	setActiveDialog: Dispatch<
		SetStateAction<number | null>
	>
}

const Dialogs: FC<IDialogs> = ({
	data,
	activeDialog,
	mutateAsync,
	setActiveDialog,
}) => {
	return (
		<div className={styles.dialogs}>
			{data?.dialogs.length
				? data?.dialogs.map(
						(dialog) => (
							<DialogItem
								key={dialog.id}
								type="dialog"
								dialog={dialog}
								setActiveDialog={
									setActiveDialog
								}
							/>
						)
				  )
				: null}
			{data?.users.length
				? data.users.map((user) => (
						<DialogItem
							key={user.id}
							type="user"
							user={user}
							setActiveDialog={
								setActiveDialog
							}
							mutateAsync={mutateAsync}
						/>
				  ))
				: null}
		</div>
	)
}

export default Dialogs
