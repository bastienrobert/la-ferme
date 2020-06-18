import { createGlobalStyle } from 'styled-components'

import BowlbyOneSCRegularEOT from '../assets/fonts/BowlbyOneSC/BowlbyOneSC-Regular.eot'
import BowlbyOneSCRegularWOFF2 from '../assets/fonts/BowlbyOneSC/BowlbyOneSC-Regular.woff2'
import BowlbyOneSCRegularWOFF from '../assets/fonts/BowlbyOneSC/BowlbyOneSC-Regular.woff'
import BowlbyOneSCRegularTTF from '../assets/fonts/BowlbyOneSC/BowlbyOneSC-Regular.ttf'

import FuturaLTBookEOT from '../assets/fonts/FuturaLT/FuturaLT-Book.eot'
import FuturaLTBookWOFF2 from '../assets/fonts/FuturaLT/FuturaLT-Book.woff2'
import FuturaLTBookWOFF from '../assets/fonts/FuturaLT/FuturaLT-Book.woff'
import FuturaLTBookTTF from '../assets/fonts/FuturaLT/FuturaLT-Book.ttf'

import FuturaLTBoldEOT from '../assets/fonts/FuturaLT/FuturaLT-Bold.eot'
import FuturaLTBoldWOFF2 from '../assets/fonts/FuturaLT/FuturaLT-Bold.woff2'
import FuturaLTBoldWOFF from '../assets/fonts/FuturaLT/FuturaLT-Bold.woff'
import FuturaLTBoldTTF from '../assets/fonts/FuturaLT/FuturaLT-Bold.ttf'

import THANKYOUKOBEEOT from '../assets/fonts/THANKYOUKOBE/THANKYOUKOBE.eot'
import THANKYOUKOBEWOFF2 from '../assets/fonts/THANKYOUKOBE/THANKYOUKOBE.woff2'
import THANKYOUKOBEWOFF from '../assets/fonts/THANKYOUKOBE/THANKYOUKOBE.woff'
import THANKYOUKOBETTF from '../assets/fonts/THANKYOUKOBE/THANKYOUKOBE.ttf'

export default createGlobalStyle`
  @font-face {
    font-family: 'BowlbyOneSC-Regular';
    src: url(${BowlbyOneSCRegularEOT});
    src: url('${BowlbyOneSCRegularEOT}?#iefix') format('embedded-opentype'),
        url(${BowlbyOneSCRegularWOFF2}) format('woff2'),
        url(${BowlbyOneSCRegularWOFF}) format('woff'),
        url(${BowlbyOneSCRegularTTF}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
    
  @font-face {
    font-family: 'FuturaLT-Book';
    src: url(${FuturaLTBookEOT});
    src: url('${FuturaLTBookEOT}?#iefix') format('embedded-opentype'),
        url(${FuturaLTBookWOFF}) format('woff2'),
        url(${FuturaLTBookWOFF2}) format('woff'),
        url(${FuturaLTBookTTF}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'FuturaLT-Bold';
    src: url(${FuturaLTBoldEOT});
    src: url('${FuturaLTBoldEOT}?#iefix') format('embedded-opentype'),
        url(${FuturaLTBoldWOFF}) format('woff2'),
        url(${FuturaLTBoldWOFF2}) format('woff'),
        url(${FuturaLTBoldTTF}) format('truetype');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'THANKYOUKOBE';
    src: url(${THANKYOUKOBEEOT});
    src: url('${THANKYOUKOBEEOT}?#iefix') format('embedded-opentype'),
        url(${THANKYOUKOBEWOFF2}) format('woff2'),
        url(${THANKYOUKOBEWOFF}) format('woff'),
        url(${THANKYOUKOBETTF}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`
