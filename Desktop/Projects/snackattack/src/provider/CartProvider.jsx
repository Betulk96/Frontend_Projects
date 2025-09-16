import { CartContextProvider } from "@/hook/useCart"


const CartProvider = ({children}) => {
  return (
    <CartContextProvider>{children}</CartContextProvider>
  )
}

export default CartProvider