import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../store/root-reducer'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import { RootState } from '../store/store'
import { ReactNode } from 'react'

const renderWithRedux = (
  component: ReactNode,
  {
    preloadedState,
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  }: {
    preloadedState: RootState
    store?: any
  }
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    )
  }

  return render(component, { wrapper: Wrapper, ...renderOptions })
}

export { renderWithRedux }
