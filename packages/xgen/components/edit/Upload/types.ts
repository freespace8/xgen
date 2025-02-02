import type { UploadProps } from 'antd'
import type { UploadFile } from 'antd/lib/upload/interface'
import type { Component } from '@/types'

interface CommonProps {
	value: Array<string>
	filetype: 'image' | 'file' | 'video'
	desc?: string
}

export interface IProps extends UploadProps, Component.PropsEditComponent, CommonProps {
	api: string
}

export interface CustomProps extends UploadProps, CommonProps {
	api: string | { api: string; params: any }
}

export interface FileType {
	[key: string]: {
		listType: UploadProps<string>['listType']
		className: string
		desc: { [key: string]: string }
		render?: UploadProps['itemRender']
	}
}

export interface IPropsVideo {
	file: UploadFile<string>
	remove: () => void
}

export interface IPropsUploadBtn {
	length: number
	filetype: IProps['filetype']
	maxCount: IProps['maxCount']
	desc: IProps['desc']
}
