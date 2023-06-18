import { createSlice } from "@reduxjs/toolkit"

import { IUserProfile } from "@/shared/types/user/user.types"

import { initialState } from "@/redux/state/state"

import {
	GetNewToken,
	LogOut,
	Login,
	Register,
	ResetPassword,
} from "./auth.actions"

export const AuthSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		SetUser: (
			state,
			{
				payload,
			}: { payload: IUserProfile }
		) => {
			state.user = payload
		},
		SetIsJoined: (
			state,
			{ payload }
		) => {
			state.isJoined = payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				Register.pending,
				(state) => {
					state.isLoading = true
				}
			)
			.addCase(
				Register.fulfilled,
				(state, { payload }) => {
					state.error = ""
					state.isLoading = false
					state.user = payload
					state.isAuth = true
				}
			)
			.addCase(
				Register.rejected,
				(state, { payload }) => {
					state.user = null
					state.isLoading = false
					state.error = payload
					state.isAuth = false
				}
			)
			.addCase(
				Login.pending,
				(state) => {
					state.isLoading = true
				}
			)
			.addCase(
				Login.fulfilled,
				(state, { payload }) => {
					state.error = ""
					state.isLoading = false
					state.user = payload
					state.isAuth = true
				}
			)
			.addCase(
				Login.rejected,
				(state, { error }) => {
					state.user = null
					state.isLoading = false

					state.error = error
					state.isAuth = false
				}
			)
			.addCase(
				GetNewToken.pending,
				(state) => {
					state.isLoading = true
				}
			)
			.addCase(
				GetNewToken.fulfilled,
				(state, { payload }) => {
					state.error = ""
					state.isLoading = false
					state.user = payload
					state.isAuth = true
				}
			)
			.addCase(
				GetNewToken.rejected,
				(state, { payload }) => {
					state.user = null
					state.isLoading = false
					state.error = payload
					state.isAuth = false
				}
			)
			.addCase(
				LogOut.pending,
				(state) => {
					state.isLoading = true
				}
			)
			.addCase(
				LogOut.fulfilled,
				(state) => {
					state.error = ""
					state.isLoading = false
					state.user = null
					state.isAuth = false
				}
			)
			.addCase(
				LogOut.rejected,
				(state, { payload }) => {
					state.user = null
					state.isLoading = false
					state.error = payload
					state.isAuth = true
				}
			)
			.addCase(
				ResetPassword.pending,
				(state) => {
					state.isLoading = true
				}
			)
			.addCase(
				ResetPassword.fulfilled,
				(state) => {
					state.error = ""
					state.isLoading = false
				}
			)
			.addCase(
				ResetPassword.rejected,
				(state, { payload }) => {
					state.error = payload
				}
			)
	},
})

export const { reducer } = AuthSlice
export const { SetUser, SetIsJoined } =
	AuthSlice.actions
