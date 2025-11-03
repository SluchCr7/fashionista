'use client'
import React, { useContext } from 'react'
import { ProductContext } from '../Context/ProductContext'
import CollectionSection from './CollectionSection'

const LatestCollection = () => {
  const { products } = useContext(ProductContext)
  return (
    <CollectionSection
      title="✨ Latest Collection"
      subtitle="Explore our newest arrivals and stay ahead of the trends."
      products={products.slice(0, 8)}
      showRating={false}
      ctaText="View All Products"
    />
  )
}

export default LatestCollection
