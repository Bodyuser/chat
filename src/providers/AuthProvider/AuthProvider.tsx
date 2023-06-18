import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import {
	FC,
	PropsWithChildren,
	useEffect,
} from "react"

import { useActions } from "@/hooks/useActions"
import { useTypedSelector } from "@/hooks/useTypedSelector"

import { TypeComponentAuthField } from "@/shared/types/props-page/props-page.types"
import { SetIsJoined } from "@/redux/components/auth/auth.slice"
import { useDispatch } from "react-redux"
import { socket } from "@/socket/socket.connect"

const DynamicCheckRole = dynamic(
	() =>
		import(
			"../CheckRoleProvider/CheckRoleProvider"
		),
	{ ssr: false }
)

const AuthProvider: FC<
	PropsWithChildren<TypeComponentAuthField>
> = ({
	Component: {
		isOnlyAdmin,
		isOnlyUser,
	},
	children,
}) => {
	const { GetNewToken } = useActions()
	const { pathname } = useRouter()

	const isAuth = useTypedSelector(
		(state) => state.auth.isAuth
	)

	const isJoined = useTypedSelector(
		(state) => state.auth.isJoined
	)

	const id = useTypedSelector(
		(state) => state.auth.user?.id
	)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!isJoined && isAuth && id) {
			socket.emit(
				"join",
				id,
				(msg: any) => {
					console.log(msg)
				}
			)
			dispatch(SetIsJoined(true))
		}
	}, [isAuth, id, isJoined])

	useEffect(() => {
		if (
			isAuth &&
			pathname !== "/profile"
		)
			GetNewToken()
	}, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<DynamicCheckRole
			Component={{
				isOnlyAdmin,
				isOnlyUser,
			}}
		>
			{children}
		</DynamicCheckRole>
	)
}

export default AuthProvider
