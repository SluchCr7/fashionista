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
  const [discount , setDiscount] = useState(0)
  const { user } = useContext(UserContext)
  const addToCart = (product, quantity = 1) => {
    if (!product || !product._id) return;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id);

      let updatedCart;
      if (existing) {
        updatedCart = prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        setMessage(`✅ Updated quantity for ${product.name}`);
      } else {
        updatedCart = [...prevCart, { ...product, quantity, discount }];
        setMessage(`🛒 Added ${product.name} to cart`);
        setNumInCart((prev) => prev + 1);
      }

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setTimeout(() => setMessage(""), 3000);
      return updatedCart;
    });
  };

  // 🧩 Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);
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
    useEffect(() => {
      axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/discount`)
        .then((res) => {
          setDiscount(res.data[res.data.length - 1]?.discount)
        })
        .catch(err => console.log(err))
    },[])
  const AddDiscount = (discount) => {
    axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/discount`, { discount })
        .then((res) => {
          setMessage(res.data.message)
          setTimeout(() => setMessage(''), 3000)
        })
        .catch(err => console.log(err))
    }
  return (
    <div className="relative">
        <Notify Notify={message}/>
        <CartContext.Provider value={{cart , addToCart , numInCart , finalCart , SubmitCart, submitOrder , orders , deleteOrder , discount , AddDiscount}}>
            {children}
        </CartContext.Provider>
      </div>
  )
}

export default CartContextProvider