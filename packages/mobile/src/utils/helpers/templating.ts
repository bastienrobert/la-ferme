import { ReactNode } from 'react'
import reactStringReplace from 'react-string-replace'

const PARAMS_REGEX = /%(\w*?)%/g

type TemplatingNode = (index: number, match?: string) => ReactNode

export type TemplatingParams = {
  [key: string]: TemplatingNode
}

export default (text: string, params: TemplatingParams) => {
  return reactStringReplace(text, PARAMS_REGEX, (match, i) => {
    const param = params[match]
    return param ? param(i, match) : null
  })
}
