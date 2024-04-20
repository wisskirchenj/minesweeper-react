import App from '@/App'
import '@testing-library/jest-dom'
import {render, screen} from './util/test-utils'

describe('Simple App test', () => {
  it('the loading text is visible', () => {
    render(<App/>)
    expect(screen.getByText(/Minesweeper is loading.../)).toBeInTheDocument()
  })

  // it('should increment count on click', async () => {
  //   render(<App />)
  //   await userEvent.click(screen.getByRole('button'))
  //   expect(await screen.findByText(/count is: 1/i)).toBeInTheDocument()
  // })

  // assert, that the bomb.svg is visible
  it('the bomb is visible', () => {
    render(<App/>)
    expect(screen.getByAltText(/bomb/i)).toBeInTheDocument()
  })

  it('uses block style in app header', async () => {
    render(<App/>)
    const element = screen.getByRole('banner')
    expect(element.className).toEqual('App-header')
    expect(getComputedStyle(element).display).toEqual('block')
  })
})
