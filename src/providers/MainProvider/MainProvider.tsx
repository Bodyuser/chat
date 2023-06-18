import {
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query"
import {
	FC,
	PropsWithChildren,
} from "react"
import { Provider } from "react-redux"
import ReduxToastr from "react-redux-toastr"

import Layout from "@/components/layout/Layout"

import { TypeComponentAuthField } from "@/shared/types/props-page/props-page.types"

import { store } from "@/redux/store/store"

import AuthProvider from "../AuthProvider/AuthProvider"
import StatusBarProvider from "../StatusBarProvider/StatusBarProvider"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

const MainProvider: FC<
	PropsWithChildren<TypeComponentAuthField>
> = ({ children, Component }) => {
	return (
		<StatusBarProvider>
			<Provider store={store}>
				<QueryClientProvider
					client={queryClient}
				>
					<ReduxToastr
						newestOnTop={false}
						preventDuplicates
						progressBar
						closeOnToastrClick
						timeOut={5000}
						transitionIn="fadeIn"
						className="modal"
						transitionOut="fadeOut"
					/>
					<AuthProvider
						Component={Component}
					>
						<Layout>{children}</Layout>
					</AuthProvider>
				</QueryClientProvider>
			</Provider>
		</StatusBarProvider>
	)
}

export default MainProvider
