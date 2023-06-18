import { UserRole } from "@/shared/enums/UserRole.enum"

export const ConvertRoleToNumber = (
	role: UserRole | null | undefined
) => {
	if (
		role === null ||
		role === undefined
	)
		return 0
	return role === UserRole.OWNER
		? 3
		: role === UserRole.ADMIN
		? 2
		: role === UserRole.USER
		? 1
		: 0
}
