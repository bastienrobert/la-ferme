import React, { FC } from 'react'
import {
  Svg,
  G,
  Defs,
  Mask,
  ClipPath,
  Rect,
  Path,
  SvgProps
} from 'react-native-svg'

import { Colors } from '@la-ferme/components/native'

export interface GaugeProps extends SvgProps {
  progress: number
}

const Gauge: FC<GaugeProps> = ({ progress = 1, ...props }) => {
  const height = 192.703 * progress

  return (
    <Svg viewBox="0 0 201 201" fill="none" {...props}>
      <G clipPath="url(#clip0)">
        <Path
          d="M89.3395 77.134C89.3395 77.134 86.9275 71.5186 83.013 66.9534C79.0985 62.3882 80.4 59.3506 78.8925 56.5315C77.385 53.7125 72.5886 48.9212 72.5886 48.9212C72.5886 48.9212 72.1515 43.4866 68.2395 39.7882C64.3275 36.0898 60.6291 33.7004 58.8905 30.0046C57.1518 26.3087 54.5413 23.4721 49.1068 18.6983C43.6723 13.9246 43.019 13.2638 39.3206 11.0905C35.6222 8.91715 35.175 5.64588 29.5269 7.16845C23.8788 8.69103 27.5697 15.4296 29.0922 18.2561C30.6148 21.0827 40.3985 31.7382 40.8331 33.2582C41.2678 34.7783 46.9209 39.9993 48.6596 45.4338C50.3982 50.8684 54.0966 56.524 55.8353 58.6973C57.5739 60.8706 56.7046 64.3504 58.8804 66.7373C61.0563 69.1242 61.9231 69.5639 62.5763 72.8251C63.2296 76.0863 63.6642 80.2169 65.8426 83.0434C68.0209 85.87 66.9305 88.4805 66.9305 88.4805C66.9305 88.4805 55.8403 78.9129 51.4912 76.521C47.142 74.1291 41.9261 71.5211 37.7955 73.2547C33.665 74.9884 35.185 80.4304 36.489 83.257C37.793 86.0836 44.9687 96.7366 48.8832 100.216C52.7977 103.696 61.4934 108.696 61.4934 108.696C61.4934 108.696 58.8855 118.48 59.5362 121.306C60.1869 124.133 65.8426 132.829 66.9305 134.57C68.0184 136.311 68.6691 137.178 68.6691 141.102C68.6691 145.027 68.0159 154.582 69.3224 158.941C70.6289 163.3 74.0961 173.074 75.4102 174.594C76.7242 176.114 76.0609 180.466 76.9302 182.634C77.7996 184.802 81.704 191.767 85.8446 193.071C89.9852 194.375 98.0202 194.375 98.0202 194.375C98.0202 194.375 104.327 195.244 106.718 192.201C109.11 189.159 113.676 183.503 113.676 179.807C113.676 176.111 114.763 174.807 117.155 172.197C119.547 169.586 122.155 161.328 123.243 152.195C124.331 143.062 123.894 138.715 126.72 135.236C129.547 131.756 133.253 128.497 132.808 122.191C132.364 115.884 131.723 111.972 133.027 110.231C134.331 108.49 141.941 99.1435 146.29 94.3597C150.639 89.5759 156.509 83.7067 157.813 80.8802C159.117 78.0536 161.943 73.0537 156.943 73.0537C151.943 73.0537 131.065 87.1865 131.065 87.1865C131.065 87.1865 133.456 82.8374 133.891 80.0108C134.326 77.1843 134.544 76.7446 136.283 75.2371C138.022 73.7296 139.979 65.8881 140.414 63.2776C140.848 60.6671 146.72 57.1898 148.454 53.0593C150.187 48.9287 156.064 43.7102 158.456 40.6676C160.848 37.625 166.064 31.5347 169.544 28.7081C173.023 25.8815 176.501 22.1756 176.935 18.9244C177.37 15.6733 176.071 12.814 169.767 13.4723C163.463 14.1306 159.765 17.1707 157.154 19.7787C154.544 22.3867 149.114 26.0851 146.501 27.6051C143.888 29.1252 141.502 31.9543 138.461 34.9994C135.421 38.0446 131.504 40.8686 129.982 43.0394C128.459 45.2102 128.462 47.1725 126.504 50.2151C124.547 53.2577 121.502 56.3029 119.972 58.4787C118.442 60.6545 118.015 62.1746 117.361 65.2172C116.708 68.2599 114.753 69.5664 113.012 71.7497C111.271 73.9331 109.545 77.3853 109.545 77.3853L89.3395 77.134Z"
          fill={Colors.red}
        />
        <Mask
          id="mask0"
          mask-type="alpha"
          x="-33"
          y="-65"
          width="272"
          height="272">
          <Rect
            x="-32.8149"
            y="58.6213"
            width="191.879"
            height={height}
            transform="rotate(-40 -32.8149 58.6213)"
            fill="white"
          />
        </Mask>
        <G mask="url(#mask0)">
          <Path
            d="M89.3392 77.134C89.3392 77.134 86.9272 71.5186 83.0128 66.9534C79.0983 62.3882 80.3998 59.3506 78.8923 56.5315C77.3848 53.7125 72.5884 48.9212 72.5884 48.9212C72.5884 48.9212 72.1512 43.4866 68.2393 39.7882C64.3273 36.0898 60.6289 33.7004 58.8902 30.0046C57.1516 26.3087 54.5411 23.4721 49.1066 18.6983C43.672 13.9246 43.0188 13.2638 39.3204 11.0905C35.622 8.91715 35.1748 5.64588 29.5267 7.16845C23.8786 8.69103 27.5694 15.4296 29.092 18.2561C30.6146 21.0827 40.3982 31.7382 40.8329 33.2582C41.2676 34.7783 46.9207 39.9993 48.6593 45.4338C50.398 50.8684 54.0964 56.524 55.835 58.6973C57.5737 60.8706 56.7044 64.3504 58.8802 66.7373C61.056 69.1242 61.9228 69.5639 62.5761 72.8251C63.2293 76.0863 63.664 80.2169 65.8423 83.0434C68.0207 85.87 66.9302 88.4805 66.9302 88.4805C66.9302 88.4805 55.8401 78.9129 51.4909 76.521C47.1418 74.1291 41.9258 71.5211 37.7953 73.2547C33.6647 74.9884 35.1848 80.4304 36.4888 83.257C37.7928 86.0836 44.9685 96.7366 48.883 100.216C52.7974 103.696 61.4932 108.696 61.4932 108.696C61.4932 108.696 58.8852 118.48 59.536 121.306C60.1867 124.133 65.8423 132.829 66.9302 134.57C68.0182 136.311 68.6689 137.178 68.6689 141.102C68.6689 145.027 68.0156 154.582 69.3221 158.941C70.6286 163.3 74.0959 173.074 75.4099 174.594C76.724 176.114 76.0607 180.466 76.93 182.634C77.7993 184.802 81.7038 191.767 85.8443 193.071C89.9849 194.375 98.0199 194.375 98.0199 194.375C98.0199 194.375 104.326 195.244 106.718 192.201C109.11 189.159 113.675 183.503 113.675 179.807C113.675 176.111 114.763 174.807 117.155 172.197C119.547 169.586 122.155 161.328 123.243 152.195C124.331 143.062 123.894 138.715 126.72 135.236C129.547 131.756 133.253 128.497 132.808 122.191C132.363 115.884 131.723 111.972 133.027 110.231C134.331 108.49 141.941 99.1435 146.29 94.3597C150.639 89.5759 156.508 83.7067 157.812 80.8802C159.116 78.0536 161.943 73.0537 156.943 73.0537C151.943 73.0537 131.064 87.1865 131.064 87.1865C131.064 87.1865 133.456 82.8374 133.891 80.0108C134.326 77.1843 134.544 76.7446 136.283 75.2371C138.021 73.7296 139.979 65.8881 140.413 63.2776C140.848 60.6671 146.72 57.1898 148.453 53.0593C150.187 48.9287 156.064 43.7102 158.456 40.6676C160.848 37.625 166.063 31.5347 169.543 28.7081C173.023 25.8815 176.5 22.1756 176.935 18.9244C177.37 15.6733 176.071 12.814 169.767 13.4723C163.463 14.1306 159.765 17.1707 157.154 19.7787C154.544 22.3867 149.114 26.0851 146.501 27.6051C143.888 29.1252 141.501 31.9543 138.461 34.9994C135.421 38.0446 131.504 40.8686 129.981 43.0394C128.459 45.2102 128.461 47.1725 126.504 50.2151C124.547 53.2577 121.502 56.3029 119.972 58.4787C118.442 60.6545 118.014 62.1746 117.361 65.2172C116.708 68.2599 114.753 69.5664 113.012 71.7497C111.271 73.9331 109.545 77.3853 109.545 77.3853L89.3392 77.134Z"
            fill={Colors.gray}
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect width="201" height="201" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default Gauge