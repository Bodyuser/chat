import { createAsyncThunk } from "@reduxjs/toolkit"
import { toastr } from "react-redux-toastr"

import { IUserProfile } from "@/shared/types/user/user.types"

import {
	ILoginData,
	IRegisterData,
} from "@/services/auth/auth.interface"
import { AuthService } from "@/services/auth/auth.service"

import { ToastError } from "@/utils/ToatsrError/ToastrError"

import { returnError } from "@/helpers/api.helper"

export const Login = createAsyncThunk<
	IUserProfile,
	ILoginData
>(
	"auth/signin",
	async (data, thunkApi) => {
		try {
			const response =
				await AuthService.login(data)

			toastr.success(
				"Login",
				"Completed successfully"
			)

			return response.user
		} catch (error) {
			ToastError(error)
			return thunkApi.rejectWithValue(
				error
			)
		}
	}
)

export const Register =
	createAsyncThunk<
		IUserProfile,
		IRegisterData
	>(
		"auth/signup",
		async (data, thunkApi) => {
			try {
				const response =
					await AuthService.register(
						data
					)
				toastr.success(
					"Register",
					"Completed successfully"
				)
				return response.user
			} catch (error) {
				ToastError(error)
				return thunkApi.rejectWithValue(
					error
				)
			}
		}
	)

export const LogOut = createAsyncThunk(
	"auth/logout",
	async (_, thunkApi) => {
		try {
			await AuthService.logout()
			toastr.success(
				"Log Out",
				"Completed successfully"
			)
			return
		} catch (error) {
			ToastError(error)
			return thunkApi.rejectWithValue(
				error
			)
		}
	}
)

export const GetNewToken =
	createAsyncThunk<IUserProfile>(
		"auth/get-new-token",
		async (_, thunkApi) => {
			try {
				return await (
					await AuthService.getNewTokens()
				).user
			} catch (error) {
				if (
					returnError(error) ===
					"jwt expired"
				) {
					toastr.error(
						"Logout",
						"Your authorizaiton is finished, plz sign in again"
					)
					thunkApi.dispatch(LogOut())
				}
				return thunkApi.rejectWithValue(
					error
				)
			}
		}
	)

export const ResetPassword =
	createAsyncThunk<
		string,
		{
			password: string
			resetPasswordLink: string
		}
	>(
		"auth/reset-password",
		async (
			{ password, resetPasswordLink },
			thunkApi
		) => {
			try {
				const response =
					await AuthService.resetPassword(
						resetPasswordLink,
						password
					)
				toastr.success(
					"Reset password",
					"Completed successfully"
				)
				return response
			} catch (error) {
				ToastError(error)
				return thunkApi.rejectWithValue(
					error
				)
			}
		}
	)
