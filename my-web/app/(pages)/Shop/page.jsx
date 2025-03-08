// 'use client'
// import React, { useState, useMemo, useEffect, useContext } from 'react'
// import { products } from '@/public/data/products'
// import Image from 'next/image'
// import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
// import { FiltersCollection } from '../../Components/FiltersCollection';
// import Link from 'next/link';
// import { useSearchParams , useRouter } from 'next/navigation';
// import { ProductContext } from '@/app/Context/ProductContext';
// import { CartContext } from '@/app/Context/Cart';
// import { IoMdHeart } from "react-icons/io";

// const Shop = () => {
//   const searchParams = useSearchParams();
//   const [show, setShow] = useState(false);
//   const [sortPrice, setSortPrice] = useState("default");
//   const {products} = useContext(ProductContext)
//   const [page , setPage] = useState(0)
//   const {discount} = useContext(CartContext)

//   const [filters, setFilters] = useState({
//         category: '',
//         gender: '',
//         // color: '',
//         // size: [],
//         material: [],
//         minPrice: 0,
//         maxPrice: 100,
//     });
//     const router = useRouter();
//     const [priceRange, setPriceRange] = useState([0, 100]);
//     const categories = ['Top Wear', 'Bottom Wear'];
//     const colors = ['Red', 'Black', 'Blue', 'Green', 'Yellow', 'Gray', 'White', 'Pink', 'Beige', 'Navy'];
//     const sizes = ['S', 'XS', 'M', 'L', 'XL', 'XXL'];
//     const genders = ['men', 'women'];
//     const materials = ['Cotton', 'Wool', 'Denim', 'Polyester', 'Linen', 'Silk', 'Viscose', 'Fleece'];

//   // Function to handle multi-selection filtering
  
//   const toggleFilter = (type, value) => {
//     setFilters((prev) => {
//       const isAlreadySelected = prev[type].includes(value);
//       return {
//         ...prev,
//         [type]: isAlreadySelected
//           ? prev[type].filter((item) => item !== value) // Remove if selected
//           : [...prev[type], value], // Add if not selected
//       };
//     });
//   };

//   const filteredProducts = useMemo(() => {
//     return products.filter((product) => {
//       const matchCategory = !filters.category || product.category === filters.category;
//       const matchGender = !filters.gender || product.gender === filters.gender;
//       const matchMaterial = filters.material.length === 0 || filters.material.includes(product.material);
//       // const matchSize = filters.size.length === 0 || filters.size.some((size) => product.sizes.includes(size));
//       // const matchColor = !filters.color || product.color.toLowerCase() === filters.color.toLowerCase();
//       const matchPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;

//       return matchCategory && matchGender && matchMaterial && matchPrice;
//     });
//   }, [filters]);

//   // Sorting logic
//   const sortedProducts = useMemo(() => {
//     if (sortPrice === "lowToHigh") {
//       return [...filteredProducts].sort((a, b) => a.price - b.price);
//     } 
//     if (sortPrice === "highToLow") {
//       return [...filteredProducts].sort((a, b) => b.price - a.price);
//     } 
//     return filteredProducts;
//   }, [sortPrice, filteredProducts]);
//     useEffect(() => {
//         const params = Object.fromEntries([...searchParams]);
//         setFilters({
//             category: params.category || '',
//             gender: params.gender || '',
//             material: params.material ? params.material.split(',') : [],
//             minPrice: params.minPrice ? parseFloat(params.minPrice) : 0,
//             maxPrice: params.maxPrice ? parseFloat(params.maxPrice) : 100,
//         });
//         setPriceRange([
//             params.minPrice ? parseFloat(params.minPrice) : 0,
//             params.maxPrice ? parseFloat(params.maxPrice) : 100,
//         ]);
//     }, [searchParams]);

//     const handleChangeFilter = (e) => {
//         const { name, value, checked, type } = e.target;
//         let newFilters = { ...filters };

//         if (type === 'checkbox') {
//             if (checked) {
//                 newFilters[name] = [...(newFilters[name] || []), value];
//             } else {
//                 newFilters[name] = newFilters[name].filter((item) => item !== value);
//             }
//         } else {
//             newFilters[name] = value;
//         }

//         setFilters(newFilters);
//         updateUrlParams(newFilters);
//     };

//     const updateUrlParams = (newFilters) => {
//         const params = new URLSearchParams();

//         Object.keys(newFilters).forEach((key) => {
//             if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
//                 params.append(key, newFilters[key].join(','));
//             } else if (newFilters[key]) {
//                 params.append(key, newFilters[key]);
//             }
//         });

//         router.push(`?${params.toString()}`);
//     };

//     const handlePriceChange = (e) => {
//         const value = parseFloat(e.target.value);
//         setPriceRange([0, value]);
//         const newFilters = { ...filters, minPrice: 0, maxPrice: value };
//         setFilters(newFilters);
//         updateUrlParams(newFilters);
//     };
//   return (
//     <div className="flex h-full items-start py-20 flex-col lg:flex-row gap-4 w-full relative">
//       {/* Sidebar */}
//         <div className={`w-[100%] lg:w-[20%] h-fit p-7 border-r border-black transition-all duration-700 flex items-start flex-col gap-3`}>
//         <span className="font-bold text-xl text-black uppercase">Filters</span>
//         <div className='grid grid-cols-2 lg:grid-cols-1 w-full gap-2'>
//           {/* Category Filter */}
//           <div className="flex flex-col gap-2">
//             <span className="font-bold text-base">Category</span>
//             <ul className="flex flex-col gap-2 text-base">
//               {categories.map((category, index) => (
//                 <div onClick={()=> toggleFilter('category', category)} key={index} className="flex items-center gap-3 cursor-pointer">
//                     <input checked={category === filters.category} onChange={handleChangeFilter} value={category} type="radio" name="category" id="" className='h-4 w-f text-blue-500 focus:ring-blue-400 border-gray-300 mr-2' />
//                     <li className='text-gray-900'>{category}</li>
//                 </div>
//               ))}
//             </ul>
//           </div>

//           {/* Gender Filter */}
//           <div className="flex flex-col gap-2">
//             <span className="font-bold text-base">Gender</span>
//             <ul className="flex flex-col gap-2 text-base">
//                 {genders.map((gender, index) => (
//                     <div onClick={()=> toggleFilter('gender', gender)} key={index} className="flex items-center gap-3 cursor-pointer">
//                         <input checked={gender === filters.gender} onChange={handleChangeFilter} value={gender} type="radio" name="gender" id="" className='h-4 w-f text-blue-500 focus:ring-blue-400 border-gray-300 mr-2' />
//                         <li className='text-gray-900'>{gender}</li>
//                     </div>
//                 ))}
//             </ul>
//           </div>

//           {/* Material Filter */}
//           <div className="flex flex-col gap-2">
//             <span className="font-bold text-base">Material</span>
//             <ul className="grid grid-cols-2 gap-3 text-base">
//               {materials.map((material, index) => (
//                 <div key={material} className="flex items-center gap-3 cursor-pointer">
//                     <input checked={filters.material.includes(material)} onChange={handleChangeFilter} value={material} type="checkbox" name="material" id="" className='h-4 w-f text-blue-500 focus:ring-blue-400 border-gray-300 mr-2' />
//                     <li className='text-gray-900'>{material}</li>
//                 </div>
//               ))}
//             </ul>
//             </div>
            

//             {/* Price Filter */}
//             <div className="flex flex-col gap-2">
//                 <span className="font-bold text-base">Price</span>
//                   <input value={priceRange[1]} onChange={handlePriceChange} type="range" name="price" id=""
//                       className='w-[100%] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
//                       min={0} max={100}
//                   />
//                   <div className='w-full flex items-center justify-between mt-2'> 
//                       <span>${priceRange[0]}</span>
//                       <span>${priceRange[1]}</span>
//                   </div>
//             </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className={`w-[100%] lg:w-[80%] flex items-center flex-col gap-3 px-4 py-4`}>
//         {/* Sort Dropdown */}
//         <div className="flex items-center justify-between w-full">
//           <span className="font-bold text-yellow text-xl tracking-[3px] uppercase">Products</span>
//           <div className="relative">
//             <div onClick={() => setShow(!show)} className="flex items-center w-[200px] py-2 px-4 rounded-md border border-black cursor-pointer">
//               <span>Sort By</span>
//             </div>
//             <div className={` ${show ? "opacity-100" : "opacity-0"} absolute bg-white shadow-xl rounded-md w-[200px] flex flex-col items-start z-50 gap-2 transition-opacity duration-700`}>
//               <span onClick={() => setSortPrice("default")} className="hover:bg-gray-100 w-full py-2 px-2 cursor-pointer">Default</span>
//               <span onClick={() => setSortPrice("highToLow")} className="hover:bg-gray-100 w-full py-2 px-2 cursor-pointer">High To Low</span>
//               <span onClick={() => setSortPrice("lowToHigh")} className="hover:bg-gray-100 w-full py-2 px-2 cursor-pointer">Low To High</span>
//             </div>
//           </div>
//         </div>

//         {/* Product List */}
//         <div className='flex items-center flex-col gap-5 w-full'>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
//             {sortedProducts.map((prod, index) => (
//               <Link href={`/Product/${prod._id}`} key={index} className="relative w-full imageContainer">
//                 <div className='relative w-full'>
//                   <Image src={prod.Photo[0].url} alt={"product_img"} width={200} height={200} className="w-full h-auto rounded-md" />
//                   <div className='absolute top-2 left-2 flex items-center gap-3'>
//                     <span className=' bg-DarkRed p-2 rounded-full w-10 h-10 text-white flex items-center justify-center'>{discount}%</span>
//                     <span className=' bg-DarkRed p-2 rounded-full w-10 h-10 text-white flex items-center justify-center'><IoMdHeart/></span>
//                   </div>
//                 </div>
//                 <div className='listDetails'>
//                   <h1 className='text-white font-bold text-2xl'>{prod.name}</h1>
//                   <span className='text-red-700'>{prod.price}</span>
//                 </div>
//               </Link>
//             )).slice(
//               page * 9,
//               page * 9 + 9
//             )
//             }
//           </div>
//           <div className='flex items-center justify-center gap-2 my-4 '>
//             {[...Array(Math.ceil(sortedProducts.length / 9)).keys()].map((index) => (
//               <button key={index} onClick={() => setPage(index)} className={`border-black border-[1px] px-2 py-1 rounded-sm ${page === index ? "bg-black text-white" : ""}`}>{index + 1}</button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shop;
"use client";
import React, { useState, useMemo, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { ProductContext } from "@/app/Context/ProductContext";
import { CartContext } from "@/app/Context/Cart";

const Shop = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { products } = useContext(ProductContext);
  const { discount } = useContext(CartContext);

  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    material: [],
    color: [],
    size : [],
    minPrice: 0,
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortPrice, setSortPrice] = useState("default");
  const [page, setPage] = useState(0);
  const [showFilters, setShowFilters] = useState(true);

  const categories = ["Top Wear", "Bottom Wear"];
  const genders = ["men", "women"];
  const materials = ["Cotton", "Wool", "Denim", "Polyester", "Linen"];
  const colors = ["Red", "Blue", "Green", "Black", "White", "Yellow"];
  const sizes = ["S", "M", "L", "XL", "XXL"];
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      material: params.material ? params.material.split(",") : [],
      color: params.color ? params.color.split(",") : [],
      size: params.size ? params.size.split(",") : [],
      minPrice: params.minPrice ? parseFloat(params.minPrice) : 0,
      maxPrice: params.maxPrice ? parseFloat(params.maxPrice) : 100,
    });
    setPriceRange([
      params.minPrice ? parseFloat(params.minPrice) : 0,
      params.maxPrice ? parseFloat(params.maxPrice) : 100,
    ]);
  }, [searchParams]);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (type === "material" || type === "color" || type === "size") {
        newFilters[type] = newFilters[type].includes(value)
          ? newFilters[type].filter((item) => item !== value)
          : [...newFilters[type], value];
      } else {
        newFilters[type] = newFilters[type] === value ? "" : value;
      }
      updateUrlParams(newFilters);
      return newFilters;
    });
  };

  const updateUrlParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
    });
    router.push(`?${params.toString()}`);
  };

const filteredProducts = useMemo(() => {
  return products.filter((product) => {
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesGender = !filters.gender || product.gender === filters.gender;
    const matchesMaterial = filters.material.length === 0 || filters.material.includes(product.material);
    
    // Check if at least one selected color exists in product's color array
    const matchesColor = filters.color.length === 0 || product.colors.some((c) => filters.color.includes(c));
    const matchesSize = filters.size.length === 0 || product.sizes.some((s) => filters.size.includes(s));
    const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;

    return matchesCategory && matchesGender && matchesMaterial && matchesColor && matchesSize && matchesPrice;
  });
}, [filters, products]);


  const sortedProducts = useMemo(() => {
    return sortPrice === "lowToHigh"
      ? [...filteredProducts].sort((a, b) => a.price - b.price)
      : sortPrice === "highToLow"
      ? [...filteredProducts].sort((a, b) => b.price - a.price)
      : filteredProducts;
  }, [sortPrice, filteredProducts]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-6 py-24 bg-gray-100 min-h-screen">
      {/* Filters Sidebar */}
      <div
        className={`w-full lg:w-[20%] bg-white shadow-lg rounded-lg p-6 transition-all ${
          showFilters ? "block" : "hidden lg:block"
        }`}
      >
        <div className="flex justify-between items-center w-full mb-4">
          <h2 className="text-lg font-bold text-gray-800">Filters</h2>
          <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden text-black">
            ✕
          </button>
        </div>
        <div className="space-y-4">
          {/* Category */}
          <div>
            <h3 className="text-md font-semibold text-gray-700">Category</h3>
            {categories.map((category, index) => (
              <label key={index} className="flex items-center gap-2 mt-2">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={filters.category === category}
                  onChange={() => handleFilterChange("category", category)}
                  className="h-4 w-4"
                />
                {category}
              </label>
            ))}
          </div>

          {/* Gender */}
          <div>
            <h3 className="text-md font-semibold text-gray-700">Gender</h3>
            {genders.map((gender, index) => (
              <label key={index} className="flex items-center gap-2 mt-2">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={filters.gender === gender}
                  onChange={() => handleFilterChange("gender", gender)}
                  className="h-4 w-4"
                />
                {gender}
              </label>
            ))}
          </div>

          {/* Material */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">Material</span>
            <ul className="flex flex-col gap-3 text-base">
              {materials.map((material, index) => (
                <div key={material} className="flex items-center gap-3 cursor-pointer">
                  <input
                    checked={filters.material.includes(material)}
                    onChange={() => handleFilterChange("material", material)}
                    value={material}
                    type="checkbox" name="material" id=""
                    className='h-4 w-f text-blue-500 focus:ring-blue-400 border-gray-300 mr-2' />
                    <li className='text-gray-900'>{material}</li>
                </div>
              ))}
            </ul>
          </div>
          {/* Color */}
          <div className="flex flex-col gap-2">
            <h3 className="text-md font-semibold text-gray-700">Color</h3>
            <div className="flex flex-col gap-3 items-start">
              {colors.map((color, index) => (
                <label
                  style={{ backgroundColor: color.toLowerCase() }}
                  key={index}
                  className={`w-7 h-7 ${filters.color.includes(color) ? "border-2 border-gray-500" : "border border-gray-200"}  rounded-full flex items-center justify-center cursor-pointer p-1`}>
                  <input
                    type="checkbox"
                    name="color"
                    value={color}
                    checked={filters.color.includes(color)}
                    onChange={() => handleFilterChange("color", color)}
                    className="h-4 w-4 hidden"
                  />
                  {/* {color} */}
                </label>
              ))}
            </div>
          </div>
          {/* Size */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">Size</span>
            <ul className="flex flex-col gap-3 text-base">
              {sizes.map((s, index) => (
                <div key={s} className="flex items-center gap-3 cursor-pointer">
                  <input
                    checked={filters.size.includes(s)}
                    onChange={() => handleFilterChange("size", s)}
                    value={s}
                    type="checkbox" name="material" id=""
                    className='h-4 w-f text-blue-500 focus:ring-blue-400 border-gray-300 mr-2' />
                    <li className='text-gray-900'>{s}</li>
                </div>
              ))}
            </ul>
          </div>
          {/* Price Range */}
          <div>
            <h3 className="text-md font-semibold text-gray-700">Price</h3>
            <input
              type="range"
              min="0"
              max="100"
              value={priceRange[1]}
              onChange={(e) => handleFilterChange("maxPrice", parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-gray-500 text-sm mt-2">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="w-full lg:w-[80%]">
        {/* Sort */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Products</h2>
          <select
            value={sortPrice}
            onChange={(e) => setSortPrice(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="default">Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedProducts.slice(page * 9, page * 9 + 9).map((prod, index) => (
            <Link key={index} href={`/Product/${prod._id}`} className="bg-white p-4 rounded-lg shadow hover:scale-105 transition">
              <Image src={prod.Photo[0].url} width={200} height={200} className="rounded-lg w-full" />
              <h3 className="font-bold mt-2">{prod.name}</h3>
              <span className="text-red-500">${prod.price}</span>
            </Link>
          ))}
        </div>
        <div className='flex items-center justify-center gap-2 my-4 '>
          {[...Array(Math.ceil(sortedProducts.length / 9)).keys()].map((index) => (
            <button key={index} onClick={() => setPage(index)} className={`border-black border-[1px] px-2 py-1 rounded-sm ${page === index ? "bg-black text-white" : ""}`}>{index + 1}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;