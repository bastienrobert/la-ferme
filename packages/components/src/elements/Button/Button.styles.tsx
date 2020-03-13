import { css } from 'styled-components'

import { Colors } from '@/theme'

const boxVariantStyles = {
  primary: css`
    background: ${Colors.black};
  `,
  secondary: css`
    background: ${Colors.white};
  `
}

const textVariantStyles = {
  primary: css`
    color: ${Colors.white};
  `,
  secondary: css`
    color: ${Colors.black};
  `
}

const boxHoverVariantStyles = {
  primary: css`
    &:hover {
      background: ${Colors.white};
    }
  `,
  secondary: css`
    &:hover {
      background: ${Colors.black};
    }
  `
}

const textHoverVariantStyles = {
  primary: css`
    &:hover {
      color: ${Colors.black};
    }
  `,
  secondary: css`
    &:hover {
      color: ${Colors.white};
    }
  `
}

const boxSizeStyles = {
  small: css`
    padding: 2px 8px;
  `,
  medium: css`
    padding: 4px 16px;
  `,
  large: css`
    padding: 8px 24px;
  `
}

const textSizeStyles = {
  small: css`
    font-size: 14px;
  `,
  medium: css`
    font-size: 16px;
  `,
  large: css`
    font-size: 20px;
  `
}

const styles = {
  commons: {
    box: css`
      border: 2px solid ${Colors.black};
      border-radius: 3px;
    `,
    text: css`
      text-align: center;
    `
  },
  box: (variant, size, hover = false) => {
    const variantStyle = boxVariantStyles[variant]
    const sizeStyle = boxSizeStyles[size]
    const computedStyle = [styles.commons.box, variantStyle, sizeStyle]
    if (hover) computedStyle.push(boxHoverVariantStyles[variant])

    return computedStyle
  },
  text: (variant, size, hover = false) => {
    const variantStyle = textVariantStyles[variant]
    const sizeStyle = textSizeStyles[size]
    const computedStyle = [styles.commons.text, variantStyle, sizeStyle]
    if (hover) computedStyle.push(textHoverVariantStyles[variant])

    return computedStyle
  }
}

export default styles
