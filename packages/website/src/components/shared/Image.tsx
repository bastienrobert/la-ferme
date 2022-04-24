import React, { FC } from 'react'

type HTMLImageType = React.ImgHTMLAttributes<HTMLImageElement>

export interface ImageProps extends HTMLImageType {}

const Image: FC<ImageProps> = ({ ...props }) => {
  return <img {...props} />
}

export default Image
