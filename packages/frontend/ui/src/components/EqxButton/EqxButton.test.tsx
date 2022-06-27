import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Link, MemoryRouter } from 'react-router-dom'

import {
  assertElementHasSibling,
  assertElementHasStyle,
  assertElementNotHasSibling,
  assertSiblingHasAttribute,
  assertTextExists,
  mockPalette,
  MockTheme,
} from '@/testUtils'

import { EqxButton } from '.'

describe('EqxButton', () => {
  it("should accept 'to' property when router Link component is provided", () => {
    render(
      <MemoryRouter>
        <MockTheme>
          <EqxButton to="/some-route" component={Link}>
            A Button
          </EqxButton>
        </MockTheme>
      </MemoryRouter>,
    )

    const button = assertTextExists('A Button')

    assertSiblingHasAttribute(button, 'a', ['href', '/some-route'])
  })

  it("should render a plain button when 'to' property is not provided", () => {
    render(
      <MemoryRouter>
        <MockTheme>
          <EqxButton variant="contained">A Button</EqxButton>
        </MockTheme>
      </MemoryRouter>,
    )

    const button = assertTextExists('A Button')

    assertElementHasSibling(button, 'button')
    assertElementNotHasSibling(button, 'a')
  })

  it('should handle text color for contained button with white and light colors', () => {
    render(
      <MemoryRouter>
        <MockTheme>
          <EqxButton
            data-testid="button"
            variant="contained"
            buttonColor="white"
          >
            A Button
          </EqxButton>
          <EqxButton
            data-testid="button2"
            variant="contained"
            buttonColor="light"
          >
            A Button
          </EqxButton>
        </MockTheme>
      </MemoryRouter>,
    )

    assertElementHasStyle('button', {
      color: mockPalette.text.main,
    })
    assertElementHasStyle('button2', {
      color: mockPalette.gradients.dark.state,
    })
  })

  it('should handle focus on button without hovering', () => {
    render(
      <MemoryRouter>
        <MockTheme>
          <EqxButton
            data-testid="button"
            variant="contained"
            buttonColor="white"
          >
            A Button
          </EqxButton>
        </MockTheme>
      </MemoryRouter>,
    )

    const button = screen.getByTestId('button')

    userEvent.tab()

    expect(button).toHaveFocus()

    assertElementHasStyle('button', {
      boxShadow:
        '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
    })
  })

  it('should handle rendering buttons with small and large sizes and iconOnly is true', () => {
    render(
      <MemoryRouter>
        <MockTheme>
          <EqxButton
            data-testid="button"
            variant="contained"
            buttonColor="white"
            size="small"
            iconOnly
          >
            A Button
          </EqxButton>
          <EqxButton
            data-testid="button2"
            variant="contained"
            buttonColor="white"
            size="large"
            iconOnly
          >
            A Button
          </EqxButton>
        </MockTheme>
      </MemoryRouter>,
    )

    assertElementHasStyle('button', {
      height: '25.4px',
      width: '25.4px',
    })
    assertElementHasStyle('button2', {
      height: '52px',
      width: '52px',
    })
  })
})
