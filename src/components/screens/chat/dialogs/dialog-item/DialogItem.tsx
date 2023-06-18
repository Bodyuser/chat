import {
	Dispatch,
	FC,
	SetStateAction,
} from "react"

import styles from "./DialogItem.module.scss"
import { IDialog } from "@/shared/types/dialog/dialog.types"
import { IUser } from "@/shared/types/user/user.types"
import Image from "next/image"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { getPartner } from "@/utils/getPartner"
import { UseMutateAsyncFunction } from "@tanstack/react-query"
import IconComponent from "@/components/ui/IconComponent/IconComponent"

interface IDialogItem {
	type: "dialog" | "user"
	dialog?: any
	user?: IUser
	mutateAsync?: UseMutateAsyncFunction<
		IDialog,
		unknown,
		number,
		unknown
	>
	setActiveDialog: Dispatch<
		SetStateAction<number | null>
	>
}

const DialogItem: FC<IDialogItem> = ({
	type,
	dialog,
	user,
	mutateAsync,
	setActiveDialog,
}) => {
	const id = useTypedSelector(
		(state) => state.auth.user?.id
	)
	const partner = getPartner(
		dialog?.members || [],
		Number(id)
	)
	return (
		<div
			onClick={async () => {
				if (
					type === "user" &&
					mutateAsync
				) {
					const data =
						await mutateAsync(
							Number(user?.id)
						)
					setActiveDialog(data.id)
				} else {
					setActiveDialog(
						Number(dialog?.id)
					)
				}
			}}
			className={styles.item}
		>
			{type === "dialog" ? (
				<>
					<div>
						<Image
							src={partner.avatarPath}
							alt={partner.name}
							height={70}
							width={70}
						/>
					</div>
					<div>
						<span
							className={styles.name}
						>
							{partner.name}
							<p>
								<IconComponent
									name={
										partner.online
											? "BsCircleFill"
											: "BsCCircle"
									}
								/>
							</p>
						</span>
						{dialog?.messages
							.length && (
							<span
								className={
									styles.message
								}
							>
								{
									dialog?.messages[
										dialog.messages
											.length - 1
									].text
								}
							</span>
						)}
						<span>
							{
								dialog.unreadMessages
									.length
							}
						</span>
					</div>
				</>
			) : (
				<>
					<div>
						<Image
							src={String(
								user?.avatarPath
							)}
							alt={String(user?.name)}
							height={70}
							width={70}
						/>
					</div>
					<div>
						<span
							className={styles.name}
						>
							{String(user?.name)}
							<p>
								<IconComponent
									name={
										user?.online
											? "BsCircleFill"
											: "BsCCircle"
									}
								/>
							</p>
						</span>
					</div>
				</>
			)}
		</div>
	)
}

export default DialogItem
