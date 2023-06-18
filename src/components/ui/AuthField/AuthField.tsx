import {
	forwardRef,
	useState,
} from "react"

import IconComponent from "../IconComponent/IconComponent"

import styles from "./AuthField.module.scss"
import { IAuthField } from "./authField.interface"

const AuthField = forwardRef<
	HTMLInputElement,
	IAuthField
>(
	(
		{
			placeholder,
			error,
			type,
			icon,
			...rest
		},
		ref
	) => {
		const [authType, setAuthType] =
			useState(type)
		return (
			<div className={styles.field}>
				<div className={styles.input}>
					<IconComponent name={icon} />
					<input
						{...rest}
						type={authType}
						placeholder={placeholder}
						ref={ref}
						autoComplete="false"
					/>
					{type === "password" && (
						<button
							onClick={() =>
								setAuthType((prev) =>
									prev === "text"
										? "password"
										: "text"
								)
							}
							type="button"
						>
							<IconComponent
								name={
									authType === "text"
										? "BsEyeSlash"
										: "BsEye"
								}
							/>
						</button>
					)}
				</div>
				{error?.message && (
					<div className={styles.error}>
						{error.message}
					</div>
				)}
			</div>
		)
	}
)

AuthField.displayName = "Field"

export default AuthField
