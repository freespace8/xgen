import { useMemoizedFn } from 'ahooks'
import { Form } from 'antd'
import to from 'await-to-js'
import clsx from 'clsx'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { When } from 'react-if'

import Actions from './components/Actions'
import Reference from './components/Reference'
import Sections from './components/Sections'
import { useOnValuesChange } from './hooks'
import styles from './index.less'

import type { IPropsPureForm, IPropsActions, IPropsSections, IPropsReference } from './types'

const { useForm } = Form

const Index = (props: IPropsPureForm) => {
	const {
		parent,
		namespace,
		primary,
		type,
		id,
		data,
		sections,
		actions,
		hooks,
		title,
		disabledActionsAffix,
		props: form_props = {},
		setData,
		setSetting,
		onSave
	} = props
	const [form] = useForm()
	const { getFieldsValue, setFieldsValue, resetFields, validateFields } = form
	const onValuesChange = useOnValuesChange(hooks?.onChange!, setData, setSetting)
	const form_container = useRef<HTMLDivElement>(null)
	const { onLoadSync, reference, showSectionDivideLine } = form_props
	const disabled = type === 'view'
	const [visible_flat_content, setVisibleFlatContent] = useState(!!reference?.flatContent?.defaultOpen)

	const toggleFlatContent = useMemoizedFn(() => setVisibleFlatContent(!visible_flat_content))

	const submit = useMemoizedFn(async () => {
		const [err] = await to(validateFields())

		if (err) return Promise.reject()

		return onSave(getFieldsValue(true))
	})

	useLayoutEffect(() => {
		if (id === 0) resetFields()
	}, [id])

	useLayoutEffect(() => {
		setFieldsValue(data)

		if (!Object.keys(data).length) return
		if (!onLoadSync) return

		Object.keys(data).map((key) => onValuesChange({ [key]: data[key] }))
	}, [data, onLoadSync])

	useLayoutEffect(() => {
		window.$app.Event.on(`${namespace}/submit`, submit)

		return () => window.$app.Event.off(`${namespace}/submit`, submit)
	}, [])

	const props_actions: IPropsActions = {
		namespace,
		primary,
		type,
		id,
		actions,
		data,
		disabledActionsAffix
	}

	const props_sections: IPropsSections = {
		namespace,
		primary,
		type,
		data,
		sections,
		showSectionDivideLine
	}

	const props_reference: IPropsReference = {
		parent,
		namespace,
		data,
		reference,
		container: form_container,
		visible_flat_content,
		toggleFlatContent
	}

	const form_styles = useMemo(() => {
		if (parent !== 'Page') return { maxWidth: '100%', flexGrow: 1, flexShrink: 1000 }

		const raw_width = reference?.flatContent?.payload?.width || 600
		const flat_content_width = typeof raw_width === 'number' ? `${raw_width}px` : raw_width

		return { maxWidth: visible_flat_content ? `calc(100% - ${flat_content_width})` : '100%' }
	}, [parent, visible_flat_content, reference?.flatContent])

	return (
		<div
			className={clsx([
				styles._local,
				disabled && styles.disabled,
				'w_100 border_box flex flex_column relative'
			])}
			ref={form_container}
		>
			<div className='form_title_wrap w_100 border_box flex justify_between align_center relative'>
				<span className='title no_wrap'>{title}</span>
				<Actions {...props_actions}></Actions>
			</div>
			<div className='form_content_container w_100 flex relative'>
				<Form
					form={form}
					name={namespace}
					disabled={disabled}
					layout='vertical'
					onValuesChange={onValuesChange}
					style={form_styles}
				>
					<div className='form_wrap w_100 border_box'>
						<Sections {...props_sections}></Sections>
					</div>
				</Form>
				<When condition={!!form_props?.reference}>
					<Reference {...props_reference}></Reference>
				</When>
			</div>
		</div>
	)
}

export default window.$app.memo(Index)
