const PARAMS_REGEX = /%\w*%/g
const TAG_REGEX = /%/g

export type TemplatingParams = { [key: string]: string }

export default (text: string, params: TemplatingParams) => {
  return text.replace(PARAMS_REGEX, match => {
    return params[match.replace(TAG_REGEX, '')] ?? ''
  })
}
