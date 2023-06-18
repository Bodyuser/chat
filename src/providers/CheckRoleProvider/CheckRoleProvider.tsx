import { useRouter } from "next/router"
import {
	FC,
	PropsWithChildren,
} from "react"

import { useTypedSelector } from "@/hooks/useTypedSelector"

import { TypeComponentAuthField } from "@/shared/types/props-page/props-page.types"

import { ConvertRoleToNumber } from "@/utils/role/ConvertRoleToNumber"

const CheckRoleProvider: FC<
	PropsWithChildren<TypeComponentAuthField>
> = ({
	children,
	Component: {
		isOnlyAdmin,
		isOnlyUser,
	},
}) => {
	const Children = () => <>{children}</>

	const router = useRouter()

	const user = useTypedSelector(
		(state) => state.auth.user
	)
	const isLoading = useTypedSelector(
		(state) => state.auth.isLoading
	)

	const role = ConvertRoleToNumber(
		user?.role
	)

	if (!isLoading) {
		if (
			router.pathname.startsWith(
				"/auth"
			) &&
			role >= 1
		) {
			// @ts-ignore
			router.pathname !== "/chat" &&
				router.replace(
					"/chat",
					undefined,
					{ shallow: true }
				)
		}
		if (isOnlyUser && role === 0) {
			router.pathname !== "/auth" &&
				router.replace(
					"/auth",
					undefined,
					{ shallow: true }
				)
			return null
		}
		if (
			isOnlyAdmin &&
			(!user || role <= 1)
		) {
			router.pathname !== "/404" &&
				router.replace(
					"/404",
					undefined,
					{ shallow: true }
				)
			return null
		}

		if (!isOnlyAdmin && !isOnlyUser)
			return <Children />
		if (role >= 2) return <Children />
		if (role >= 1 && isOnlyUser)
			return <Children />
	}
	return null
}

export default CheckRoleProvider
