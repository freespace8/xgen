import clsx from 'clsx'
import { useMemo } from 'react'

import { getTemplateValue } from '@/utils'

import Section from '../Section'
import styles from './index.less'

import type { IPropsSections, IPropsSection } from '../../types'

const Index = (props: IPropsSections) => {
	const { namespace, primary, type, data, sections } = props

      const _sections = useMemo(() => getTemplateValue(sections, data), [ sections, data ])

	const props_section: Omit<IPropsSection, 'item'> = {
		namespace,
		primary,
		type
	}

	return (
		<div className={clsx([styles._local, 'w_100 border_box flex flex_column'])}>
			{_sections.map((item, index) => (
				<Section {...props_section} item={item} key={index}></Section>
			))}
		</div>
	)
}

export default window.$app.memo(Index)
