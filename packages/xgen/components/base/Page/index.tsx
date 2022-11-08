import { useMemoizedFn, useTitle } from 'ahooks'
import clsx from 'clsx'
import { observer } from 'mobx-react-lite'

import { useGlobal } from '@/context/app'

import Actions from './components/Actions'
import Left from './components/Left'
import { usePageTitle } from './hooks'
import styles from './index.less'

import type { CSSProperties } from 'react'
import type { IProps, IPropsLeft } from './types'

const Index = (props: IProps) => {
	const { children, className, style, title: props_title, actions = [], isChart, customAction, full } = props
	const global = useGlobal()
	const menu = global.menu.slice()
	const visible_menu = global.visible_menu
	const visible_header = global.visible_header
	const current_menu = menu[global.current_nav] || {}
	const menu_title = current_menu?.children
		? current_menu?.children?.[global.current_menu]?.name
		: current_menu.name
	const title = usePageTitle(menu_title || '', props_title)

	useTitle(`${global.app_info.name} - ${menu[global.current_nav]?.name} - ${title}`)

	const props_left: IPropsLeft = {
		visible_menu,
		title,
		toggleMenu: useMemoizedFn(global.toggleMenu)
	}

	const wrap_style = full
		? ({
				padding: '0 60px',
				maxWidth: '100%'
		  } as CSSProperties)
		: {}

	return (
		<div className={clsx([styles._local, className, isChart ? styles.chart : '', 'relative'])} style={style}>
			<div
				id='page_content_wrap'
				className='page_content_wrap flex flex_column transition_normal'
				style={wrap_style}
			>
				<header
					className={clsx(
						'header w_100 border_box flex justify_between align_center',
						!visible_header ? 'invisible' : ''
					)}
				>
					<Left {...props_left}></Left>
					<div className='options_wrap flex align_center'>
						{customAction}
						<Actions actions={actions}></Actions>
					</div>
				</header>
				<div className='page_wrap'>{children}</div>
			</div>
		</div>
	)
}

export default new window.$app.Handle(Index).by(observer).by(window.$app.memo).get()
