import { FC } from "react"

import styles from "./Auth.module.scss"

import AuthForm from "./auth-form/AuthForm"

const Auth: FC = () => {
	return (
		<div className={styles.auth}>
			<AuthForm />
		</div>
	)
}

export default Auth
