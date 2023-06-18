import "@/assets/styles/globals.scss"
import MainProvider from "@/providers/MainProvider/MainProvider"
import { TypeComponentAuthField } from "@/shared/types/props-page/props-page.types"
import type { AppProps } from "next/app"

type AppAuthProps = AppProps &
	TypeComponentAuthField

export default function App({
	Component,
	pageProps,
}: AppAuthProps) {
	return (
		<MainProvider Component={Component}>
			<Component {...pageProps} />
		</MainProvider>
	)
}
