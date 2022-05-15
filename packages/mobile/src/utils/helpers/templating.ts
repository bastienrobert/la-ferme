import { ReactNodeArray, ReactNode } from 'react'
import reactStringReplace from 'react-string-replace'

const PARAMS_REGEX = /%(\w*?)%/g

export type TemplatingNode = (
  index: number,
  match?: string
) => ReactNode | ReactNodeArray

export type TemplatingParams = {
  [key: string]: TemplatingNode
}

export default (text: ReactNodeArray | string, params: TemplatingParams) => {
  return reactStringReplace(text, PARAMS_REGEX, (match, i) => {
    const param = params[match]
    return param ? param(i, match) : null
  })
}
