import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../store/root-reducer'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import { RootState } from '../store/store'
import { ReactElement } from 'react'

const renderWithRedux = (
  component: ReactElement,
  {
    preloadedState,
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  }: {
    preloadedState: RootState
    store?: any
  }
) => {
  const Wrapper = ({ children }: { children: ReactElement }) => {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    )
  }

  return render(component, { wrapper: Wrapper, ...renderOptions })
}

export { renderWithRedux }
