import { createRoot } from 'react-dom/client'

import { createModalContainer } from '@/actions/utils'
import Modal from '@/components/base/Modal'

import type { IProps as IPropsModal } from '@/components/base/Modal'
import type { OnAction } from '../useAction'
import type { Action } from '@/types'

type Args = Omit<OnAction, 'it'> & { payload: Action.ActionMap['Common.openModal'] }

export default ({ namespace, primary, data_item, payload }: Args) => {
	const props_modal: IPropsModal = {
		namespace,
		id: data_item ? data_item[primary] : 0,
		config: payload
	}

	return () =>
		new Promise<void>((resolve) => {
			createRoot(createModalContainer(namespace)).render(<Modal {...props_modal}></Modal>)

			resolve()
		})
}
