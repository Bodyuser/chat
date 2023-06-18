import {
	Dispatch,
	FC,
	SetStateAction,
} from "react"

import styles from "./Notification.module.scss"
import { toastr } from "react-redux-toastr"
import { IMessage } from "@/shared/types/message/message.types"
import Image from "next/image"

interface INotification {
	message: IMessage
}

const Notification: FC<
	INotification
> = ({ message }) => {
	toastr.success(
		message.user.name,
		`Пользователь ${message.user.name} написал вам: ${message.text}`,
		{
			icon: (
				<div>
					<Image
						src={String(
							message?.user.avatarPath
						)}
						alt={message.user.name}
						width={70}
						height={70}
					/>
				</div>
			),
		}
	)

	return null
}

export default Notification
