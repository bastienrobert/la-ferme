import { css } from 'styled-components'

import { Colors } from '@/theme'

const styles = {
  commons: {
    container: css`
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border: 0;
      padding: 0;
      margin: 0;
    `,
    wrapper: css`
      display: flex;
      width: 26px;
      height: 26px;
      justify-content: center;
      align-items: center;
    `,
    background: {
      container: color =>
        color
          ? css`
              background-color: ${Colors[color]};
              border-radius: 28px;
            `
          : null,
      wrapper: css`
        margin: 15px;
      `
    }
  },
  disabled: css`
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  `,
  web: css`
    display: inline-flex;
    appearance: none;
    background: none;
  `
}

export default styles
