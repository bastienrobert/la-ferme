import * as ERRORS from '@la-ferme/shared/errors'

import config from '@/utils/config'

export default error => {
  return ERRORS.tError(error, {
    locale: config.locale
  })
}

export { ERRORS }
