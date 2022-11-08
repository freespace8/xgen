import { Button, Col, Form, Popover } from 'antd'
import clsx from 'clsx'

import Dynamic from '@/components/x'
import { CheckOutlined } from '@ant-design/icons'

import { useItemText } from '../hooks'

interface IPropsItem {
	item: any
	it: any
	item_key: number
	col_key: number
	onChange: (index: number, v: any) => void
}

const Index = (props: IPropsItem) => {
	const { item, it, item_key, col_key, onChange } = props
	const { value, ...props_no_value } = it.edit.props
	const text = it.edit.type === 'label' ? it.edit.props.value : useItemText(it, item)

	const change = (v: any) => {
		onChange(item_key, v)
	}

	return (
		<Col span={it.width}>
			{it.edit.type === 'label' ? (
				<div className='td_text label w_100 border_box h_100 flex justify_center align_center'>
					<span className='text'>{text}</span>
				</div>
			) : (
				<Popover
					id='dynamic_list_td_popover'
					overlayClassName='td_popover dynamic_list'
					placement='topLeft'
					trigger='click'
					destroyTooltipOnHide={{ keepParent: false }}
					content={
						<Form
							className='w_100 flex'
							name={`quick_table_td_${item_key}_${col_key}`}
							initialValues={{
								[it.key]: item[it.key]
							}}
							onFinish={(v) => change(v)}
						>
							<Dynamic
								type='edit'
								name={it.edit.type.replace(/^\S/, (s: string) => s.toUpperCase())}
								props={{
									...props_no_value,
									name: it.key,
									label: it.title,
									value: item[it.key],
									style: { width: 240 },
									__name: it.title,
									__bind: it.key,
									itemProps: { noStyle: true }
								}}
							></Dynamic>
							<Button
								className='ml_12'
								type='primary'
								htmlType='submit'
								icon={<CheckOutlined></CheckOutlined>}
							></Button>
						</Form>
					}
				>
					<div
						className={clsx([
							'td_text w_100 border_box h_100 flex align_center',
							!item[it.key] && 'empty'
						])}
					>
						<span className='text'>{text}</span>
					</div>
				</Popover>
			)}
		</Col>
	)
}

export default window.$app.memo(Index)
