import React from 'react'

const ProductSkeleton = () => (
  <div className="max-w-7xl mx-auto px-6 py-12 animate-pulse">
    {/* Breadcrumb */}
    <div className="h-4 w-48 bg-gray-300/40 rounded mb-6" />

    <div className="flex flex-col md:flex-row gap-10">
      {/* Left: Image Section */}
      <div className="flex-1">
        <div className="w-full h-[500px] bg-gray-300/50 rounded-xl" />
        <div className="flex gap-3 mt-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-20 h-20 bg-gray-300/50 rounded-md"
            />
          ))}
        </div>
      </div>

      {/* Right: Details */}
      <div className="flex-1 space-y-6">
        <div className="h-8 w-2/3 bg-gray-300/50 rounded" />
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-5 h-5 bg-gray-300/50 rounded" />
          ))}
        </div>
        <div className="h-6 w-24 bg-gray-300/50 rounded" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-300/40 rounded" />
          <div className="h-4 w-5/6 bg-gray-300/40 rounded" />
          <div className="h-4 w-4/6 bg-gray-300/40 rounded" />
        </div>
        <div className="flex gap-4 mt-4">
          <div className="h-12 w-36 bg-gray-300/50 rounded-xl" />
          <div className="h-12 w-36 bg-gray-300/50 rounded-xl" />
        </div>
      </div>
    </div>

    {/* Tabs */}
    <div className="mt-12">
      <div className="flex gap-6 border-b pb-2">
        <div className="h-5 w-24 bg-gray-300/40 rounded" />
        <div className="h-5 w-20 bg-gray-300/40 rounded" />
        <div className="h-5 w-28 bg-gray-300/40 rounded" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-4 w-full bg-gray-300/40 rounded" />
        <div className="h-4 w-4/5 bg-gray-300/40 rounded" />
        <div className="h-4 w-2/3 bg-gray-300/40 rounded" />
      </div>
    </div>

    {/* Related Products */}
    <div className="mt-16">
      <div className="h-6 w-48 bg-gray-300/50 rounded mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {[...Array(5)].map((_, i) => (
          <div key={i}>
            <div className="w-full h-60 bg-gray-300/50 rounded-lg" />
            <div className="mt-2 h-4 w-3/4 bg-gray-300/50 rounded" />
            <div className="mt-1 h-4 w-1/2 bg-gray-300/40 rounded" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ProductSkeleton