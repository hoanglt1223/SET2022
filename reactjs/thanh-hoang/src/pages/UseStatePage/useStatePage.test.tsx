import { screen } from '@testing-library/react'

describe('homePage.ts: HomePage()', () => {
  it('Should render UI correctly', () => {
    const homePageUI = screen.getByText('THIS IS HOME PAGE')
    expect(homePageUI.textContent).toEqual('THIS IS HOME PAGE')
  })
})
