import { useCallback } from 'react'

import type { Action } from '@/types'

export default () => {
	return useCallback((style: Action.Props['style']) => {
		if (!style) return ''

		return style
	}, [])
}
