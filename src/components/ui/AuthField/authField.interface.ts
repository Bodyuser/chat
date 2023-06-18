import { TypeIcon } from '@/shared/types/icon/icon.types'

export interface IAuthField {
	type: string
	placeholder: string
	icon: TypeIcon
	error?: any
}
