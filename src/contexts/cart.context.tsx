import React, { createContext, useState } from 'react'
import CartProduct from '../types/cart.types'

interface CartContextInterface {
  isVisible: boolean
  products: CartProduct[]
  toggleCart: () => void
}

const CartContext = createContext<CartContextInterface>({
  isVisible: false,
  products: [],
  toggleCart: () => {}
})

interface CartContextProviderProps {
  children: React.ReactNode
}

const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [products, setProducts] = useState<CartProduct[]>([])
  const toggleCart = () => {
    setIsVisible((prev) => !prev)
  }
  return (
    <CartContext.Provider value={{ isVisible, products, toggleCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
