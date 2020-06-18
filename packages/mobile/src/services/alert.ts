import { AlertContent } from '@/App/Alert/Alert'

import getError from '@/utils/helpers/error'

import bus from '@/services/bus'

const T_ERROR_TITLE = getError('_title')

const alert = (content: AlertContent) => bus.emit('alert', content)
const error = (message: string) => {
  alert({ title: T_ERROR_TITLE, message, large: true })
}

export default { alert, error }
