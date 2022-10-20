import { Global } from '@/types'

export declare namespace Action {
	interface OpenModal {
		width?: number
		Form?: {
			type: 'view' | 'edit'
			model: string
		}
		Page?: {
			type: 'chart'
			model: string
		}
	}

	interface HistoryPush {
		pathname: string
		search?: any
	}

	interface Props {
		title: string
		icon: string
		action: {
			'Common.openModal'?: OpenModal
			'Common.historyPush'?: HistoryPush
			'Common.historyBack'?: {}
			'Table.save'?: Global.StringObject
			'Table.delete'?: {}
                  'Yao.service'?: {
                        name: string
                        method: string
                        args:Array<any>
                  },
                  'Yao.studio'?: {
                        host:string
                        name: string
                        method: string
                        args:Array<any>
                  }
		}
		style?: 'danger' | 'success'
		disabled?: {
			bind: string
			value: string | Array<string>
		}
		confirm?: {
			title: string
			desc: string
		}
	}
}
