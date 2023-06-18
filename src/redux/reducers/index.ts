import { reducer as toastrReducer } from 'react-redux-toastr'

import { reducer as AuthReducer } from '../components/auth/auth.slice'

export const RootReducer = {
	auth: AuthReducer,
	toastr: toastrReducer,
}
