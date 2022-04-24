import { css } from 'styled-components'

import { Colors, Fonts } from '@/theme'

const textSizeStyles = {
  small: css`
    font-size: 14px;
    padding: 2px 8px;
  `,
  medium: css`
    font-size: 16px;
    padding: 10px 26px;
  `,
  large: css`
    font-size: 20px;
    padding: 12px 26px;
  `
}

const styles = {
  commons: {
    box: css`
      position: relative;
      background-color: transparent;
      border: 0;
      min-width: 130px;
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
      z-index: 1;
    `,
    background: css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    `,
    disabled: css`
      opacity: 0.5;
    `
  },
  web: {
    box: css`
      ${Fonts.getFontStyle('bowlby', 'regular')};
      appearance: none;
      background: none;
      cursor: pointer;
      transition: background-color 0.2s, color 0.2s;
    `,
    disabled: css`
      cursor: not-allowed;
    `
  },
  native: {
    text: css`
      ${Fonts.getFontStyle('bowlby', 'regular', true)};
    `,
    background: css`
      z-index: -1;
    `
  },
  box: (hover = false, disabled = false) => {
    const computedStyle = [styles.commons.box]
    if (hover && !disabled) computedStyle.push(styles.commons.boxHover)

    return computedStyle
  },
  text: size => {
    const sizeStyle = textSizeStyles[size]
    const computedStyle = [styles.commons.text, sizeStyle]

    return computedStyle
  }
}

export default styles
