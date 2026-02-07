'use client'
import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export const FeatureContext = createContext()

const FeatureContextProvider = ({ children }) => {
    const [features, setFeatures] = useState([])
    const [loading, setLoading] = useState(true)

    // Fetch Features
    useEffect(() => {
        const fetchFeatures = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/feature`)
                setFeatures(res.data)
            } catch (err) {
                console.error("Failed to fetch features:", err)
                // Optional: toast.error("Failed to load features")
            } finally {
                setLoading(false)
            }
        }
        fetchFeatures()
    }, [])

    // Add Feature (Admin)
    const addFeature = async (featureData) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/feature`, featureData)
            setFeatures([...features, res.data])
            toast.success("Feature added successfully")
            return true
        } catch (err) {
            console.error(err)
            toast.error(err.response?.data?.message || "Failed to add feature")
            return false
        }
    }

    // Delete Feature (Admin)
    const deleteFeature = async (id) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACK_URL}/api/feature/${id}`)
            setFeatures(features.filter(f => f._id !== id))
            toast.success("Feature deleted successfully")
        } catch (err) {
            console.error(err)
            toast.error("Failed to delete feature")
        }
    }

    // Update Feature (Admin)
    const updateFeature = async (id, updatedData) => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_BACK_URL}/api/feature/${id}`, updatedData)
            setFeatures(features.map(f => f._id === id ? res.data : f))
            toast.success("Feature updated successfully")
            return true
        } catch (err) {
            console.error(err)
            toast.error("Failed to update feature")
            return false
        }
    }

    return (
        <FeatureContext.Provider value={{ features, loading, addFeature, deleteFeature, updateFeature }}>
            {children}
        </FeatureContext.Provider>
    )
}

export default FeatureContextProvider
