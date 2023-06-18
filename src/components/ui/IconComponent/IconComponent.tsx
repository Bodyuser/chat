import { FC } from 'react'
import * as BootstrapIcons from 'react-icons/bs'

import { useRenderToClient } from '@/hooks/useRenderToClient'

import { IIcon } from './icon.interface'

const IconComponent: FC<IIcon> = ({ name }) => {
	const { isRender } = useRenderToClient()
	const Icon = BootstrapIcons[name]
	if (isRender) return <Icon />
	return null
}

export default IconComponent
