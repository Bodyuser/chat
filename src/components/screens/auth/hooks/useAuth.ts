import { useActions } from "@/hooks/useActions"
import { IRegisterData } from "@/services/auth/auth.interface"
import { useState } from "react"
import {
	SubmitHandler,
	useForm,
} from "react-hook-form"

export const useAuth = () => {
	const [type, setType] = useState<
		"login" | "register"
	>("login")

	const { Login, Register } =
		useActions()

	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<IRegisterData>({
		mode: "onChange",
	})

	const onSubmit: SubmitHandler<
		IRegisterData
	> = async (data) => {
		if (type === "login") {
			Login(data)
		} else {
			Register(data)
		}

		reset()
	}

	return {
		onSubmit,
		handleSubmit,
		register,
		errors,
		type,
		setType,
	}
}
