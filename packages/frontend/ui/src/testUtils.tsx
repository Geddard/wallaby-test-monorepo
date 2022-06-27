import { createTheme, ThemeProvider } from '@mui/material'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import merge from 'deepmerge'
import React, { CSSProperties, ReactNode } from 'react'

import { AtLeastOneProperty } from '@/typeUtils'

import common from './assets/theme/base/variants/common'
import light from './assets/theme/base/variants/light'

export const mockPalette = merge(light, common)

const MockTheme = ({ children }: { children: ReactNode }) => {
  const theme = createTheme(
    {},
    {
      palette: mockPalette,
      functions: {
        boxShadow: (
          offset: [number, number],
          radius: [number, number],
          color: string,
          opacity: number,
          inset?: number,
        ) =>
          `${offset[0]}px ${offset[1]}px ${radius[0]}px ${
            radius[1]
          }px ${color} ${opacity} ${inset ? 'inset' : ''}`,
        pxToRem: (px: number) => `${px}px`,
        linearGradient: (color: string, colorState: string, angle = 310) =>
          `linear-gradient(${angle}deg, ${color}, ${colorState})`,
        rgba: jest.fn(() => 'rgba(0, 0, 0, 0.5)'),
      },
      borders: {
        borderRadius: {},
      },
      boxShadows: {},
      typography: {
        size: {
          xxs: '1rem',
          xs: '1.2rem',
          sm: '1.4rem',
          regular: '1.6rem',
          lg: '1.8rem',
          xl: '2rem',
        },
      },
    },
  )

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

type NodeMeasurement = AtLeastOneProperty<HTMLElement>

const setMockRefElement = (node: NodeMeasurement): void => {
  const mockRef = {
    get current() {
      return node
    },
    set current(_value) {
      // noop
    },
  }

  jest.spyOn(React, 'useRef').mockReturnValue(mockRef)
}

// Element assertion by test id

const assertElementExists = (id: string) => {
  const element = screen.getByTestId(id)
  expect(element).toBeInTheDocument()

  return element
}

const assertElementNotExists = (id: string) =>
  expect(() => screen.getByTestId(id)).toThrow(
    `Unable to find an element by: [data-testid="${id}"]`,
  )

// Element assertion by text

const assertTextExists = (text: string | RegExp) => {
  const element = screen.getByText(text)
  expect(element).toBeInTheDocument()

  return element
}

const assertTextNotExists = (text: string | RegExp) =>
  expect(() => screen.getByText(text)).toThrow(
    `Unable to find an element with the text: ${text}`,
  )

// Element styles assertion by test id

const assertElementHasStyle = (
  element: string | HTMLElement | ChildNode,
  style: Partial<Record<keyof CSSProperties, string | number>>,
) => {
  const toAssert =
    typeof element === 'string' ? screen.getByTestId(element) : element
  expect(toAssert).toHaveStyle(style)
}

// Value assertions

const assertIsTrue = (value: boolean) => expect(value).toBe(true)
const assertIsFalse = (value: boolean) => expect(value).toBe(false)
const assertIsFunction = (value: unknown) =>
  expect(typeof value).toBe('function')

// Element interactions

const clickElement = (element: string | HTMLElement) => {
  const toClick =
    typeof element === 'string' ? screen.getByTestId(element) : element
  userEvent.click(toClick)
}

const hoverElement = (element: string | HTMLElement): (() => void) => {
  const toHover =
    typeof element === 'string' ? screen.getByTestId(element) : element

  const unhover = () => {
    userEvent.unhover(toHover)
  }

  return unhover
}

// Element attribute assertions
const assertSiblingHasAttribute = (
  element: HTMLElement,
  tag: string,
  attributes: [string, string],
) => expect(element.closest(tag)).toHaveAttribute(...attributes)

const assertElementHasSibling = (element: HTMLElement, tag: string) =>
  expect(element.closest(tag)).toBeInTheDocument()

const assertElementNotHasSibling = (element: HTMLElement, tag: string) =>
  expect(element.closest(tag)).not.toBeInTheDocument()

// local storage mock
const localStorageMock = (() => {
  let store: Record<string, unknown> = {}

  return {
    getItem(key: string) {
      return store[key]
    },

    setItem(key: string, value: unknown) {
      store[key] = value
    },

    clear() {
      store = {}
    },

    removeItem(key: string) {
      delete store[key]
    },

    getAll() {
      return store
    },
  }
})()

const { getItem, setItem, clear, removeItem, getAll } = localStorageMock

const setLocalStorageMock = () => {
  Object.defineProperty(window, 'localStorage', { value: localStorageMock })
}

export {
  assertElementExists,
  assertElementHasSibling,
  assertElementHasStyle,
  assertElementNotExists,
  assertElementNotHasSibling,
  assertIsFalse,
  assertIsFunction,
  assertIsTrue,
  assertSiblingHasAttribute,
  assertTextExists,
  assertTextNotExists,
  clear,
  clickElement,
  getAll,
  getItem,
  hoverElement,
  MockTheme,
  removeItem,
  setItem,
  setLocalStorageMock,
  setMockRefElement,
}
