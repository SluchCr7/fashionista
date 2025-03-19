'use client'
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import Notify from '../Components/Notify';
import axios from 'axios';
export const AdContext = createContext();

const AdContextProvider = ({children}) => {
    const [ads, setAds] = useState([])
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/ads`)
            .then(res => setAds(res.data))
            .catch(err => console.log(err))
    }, [])
    const AddNewAdd = async(img , category) => {
        const formData = new FormData()
        formData.append('image', img)
        formData.append('category' , category)
        await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/ads` , formData)
            .then(res => {
                setMessage("Ad Banner Added Successfully")
                setTimeout(() => {
                    setMessage('')
                    window.location.reload()
                }, 3000)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const deleteAd = async(id) => {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACK_URL}/api/ads/${id}`)
            .then(res => {
                setMessage("Ad Banner Deleted Successfully")
                setTimeout(() => {
                    setMessage('')
                    window.location.reload()
                }, 3000)
            })
            .catch(err => console.log(err))
    }
    return (
        <AdContext.Provider value={{ ads, AddNewAdd , deleteAd }}>
            {children}
        </AdContext.Provider>
    )
}

export default AdContextProvider