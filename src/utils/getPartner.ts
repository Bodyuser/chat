import { IUser } from "@/shared/types/user/user.types"

export const getPartner = (
	members: IUser[],
	id: number
) => {
	return members.filter(
		(member) => member.id !== id
	)[0]
}
