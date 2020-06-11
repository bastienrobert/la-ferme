import { AlertContent } from '@/App/Alert/Alert'

import bus from '@/services/bus'

export default (alert: AlertContent) => bus.emit('alert', alert)
