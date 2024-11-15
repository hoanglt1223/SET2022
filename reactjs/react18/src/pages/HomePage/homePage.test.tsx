import { render } from '@testing-library/react'
import HomePage from './index'

describe('homePage.ts: HomePage()', () => {
  it('Should render UI correctly', () => {
    const utils = render(<HomePage />)
    const homePageUI = utils.getByText('THIS IS HOME PAGE')
    expect(homePageUI.textContent).toEqual('THIS IS HOME PAGE')
  })
})
