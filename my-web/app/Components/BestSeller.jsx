'use client'
import React, { useContext } from 'react'
import { ProductContext } from '../Context/ProductContext'
import { ReviewContext } from '../Context/ReviewContext'
import CollectionSection from './CollectionSection'

const BestSeller = () => {
  const { products } = useContext(ProductContext)
  const { Reviews } = useContext(ReviewContext)

  const calculateAverageRating = (productId) => {
    const reviews = Reviews.filter(r => r?.product?._id === productId)
    if (!reviews.length) return { avg: 4.5, count: 0 }
    const avg = (reviews.reduce((a, b) => a + (b.rating || 0), 0) / reviews.length).toFixed(1)
    return { avg, count: reviews.length }
  }

  return (
    <CollectionSection
      title="🔥 Best Sellers"
      subtitle="Discover our most popular and top-rated products loved by customers."
      products={products.slice(8, 16)}
      showRating={true}
      calculateRating={calculateAverageRating}
      ctaText="Browse All Bestsellers"
    />
  )
}

export default BestSeller
