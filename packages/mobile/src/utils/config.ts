import Config from 'react-native-config'
import { Locale } from '@la-ferme/shared/typings'

export default {
  api: '10.0.2.2:4000',
  // api: Config.API || 'localhost:4000',
  ssl: Config.SSL || false,
  locale: 'fr' as Locale
}
