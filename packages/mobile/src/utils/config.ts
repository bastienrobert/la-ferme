import Config from 'react-native-config'
import { Locale } from '@la-ferme/shared/typings'

export default {
  api: Config.API || 'localhost:4000',
  ssl: Config.SSL || false,
  locale: 'fr' as Locale
}
