// Write your code here
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const getTotalAmount = () => {
        let totalAmount = 0

        for (const each of cartList) {
          const amount = each.quantity * each.price
          totalAmount = totalAmount + amount
        }
        return totalAmount
      }

      return (
        <div className="summary">
          <h1>Order Total: <span>Rs {getTotalAmount()}</span>/-</h1>
          <p>{cartList.length} Items in cart</p>
          <button type="button">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
