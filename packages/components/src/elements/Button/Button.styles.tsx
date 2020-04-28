import { css } from 'styled-components'

import { Colors, Fonts } from '@/theme'

const textSizeStyles = {
  small: css`
    font-size: 14px;
    padding: 2px 8px;
  `,
  medium: css`
    font-size: 16px;
    padding: 10px 16px;
  `,
  large: css`
    font-size: 20px;
    padding: 8px 24px;
  `
}

const styles = {
  commons: {
    box: css`
      position: relative;
      background-color: transparent;
      border: 0;
    `,
    boxHover: css`
      svg {
        transition: opacity 0.2s;
      }

      &:hover {
        svg {
          opacity: 0.5;
        }
      }
    `,
    text: css`
      color: ${Colors.gray};
      text-align: center;
    `,
    background: css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    `,
    disabled: css`
      opacity: 0.5;
    `
  },
  web: css`
    ${Fonts.getFontStyle('bowlby', 'regular')};
    appearance: none;
    background: none;
  `,
  native: {
    text: css`
      ${Fonts.getFontStyle('bowlby', 'regular', true)};
    `
  },
  box: (hover = false) => {
    const computedStyle = [styles.commons.box]
    if (hover) computedStyle.push(styles.commons.boxHover)

    return computedStyle
  },
  text: size => {
    const sizeStyle = textSizeStyles[size]
    const computedStyle = [styles.commons.text, sizeStyle]

    return computedStyle
  }
}

export default styles
