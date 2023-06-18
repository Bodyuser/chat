import { IUserProfile } from "@/shared/types/user/user.types"

export interface IInitialState {
	error: any
	isLoading: boolean
	user: IUserProfile | null
	isAuth: boolean
	isJoined: boolean
}
