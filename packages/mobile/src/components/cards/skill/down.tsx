import React, { FC } from 'react'
import { Colors } from '@la-ferme/components/native'

import { Svg, Path, SvgProps } from 'react-native-svg'

export const WIDTH = 352
export const HEIGHT = 94
export const RATIO = WIDTH / HEIGHT

const CardSkillDown: FC<SvgProps> = props => {
  return (
    <Svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} fill="none" {...props}>
      <Path
        fill={Colors.beige}
        d="M19.2888 0C19.2901 2.53273 18.7921 5.0409 17.8234 7.38121C16.8546 9.72152 15.434 11.8481 13.6428 13.6395C11.8515 15.4309 9.72468 16.8519 7.3838 17.8214C5.04293 18.791 2.53388 19.29 0 19.29L0 73.7C0.0131841 79.0764 2.15439 84.2291 5.95593 88.0326C9.75747 91.8362 14.9104 93.9815 20.2892 94H331.711C337.09 93.9841 342.245 91.8397 346.047 88.0356C349.849 84.2314 351.989 79.0772 352 73.7V19.29C349.466 19.29 346.957 18.791 344.616 17.8214C342.275 16.8519 340.148 15.4309 338.357 13.6395C336.566 11.8481 335.145 9.72152 334.177 7.38121C333.208 5.0409 332.71 2.53273 332.711 0L321.476 0C321.476 0.726693 321.187 1.42362 320.673 1.93747C320.159 2.45132 319.462 2.74 318.735 2.74C318.374 2.74266 318.017 2.67361 317.683 2.53685C317.349 2.40009 317.046 2.19837 316.791 1.9434C316.536 1.68844 316.334 1.38533 316.197 1.05169C316.06 0.718059 315.991 0.360564 315.994 0L304.668 0C304.671 0.360564 304.602 0.718059 304.465 1.05169C304.328 1.38533 304.127 1.68844 303.872 1.9434C303.616 2.19837 303.313 2.40009 302.979 2.53685C302.646 2.67361 302.288 2.74266 301.927 2.74C301.567 2.74132 301.21 2.67135 300.877 2.53412C300.543 2.39689 300.241 2.19512 299.986 1.94042C299.731 1.68572 299.529 1.38314 299.392 1.05011C299.255 0.717086 299.185 0.360192 299.186 0L287.881 0C287.882 0.361038 287.812 0.718755 287.674 1.05244C287.536 1.38613 287.333 1.68916 287.077 1.94399C286.822 2.19882 286.518 2.40038 286.183 2.53702C285.849 2.67366 285.491 2.74265 285.13 2.74C284.771 2.73869 284.416 2.66678 284.085 2.52837C283.754 2.38996 283.454 2.18777 283.201 1.93334C282.949 1.6789 282.749 1.37721 282.612 1.04549C282.476 0.713767 282.407 0.358509 282.408 0L271.123 0C271.127 0.358399 271.06 0.714025 270.926 1.04629C270.791 1.37855 270.592 1.68085 270.34 1.93568C270.088 2.19052 269.787 2.39282 269.457 2.53088C269.126 2.66894 268.771 2.74002 268.412 2.74C268.046 2.74935 267.682 2.68538 267.341 2.55187C267.001 2.41836 266.69 2.21802 266.428 1.96265C266.166 1.70728 265.958 1.40206 265.816 1.06498C265.674 0.727899 265.601 0.365789 265.601 0L254.296 0C254.297 0.360192 254.227 0.717086 254.09 1.05011C253.952 1.38314 253.75 1.68572 253.496 1.94042C253.241 2.19512 252.938 2.39689 252.605 2.53412C252.272 2.67135 251.915 2.74132 251.554 2.74C251.195 2.74 250.839 2.66906 250.507 2.53124C250.175 2.39342 249.873 2.19143 249.62 1.93687C249.366 1.68231 249.165 1.38017 249.028 1.0478C248.891 0.715423 248.822 0.359349 248.823 0L237.518 0C237.518 0.726693 237.229 1.42362 236.715 1.93747C236.201 2.45132 235.504 2.74 234.777 2.74C234.05 2.74 233.352 2.45132 232.838 1.93747C232.324 1.42362 232.035 0.726693 232.035 0L220.71 0C220.713 0.360564 220.644 0.718059 220.507 1.05169C220.37 1.38533 220.168 1.68844 219.913 1.9434C219.658 2.19837 219.355 2.40009 219.021 2.53685C218.687 2.67361 218.33 2.74266 217.969 2.74C217.609 2.74132 217.252 2.67135 216.918 2.53412C216.585 2.39689 216.283 2.19512 216.028 1.94042C215.773 1.68572 215.571 1.38314 215.434 1.05011C215.297 0.717086 215.227 0.360192 215.228 0L203.923 0C203.924 0.359349 203.854 0.715423 203.718 1.0478C203.581 1.38017 203.38 1.68231 203.126 1.93687C202.873 2.19143 202.571 2.39342 202.239 2.53124C201.907 2.66906 201.551 2.74 201.191 2.74C200.831 2.74132 200.474 2.67135 200.141 2.53412C199.808 2.39689 199.505 2.19512 199.25 1.94042C198.995 1.68572 198.793 1.38314 198.656 1.05011C198.519 0.717086 198.449 0.360192 198.45 0L187.145 0C187.146 0.360192 187.076 0.717086 186.939 1.05011C186.802 1.38314 186.6 1.68572 186.345 1.94042C186.09 2.19512 185.788 2.39689 185.454 2.53412C185.121 2.67135 184.764 2.74132 184.404 2.74C184.044 2.74 183.688 2.66906 183.356 2.53124C183.024 2.39342 182.723 2.19143 182.469 1.93687C182.215 1.68231 182.014 1.38017 181.878 1.0478C181.741 0.715423 181.671 0.359349 181.673 0L170.337 0C170.34 0.360564 170.271 0.718059 170.134 1.05169C169.997 1.38533 169.796 1.68844 169.54 1.9434C169.285 2.19837 168.982 2.40009 168.648 2.53685C168.315 2.67361 167.957 2.74266 167.596 2.74C167.237 2.74 166.881 2.66906 166.549 2.53124C166.217 2.39342 165.915 2.19143 165.661 1.93687C165.408 1.68231 165.207 1.38017 165.07 1.0478C164.933 0.715423 164.864 0.359349 164.865 0L153.56 0C153.56 0.728019 153.27 1.42622 152.755 1.94101C152.24 2.4558 151.542 2.745 150.814 2.745C150.085 2.745 149.387 2.4558 148.872 1.94101C148.357 1.42622 148.067 0.728019 148.067 0L136.762 0C136.765 0.720603 136.482 1.41304 135.976 1.92632C135.47 2.4396 134.782 2.73209 134.061 2.74C133.698 2.74671 133.338 2.68058 133.001 2.54551C132.664 2.41044 132.358 2.20919 132.101 1.95368C131.843 1.69817 131.64 1.3936 131.502 1.05801C131.364 0.722421 131.296 0.362646 131.3 0L119.965 0C119.969 0.360088 119.901 0.717362 119.765 1.05094C119.629 1.38453 119.428 1.68773 119.174 1.94283C118.92 2.19793 118.617 2.39982 118.284 2.53669C117.951 2.67356 117.594 2.74268 117.233 2.74C116.873 2.74132 116.516 2.67135 116.183 2.53412C115.85 2.39689 115.547 2.19512 115.292 1.94042C115.037 1.68572 114.835 1.38314 114.698 1.05011C114.561 0.717086 114.491 0.360192 114.492 0L103.187 0C103.188 0.360192 103.118 0.717086 102.981 1.05011C102.844 1.38314 102.642 1.68572 102.387 1.94042C102.132 2.19512 101.829 2.39689 101.496 2.53412C101.163 2.67135 100.806 2.74132 100.446 2.74C100.086 2.74 99.7302 2.66906 99.3981 2.53124C99.0661 2.39342 98.7646 2.19143 98.5108 1.93687C98.2571 1.68231 98.0561 1.38017 97.9194 1.0478C97.7828 0.715423 97.7131 0.359349 97.7144 0L86.3793 0C86.3819 0.360564 86.3128 0.718059 86.176 1.05169C86.0392 1.38533 85.8374 1.68844 85.5823 1.9434C85.3272 2.19837 85.024 2.40009 84.6902 2.53685C84.3564 2.67361 83.9987 2.74266 83.638 2.74C83.2785 2.74 82.9225 2.66906 82.5905 2.53124C82.2585 2.39342 81.9569 2.19143 81.7032 1.93687C81.4494 1.68231 81.2485 1.38017 81.1118 1.0478C80.9751 0.715423 80.9055 0.359349 80.9068 0L69.6016 0C69.6016 0.726693 69.3128 1.42362 68.7987 1.93747C68.2847 2.45132 67.5874 2.74 66.8604 2.74C66.1334 2.74 65.4361 2.45132 64.922 1.93747C64.408 1.42362 64.1191 0.726693 64.1191 0L52.814 0C52.8153 0.359349 52.7457 0.715423 52.609 1.0478C52.4723 1.38017 52.2713 1.68231 52.0176 1.93687C51.7638 2.19143 51.4623 2.39342 51.1303 2.53124C50.7983 2.66906 50.4423 2.74 50.0828 2.74C49.7224 2.74132 49.3654 2.67135 49.0322 2.53412C48.699 2.39689 48.3963 2.19512 48.1415 1.94042C47.8867 1.68572 47.6848 1.38314 47.5475 1.05011C47.4102 0.717086 47.3402 0.360192 47.3415 0L36.0164 0C36.0204 0.360088 35.9525 0.717362 35.8168 1.05094C35.6811 1.38453 35.4802 1.68773 35.2259 1.94283C34.9717 2.19793 34.669 2.39982 34.3358 2.53669C34.0026 2.67356 33.6454 2.74268 33.2851 2.74C32.9239 2.74265 32.5658 2.67366 32.2315 2.53702C31.8971 2.40038 31.5932 2.19882 31.3373 1.94399C31.0815 1.68916 30.8787 1.38613 30.7408 1.05244C30.6029 0.718755 30.5325 0.361038 30.5339 0L19.2888 0Z"
      />
    </Svg>
  )
}

export default CardSkillDown
