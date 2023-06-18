import Cookies from "js-cookie"
import io from "socket.io-client"

export const socket = io(
	String(process.env.API_URL),
	{
		auth: {
			isAuth: !!Cookies.get(
				"accessToken"
			),
		},
	}
)
