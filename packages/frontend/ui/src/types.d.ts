import {
  Breakpoints as MuiBreakpoints,
  Palette as MuiPalette,
  Theme as MuiTheme,
  Typography as MuiTypography,
} from '@mui/material'

import common from './assets/theme/base/variants/common'
import dark from './assets/theme/base/variants/dark'
import light from './assets/theme/base/variants/light'

interface Gradient {
  main: string
  state: string
}

export type Colors =
  | 'dark'
  | 'error'
  | 'info'
  | 'inherit'
  | 'light'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'text'
  | 'warning'
  | 'white'

interface BaseProperties {
  fontFamily: string
  fontSizeLG: string
  fontSizeRegular: string
  fontSizeSM: string
  fontSizeXL: string
  fontSizeXS: string
  fontSizeXXS: string
  fontWeightBold: number
  fontWeightLight: number
  fontWeightMedium: number
  fontWeightRegular: number
}

interface Typography extends MuiTypography {
  fontFamily: BaseProperties.fontFamily
  fontWeightBold: BaseProperties.fontWeightBold
  fontWeightLight: BaseProperties.fontWeightLight
  fontWeightMedium: BaseProperties.fontWeightMedium
  fontWeightRegular: BaseProperties.fontWeightRegular
  size: Size
}

export interface Size {
  xxs: BaseProperties.fontSizeXXS
  xs: BaseProperties.fontSizeXS
  sm: BaseProperties.fontSizeSM
  regular: BaseProperties.fontSizeRegular
  lg: BaseProperties.fontSizeLG
  xl: BaseProperties.fontSizeXL
  xxl: BaseProperties.fontSizeXL
}

interface Functions {
  pxToRem: (num: number) => string
  rgba: (color: string, opacity: number) => string
  linearGradient: (color: string, colorState: string, angle?: number) => string
  boxShadow: (
    offset: [number, number],
    radius: [number, number],
    color: string,
    opacity: number,
    inset?: string,
  ) => string
}

interface Breakpoints extends MuiBreakpoints {
  values: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
    xxl: number
  }
}

export interface Borders {
  borderColor: string
  borderWidth: {
    0: number
    1: string
    2: string
    3: string
    4: string
    5: string
  }
  borderRadius: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    xxl: string
    section: string
  }
}

export interface BoxShadows {
  xs: string
  sm: string
  regular: string
  lg: string
  xl: string
  xxl: string
  inset: string

  navbarBoxShadow: string

  buttonBoxShadow: {
    main: string
    stateOf: string
    stateOfNotHover: string
  }

  inputBoxShadow: {
    focus: string
    error: string
    success: string
  }

  sliderBoxShadow: {
    thumb: string
  }

  tabsBoxShadow: {
    indicator: string
  }
}

export type CustomPalette = typeof common & typeof light & typeof dark

declare module '@mui/material' {
  interface Theme {
    palette: CustomPalette & MuiPalette
    typography: Typography
    functions: Functions
    borders: Borders
    boxShadows: BoxShadows
    breakpoints: Breakpoints
  }
  interface Palette extends CustomPalette, MuiPalette {}
  interface PaletteOptions extends CustomPalette, MuiPalette {}
}

export interface CustomTheme extends MuiTheme {
  palette: MuiPalette
  typography: Typography
  functions: Functions
  borders: Borders
  boxShadows: BoxShadows
  breakpoints: Breakpoints
}
