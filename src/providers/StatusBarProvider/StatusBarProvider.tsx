import Head from "next/head"
import NextProgressBar from "nextjs-progressbar"
import {
	FC,
	PropsWithChildren,
} from "react"

const StatusBarProvider: FC<
	PropsWithChildren
> = ({ children }) => {
	return (
		<>
			<NextProgressBar
				color={"#f4c430"}
				startPosition={0.3}
				stopDelayMs={200}
				height={4}
			/>
			<Head>
				<meta charSet="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1.0"
				/>

				<meta
					name="theme-color"
					content={"#000"}
				/>
				<meta
					name="msapplication-navbutton-color"
					content={"#000"}
				/>
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content={"#000"}
				/>
			</Head>
			{children}
		</>
	)
}

export default StatusBarProvider
