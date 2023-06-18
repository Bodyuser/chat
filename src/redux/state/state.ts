import { IInitialState } from "./state.interface"

export const initialState: IInitialState =
	{
		error: "",
		isLoading: false,
		user: null,
		isAuth: true,
		isJoined: false,
	}
