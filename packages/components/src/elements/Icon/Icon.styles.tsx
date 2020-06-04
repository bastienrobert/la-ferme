import { css } from 'styled-components'

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
    backgroundWrapper: css`
      margin: 15px;
    `,
    background: css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    `
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
