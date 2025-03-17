'use client'
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import Notify from '../Components/Notify';
import axios from 'axios';
export const ProductContext = createContext();
const ProductContextProvider = ({children}) => {
    const [message, setMessage] = useState('')
    const [products , setProducts] = useState([])
    // Add New Product Function
    const AddProduct = (name , description , price , quantity , category , gender , collections , sizes , colors , material , img) => {
        const formData = new FormData()
        formData.append('image', img)
        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('quantity', quantity)
        formData.append('category', category)
        formData.append('gender', gender)   
        formData.append('collections', collections) 
        sizes.forEach((size) => {
            formData.append('sizes', size)
        })
        colors.forEach((color) => {
            formData.append('colors', color)
        })   
        formData.append('material', material)   
        axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/product` , formData)
            .then(res => {
                setMessage("Product Add Successfully")
                setTimeout(()=> setMessage('') , 3000)
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    // Get All Products
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/product`)
        .then((res) => {
            setProducts(res.data)
        })
            .catch((err) => {
            console.log(err)
        })
    }, [])
    // Delete Product
    const deleteProduct = (prodId) => {
        axios.delete(`${process.env.NEXT_PUBLIC_BACK_URL}/api/product/${prodId}`)
            .then((res) => {
                setMessage("Product Delete Successfully")
                setTimeout(()=> setMessage('') , 3000)
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }
  return (
    <div className="relative">
        <Notify Notify={message}/>
        <ProductContext.Provider value={{products , AddProduct , deleteProduct}}>
            {children}
        </ProductContext.Provider>
    </div>
  )
}

export default ProductContextProvider