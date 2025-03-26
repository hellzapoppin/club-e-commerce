import React, { createContext, useState } from 'react'
import CartProduct from '../types/cart.types'
import Product from '../types/product.types'

interface CartContextInterface {
  isVisible: boolean
  products: CartProduct[]
  toggleCart: () => void
  addProductToCart: (product: Product) => void
}

export const CartContext = createContext<CartContextInterface>({
  isVisible: false,
  products: [],
  toggleCart: () => {},
  addProductToCart: () => {}
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
  const addProductToCart = (product: Product) => {
    setProducts((prev) => [...prev, { ...product, quantity: 1 }])
  }
  return (
    <CartContext.Provider
      value={{ isVisible, products, toggleCart, addProductToCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
