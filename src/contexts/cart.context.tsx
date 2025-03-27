import React, { createContext, useEffect, useMemo, useState } from 'react'
import CartProduct from '../types/cart.types'
import Product from '../types/product.types'

interface CartContextInterface {
  isVisible: boolean
  productsTotalPrice: number
  productsCount: number
  products: CartProduct[]
  toggleCart: () => void
  addProductToCart: (product: Product) => void
  removeProductFromCart: (productId: string) => void
  increaseProductQuantity: (productId: string) => void
  descreaseProductQuantity: (productId: string) => void
}

export const CartContext = createContext<CartContextInterface>({
  isVisible: false,
  productsTotalPrice: 0,
  productsCount: 0,
  products: [],
  toggleCart: () => {},
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  increaseProductQuantity: () => {},
  descreaseProductQuantity: () => {}
})

interface CartContextProviderProps {
  children: React.ReactNode
}

const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [products, setProducts] = useState<CartProduct[]>(() => {
    const storedProducts = localStorage.getItem('cartProducts')
    return storedProducts ? JSON.parse(storedProducts) : []
  })

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(products))
  }, [products])

  const productsCount = useMemo(() => {
    return products.reduce((acc, currentProduct) => {
      return acc + currentProduct.quantity
    }, 0)
  }, [products])

  const productsTotalPrice = useMemo(() => {
    return products.reduce((acc, currentProduct) => {
      return acc + currentProduct.price * currentProduct.quantity
    }, 0)
  }, [products])

  const toggleCart = () => {
    setIsVisible((prev) => !prev)
  }

  const addProductToCart = (product: Product) => {
    // verificar se o produto já está no carrinho
    const productIsAlreadyInCart = products.some(
      (item) => item.id === product.id
    )

    // se sim -> aumentar sua quantidade
    if (productIsAlreadyInCart) {
      return setProducts((products) =>
        products.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    }

    // se não -> adicioná-lo
    setProducts((prevState) => [...prevState, { ...product, quantity: 1 }])
  }

  const removeProductFromCart = (productId: string) => {
    setProducts((products) =>
      products.filter((product) => product.id !== productId)
    )
  }

  const increaseProductQuantity = (productId: string) => {
    setProducts((products) =>
      products.map((product) =>
        product.id === productId
          ? // encontrou o produto com o ID incrementado, aumenta +1
            { ...product, quantity: product.quantity + 1 }
          : // senão retorno o produto sem fazer incremento
            { ...product }
      )
    )
  }

  const descreaseProductQuantity = (productId: string) => {
    setProducts((products) =>
      products
        .map((product) =>
          product.id === productId
            ? // encontrou o produto com o ID incrementado, aumenta +1
              { ...product, quantity: product.quantity - 1 }
            : // senão retorno o produto sem fazer incremento
              { ...product }
        )
        .filter((product) => product.quantity > 0)
    )
  }
  return (
    <CartContext.Provider
      value={{
        isVisible,
        products,
        productsCount,
        productsTotalPrice,
        toggleCart,
        addProductToCart,
        removeProductFromCart,
        increaseProductQuantity,
        descreaseProductQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
