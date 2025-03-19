'use client'
import axios from 'axios';
import React, { useEffect, useState , useContext} from 'react'
import { createContext } from 'react'
import Notify from '../Components/Notify';
import { UserContext } from './UserContext';
export const CartContext = createContext();
const CartContextProvider = ({children}) => {
  const [cart, setCart] = useState([])
  const [numInCart, setNumInCart] = useState(0)
  const [finalCart, setFinalCart] = useState([])
  const [message, setMessage] = useState('')
  const [orders , setOrders] = useState([])
  const discount =  20
  const {user} = useContext(UserContext)
    const addToCart = (product , quantity) => {
        setCart([...cart, { ...product, quantity , discount}])
        setNumInCart((prev) => prev + 1)
    }
    const SubmitCart = (Cart) => {
      setFinalCart(Cart)
    }
    const submitOrder = async (Products , address , phoneNumber , total) => {
      await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/order`, { Products, address, phoneNumber, total },
        {
            headers:
                { Authorization: `Bearer ${user.token}` }
        }
      )
        .then(res => {
          setFinalCart([])
          setMessage("Order Submitted Successfully")
          setTimeout(() => setMessage(""), 3000)
          window.location.href = "/Order"
        })
        .catch(err => console.log(err))
    }
    useEffect(() => {
      axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/order`)
        .then(res => {
          setOrders(res.data)
        })
        .catch(err => console.log(err))
    },[])
    const deleteOrder = async(id) => {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACK_URL}/api/order/${id}` , {} , 
      )
        .then(res => {
            setMessage("Order Delete Successfully")
            setTimeout(()=> setMessage('') , 3000)
            window.location.reload()
        })
        .catch(err => console.log(err))
    }
  return (
    <div className="relative">
        <Notify Notify={message}/>
        <CartContext.Provider value={{cart , addToCart , numInCart , finalCart , SubmitCart, submitOrder , orders , deleteOrder , discount}}>
            {children}
        </CartContext.Provider>
      </div>
  )
}

export default CartContextProvider