'use client'
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import Notify from '../Components/Notify';
import axios from 'axios';
import { UserContext } from './UserContext';
export const ReviewContext = createContext();

const ReviewContextProvider = ({children}) => {
    const [Reviews, setReviews] = useState([]);
    const [message, setMessage] = useState('');
    const { user } = useContext(UserContext)
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/review`)
            .then(res => setReviews(res.data))
            .catch(err => console.log(err))
    }, [])
    const AddNewReview = async (product , rating) => {
        await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/review`, {product , rating}, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => {
                setMessage("Review Added Successfully")
                setTimeout(() => {
                    setMessage('')
                    window.location.reload()
                }, 3000)
            })
            .catch(err => console.log(err))
    }
    const deleteReview = async (id) => {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACK_URL}/api/review/${id}`)
            .then(res => {
                setMessage("Review Deleted Successfully")
                setTimeout(() => {
                    setMessage('')
                    window.location.reload()
                }, 3000)
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="relative">
            <Notify Notify={message}/>
            <ReviewContext.Provider value={{ Reviews, deleteReview, AddNewReview }}>
                {children}
            </ReviewContext.Provider>
        </div>
    )
}

export default ReviewContextProvider