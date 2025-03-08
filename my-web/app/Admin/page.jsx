'use client';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { FaUpload } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductContext } from '../Context/ProductContext';
import { UserContext } from '../Context/UserContext';
import { MdDelete } from "react-icons/md";
import { CartContext } from '../Context/Cart';

const Admin = () => {
  const [page, setPage] = useState('Users');
  const [image, setImage] = useState(null);
  const [size, setSize] = useState("")
  const [color , setColor] = useState('')
  const { products, AddProduct, deleteProduct } = useContext(ProductContext)
  const {orders , deleteOrder} = useContext(CartContext)
  const {users} = useContext(UserContext)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    gender: '',
    material: '',
    quantity: '',
    collection: "",
    colors: [],
    sizes: [],
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex min-h-screen justify-center gap-5 items-center flex-col py-32 md:py-20 px-5 mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold text-red-600 uppercase tracking-widest">Admin Panel</h1>
      
      {/* Navigation */}
      <nav className="flex w-full justify-center bg-white shadow-lg rounded-md overflow-hidden">
        {['Users', 'Products', 'Orders', 'Create Product'].map((item, index) => (
          <button
            key={index}
            onClick={() => setPage(item)}
            className={`text-red-600 flex-1 py-3 text-center transition-all duration-500 hover:bg-red-600 hover:text-white ${
              page === item ? 'bg-red-600 text-white' : ''
            }`}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* Page Content */}
      <div className="w-full mt-6">
        <AnimatePresence>
          {page === 'Users' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {
                users.map((user) => {
                  return (
                    <div className="flex flex-col items-center bg-white shadow-md p-4 rounded-md">
                      <Image src={user?.profilePhoto?.url} alt="profile" width={50} height={50} className="w-12 h-12 rounded-full" />
                      <h2 className="font-semibold mt-2">{user.name}</h2>
                      <span className="text-gray-500">{user.ProfileName}</span>
                      <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded-md hover:scale-105 transition">Delete</button>
                    </div>
                  )
                })
              }
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
        {
          page == "Products" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <table className="w-full text-gray-700 border border-gray-200 shadow-md rounded-lg">
                {/* Table Header */}
                <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
                  <tr>
                    {["Image", "Name", "Created", "Quantity", "Gender", "Price" , "Delete"].map((heading, index) => (
                      <th key={index} className="py-3 px-4 text-center">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {
                    products.map((product) => {
                      return (
                        <>
                          <tr className="border-b border-gray-200 hover:bg-gray-50 transition-all">
                            {/* Image Column */}
                            <td className="p-4 flex justify-center">
                              <Image 
                                src={product.Photo[0].url}
                                alt="img_Product" 
                                width={40} 
                                height={40} 
                                className="w-10 h-10 rounded-md shadow-md"
                              />
                            </td>
                            {/* Order Details */}
                            <td className="p-4 text-center font-semibold">{product.name}</td>
                            <td className="p-4 text-center">{new Date(product.createdAt).toLocaleDateString()}</td>
                            <td className="p-4 text-center">{product.quantity}</td>
                            <td className="p-4 text-center">{product.gender}</td>
                            <td className="p-4 text-center font-bold text-green-600">${product.price}</td>
                            <td onClick={()=> deleteProduct(product._id)} className="py-10 cursor-pointer text-center font-bold flex items-center justify-center text-red-600"><MdDelete /></td>
                          </tr>
                        </>
                      )
                    })
                  }
                </tbody>
              </table>
            </motion.div>
          )
          } 
        </AnimatePresence>
        <AnimatePresence>
          {page === 'Orders' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <table className="w-full text-gray-700 border border-gray-200 shadow-md rounded-lg">
                {/* Table Header */}
                <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
                  <tr>
                    {["Num", "Name", "Date", "Address","Phone", "Items", "Total","Delete"].map((heading, index) => (
                      <th key={index} className="py-3 px-4 text-center">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {
                    orders.map((order , index) => {
                      return (
                        <>
                          <tr className="border-b border-gray-200 hover:bg-gray-50 transition-all">
                            {/* Image Column */}
                            <td className="p-4 flex justify-center">
                            #{index}
                            </td>
                            {/* Order Details */}
                            <td className="p-4 text-center font-semibold">{order.User.name}</td>
                            <td className="p-4 text-center">{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td className="p-4 text-center">{order.address}</td>
                            <td className="p-4 text-center">{order.phoneNumber}</td>
                            <td className="p-4 text-center">{order.Products.length}</td>
                            <td className="p-4 text-center font-bold text-green-600">${order.total}</td>
                            <td onClick={()=> deleteOrder(order._id)} className="py-10 cursor-pointer text-center font-bold flex items-center justify-center text-red-600"><MdDelete /></td>
                          </tr>
                        </>
                      )
                    })
                  }
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {page === 'Create Product' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-gray-100 p-6 rounded-md w-full max-w-2xl mx-auto shadow-md">
              <h2 className="text-lg font-bold text-red-600 mb-4">Create New Product</h2>
              <form className="flex flex-col gap-4">
                <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleInputChange} className="p-3 border rounded-md" />
                <textarea name="description" placeholder="Product Description" value={formData.description} onChange={handleInputChange} className="p-3 border rounded-md h-24"></textarea>
                <input type="number" name="price" placeholder="Product Price" value={formData.price} onChange={handleInputChange} className="p-3 border rounded-md" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} className="p-3 border rounded-md" />
                  <input type="text" name="gender" placeholder="Gender" value={formData.gender} onChange={handleInputChange} className="p-3 border rounded-md" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="material" placeholder="Material" value={formData.material} onChange={handleInputChange} className="p-3 border rounded-md" />
                  <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleInputChange} className="p-3 border rounded-md" />
                </div>
                <input type="type" name="collection" placeholder="Product Collection" value={formData.collection} onChange={handleInputChange} className="p-3 border rounded-md" />
                <div className='flex items-center w-full flex-col md:flex-row gap-2'>
                  <input type="text" name="color" placeholder="Color" value={color} onChange={(e) => setColor(e.target.value)} className="p-3 border w-[100%] md:w-[75%] rounded-md" />
                  <button onClick={(e) => { e.preventDefault(); setFormData({ ...formData, colors: [...formData.colors, color] }) }} className='w-[100%] md:w-[25%] bg-DarkRed p-3 rounded-md text-white'>Add Color</button>
                </div>
                <div className='flex items-center w-full flex-col md:flex-row gap-2'>
                  <input type="text" name="size" placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)} className="p-3 w-[100%] md:w-[75%] border rounded-md" />
                  <button onClick={(e) => { e.preventDefault(); setFormData({ ...formData, sizes: [...formData.sizes, size] }) }} className='w-[100%] md:w-[25%] bg-DarkRed p-3 rounded-md text-white'>Add Size</button>
                </div>
                <div className="w-full flex justify-center">
                  <input type="file" id="file" className="hidden" onChange={(e) => setImage(e.target.files[0])} />
                  {image ? (
                    <label htmlFor="file" className="cursor-pointer">
                      <Image src={URL.createObjectURL(image)} alt="upload" width={80} height={80} className="rounded-md" />
                    </label>
                  ) : (
                    <label htmlFor="file" className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center cursor-pointer">
                      <FaUpload className="mr-2" /> Upload Image
                    </label>
                  )}
                </div>
                <button onClick={(e) => { e.preventDefault(); AddProduct(formData.name , formData.description , formData.price , formData.quantity , formData.category ,formData.gender , formData.collection , formData.sizes , formData.colors , formData.material , image) }} className="bg-red-600 text-white py-3 rounded-md hover:scale-105 transition">Create</button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Admin;
