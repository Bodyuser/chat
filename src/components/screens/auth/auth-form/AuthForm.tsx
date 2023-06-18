import { FC } from "react"

import styles from "./AuthForm.module.scss"
import { useAuth } from "../hooks/useAuth"
import AuthField from "@/components/ui/AuthField/AuthField"
import { validEmail } from "@/shared/regexp"

const AuthForm: FC = () => {
	const {
		errors,
		handleSubmit,
		onSubmit,
		register,
		type,
		setType,
	} = useAuth()

	return (
		<div>
			<h2>
				AUTH / {type.toUpperCase()}
			</h2>
			<form
				onSubmit={handleSubmit(
					onSubmit
				)}
				className={styles.form}
			>
				<AuthField
					{...register("email", {
						required:
							"This field is require",
						pattern: {
							message:
								"This field must be email type",
							value: validEmail,
						},
					})}
					placeholder="Enter email..."
					type="email"
					error={errors.email?.message}
					icon="BsEnvelope"
				/>
				{type === "register" && (
					<AuthField
						{...register("name", {
							required:
								"This field is require",
						})}
						placeholder="Enter name..."
						type="text"
						error={errors.name?.message}
						icon="BsPerson"
					/>
				)}
				<AuthField
					{...register("password", {
						required:
							"This field is require",
						minLength: {
							value: 8,
							message:
								"This field must be length more 8 characters",
						},
					})}
					placeholder="Enter password..."
					type="password"
					error={
						errors.password?.message
					}
					icon="BsEnvelope"
				/>
				<button type="submit">
					{type.toUpperCase()}
				</button>
			</form>
			<button
				onClick={() =>
					setType((prev) =>
						prev === "login"
							? "register"
							: "login"
					)
				}
			>
				{type === "login"
					? "Register"
					: "Login"}
			</button>
		</div>
	)
}

export default AuthForm
