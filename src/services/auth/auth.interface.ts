import { IUser } from "@/shared/types/user/user.types"

export interface ILoginData {
	email: string
	password: string
}

export interface IRegisterData {
	email: string
	name: string
	password: string
}

export interface IAuthResponse {
	user: IUser
	token: string
}
