import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

// {
//         title: 'Product 1',
//         brand: 'Brand Name',
//         id: 1001,
//         imageUrl: 'https://assets.ccbp.in/frontend/react-js/sample-product-img.jpg',
//         price: 760,
//         quantity: 5,
//       },
//       {
//         title: 'Product 2',
//         brand: 'Brand Name',
//         id: 1002,
//         imageUrl: 'https://assets.ccbp.in/frontend/react-js/sample-product-img.jpg',
//         price: 760,
//         quantity: 2,
//       },

class App extends Component {
  state = {
    cartList: [],
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedList = cartList.filter(each => each.id !== id)

    this.setState({cartList: updatedList})
  }
  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state

    if (cartList.some(each => each.id === product.id)) {
      const updatedList = []

      for (const item of cartList) {
        if (item.id === product.id) {
          // let data = item.quantity + 1
          // // console.log(data)
          updatedList.push({...item, quantity: item.quantity + product.quantity})
        } else {
          updatedList.push(item)
        }
      }
      this.setState({cartList: updatedList})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
    //   TODO: Update the code here to implement addCartItem
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedList = []

    for (const item of cartList) {
      if (item.id === id) {
        // let data = item.quantity + 1
        // // console.log(data)
        updatedList.push({...item, quantity: item.quantity + 1})
      } else {
        updatedList.push(item)
      }
    }
    this.setState({cartList: updatedList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedList = []

    for (const item of cartList) {
      if (item.id === id) {
        // let data = item.quantity + 1
        // // console.log(data)
        if (item.quantity > 1) {
          updatedList.push({...item, quantity: item.quantity - 1})
        } else {
          this.removeCartItem(id)
        }
      } else {
        updatedList.push(item)
      }
    }
    this.setState({cartList: updatedList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
