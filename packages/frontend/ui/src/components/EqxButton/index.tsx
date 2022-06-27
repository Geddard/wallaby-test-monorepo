import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  styled,
} from '@mui/material'
import clsx from 'clsx'
import { ElementType } from 'react'

import { Colors } from '@/types'

interface ButtonProps {
  buttonColor?: Colors
  size?: 'small' | 'medium' | 'large'
  customClass?: string
}

const Button = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'buttonColor',
})<ButtonProps>(
  ({ theme: { palette, functions }, buttonColor = 'primary', size }) => {
    const { boxShadow, linearGradient, pxToRem, rgba } = functions
    const { white, black, text, transparent, gradients } = palette

    return {
      '&.contained': {
        backgroundColor: palette[buttonColor].main,
        color: (() => {
          let color
          if (buttonColor === 'white') {
            color = text.main
          } else if (buttonColor === 'light') {
            color = gradients.dark.state
          } else {
            color = white.main
          }
          return color
        })(),

        '&:hover': {
          backgroundColor: palette[buttonColor].main,
        },

        '&:focus:not(:hover)': {
          backgroundColor: palette[buttonColor].focus,
          boxShadow: boxShadow(
            [0, 0],
            [0, 3.2],
            palette[buttonColor].main,
            0.5,
          ),
        },

        '&:disabled': {
          backgroundColor: palette[buttonColor]?.main || white.main,
          color: (() => {
            let textColor = black.main
            if (
              buttonColor === 'primary' ||
              buttonColor === 'error' ||
              buttonColor === 'dark'
            ) {
              textColor = white.main
            }
            return textColor
          })(),
        },
      },

      '&.outlined': {
        backgroundColor:
          buttonColor === 'white' ? rgba(white.main, 0.1) : transparent.main,
        color: palette[buttonColor].main,
        borderColor:
          buttonColor === 'white'
            ? rgba(white.main, 0.75)
            : palette[buttonColor].main,

        '&:hover': {
          backgroundColor: transparent.main,
          borderColor: palette[buttonColor].main,
        },

        '&:focus:not(:hover)': {
          backgroundColor:
            buttonColor === 'white' ? rgba(white.main, 0.1) : transparent.main,
          boxShadow: boxShadow(
            [0, 0],
            [0, 3.2],
            palette[buttonColor].main,
            0.5,
          ),
        },

        '&:active:not(:hover)': {
          backgroundColor: palette[buttonColor].main,
          color: white.main,
          opacity: 0.85,
        },

        '&:disabled': {
          borderColor: palette[buttonColor].main,
          color: palette[buttonColor].main,
        },
      },

      '&.gradient': {
        background: (() => {
          let background

          if (buttonColor === 'white') {
            background = white.main
          } else {
            background = linearGradient(
              gradients[buttonColor].main,
              gradients[buttonColor].state,
            )
          }

          return background
        })(),
        color: (() => {
          let color
          if (buttonColor === 'white') {
            color = text.main
          } else if (buttonColor === 'light') {
            color = gradients.dark.state
          } else {
            color = white.main
          }
          return color
        })(),

        '&:focus:not(:hover)': {
          boxShadow: 'none',
        },

        '&:disabled': {
          background: (() => {
            let background

            if (buttonColor === 'white') {
              background = white.main
            } else {
              background = linearGradient(
                gradients[buttonColor].main,
                gradients[buttonColor].state,
              )
            }

            return background
          })(),
          color: (() => {
            let color
            if (buttonColor === 'white') {
              color = text.main
            } else if (buttonColor === 'light') {
              color = gradients.dark.state
            } else {
              color = white.main
            }
            return color
          })(),
        },
      },

      '&.text': {
        color: palette[buttonColor].main,

        '&:hover': {
          color: palette[buttonColor].focus,
        },

        '&:focus:not(:hover)': {
          color: palette[buttonColor].focus,
        },
      },

      '&.circular': {
        borderRadius: pxToRem(160),
      },

      '&.iconOnly': {
        minWidth: (() => {
          let minWidth
          if (size === 'small') {
            minWidth = pxToRem(25.4)
          } else if (size === 'large') {
            minWidth = pxToRem(52)
          } else {
            minWidth = pxToRem(38)
          }
          return minWidth
        })(),

        width: (() => {
          let width
          if (size === 'small') {
            width = pxToRem(25.4)
          } else if (size === 'large') {
            width = pxToRem(52)
          } else {
            width = pxToRem(38)
          }
          return width
        })(),

        minHeight: (() => {
          let minHeight
          if (size === 'small') {
            minHeight = pxToRem(25.4)
          } else if (size === 'large') {
            minHeight = pxToRem(52)
          } else {
            minHeight = pxToRem(38)
          }
          return minHeight
        })(),

        height: (() => {
          let height
          if (size === 'small') {
            height = pxToRem(25.4)
          } else if (size === 'large') {
            height = pxToRem(52)
          } else {
            height = pxToRem(38)
          }
          return height
        })(),

        padding: (() => {
          let padding
          if (size === 'small') {
            padding = pxToRem(4.5)
          } else if (size === 'large') {
            padding = pxToRem(16)
          } else {
            padding = `${pxToRem(11)} ${pxToRem(11)} ${pxToRem(10)}`
          }
          return padding
        })(),

        '& .material-icons': {
          marginTop: 0,
        },

        '&:hover, &:focus, &:active': {
          transform: 'none',
        },
      },
    }
  },
)

export const EqxButton = <C extends ElementType>({
  variant = 'contained',
  circular,
  iconOnly,
  customClass,
  buttonColor,
  size = 'medium',
  ...rest
}: MuiButtonProps<C, { component?: C }> & ButtonProps) => (
  <Button
    {...rest}
    buttonColor={buttonColor}
    size={size}
    variant={variant}
    className={clsx(variant, customClass, {
      circular,
      iconOnly,
    })}
  />
)
