import React, { useEffect, useState } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
export const FiltersCollection = ({ filtersAction, toggleFilter }) => {
const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname();

    const [filters, setFilters] = useState({
        category: '',
        gender: '',
        color: '',
        size: [],
        material: [],
        minPrice: 0,
        maxPrice: 100,
    });

    const [priceRange, setPriceRange] = useState([0, 100]);
    const categories = ['Top Wear', 'Bottom Wear'];
    const colors = ['Red', 'Black', 'Blue', 'Green', 'Yellow', 'Gray', 'White', 'Pink', 'Beige', 'Navy'];
    const sizes = ['S', 'XS', 'M', 'L', 'XL', 'XXL'];
    const genders = ['Men', 'Women' , 'Kids'];
    const materials = ['Cotton', 'Wool', 'Denim', 'Polyester', 'Linen', 'Silk', 'Viscose', 'Fleece'];
    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        setFilters({
            category: params.category || '',
            gender: params.gender || '',
            color: params.color || '',
            size: params.size ? params.size.split(',') : [],
            material: params.material ? params.material.split(',') : [],
            minPrice: params.minPrice ? parseFloat(params.minPrice) : 0,
            maxPrice: params.maxPrice ? parseFloat(params.maxPrice) : 100,
        });
        setPriceRange([
            params.minPrice ? parseFloat(params.minPrice) : 0,
            params.maxPrice ? parseFloat(params.maxPrice) : 100,
        ]);
    }, [searchParams]);

    const handleChangeFilter = (e) => {
        const { name, value, checked, type } = e.target;
        let newFilters = { ...filters };

        if (type === 'checkbox') {
            if (checked) {
                newFilters[name] = [...(newFilters[name] || []), value];
            } else {
                newFilters[name] = newFilters[name].filter((item) => item !== value);
            }
        } else {
            newFilters[name] = value;
        }

        setFilters(newFilters);
        updateUrlParams(newFilters);
    };

    const updateUrlParams = (newFilters) => {
        const params = new URLSearchParams();

        Object.keys(newFilters).forEach((key) => {
            if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
                params.append(key, newFilters[key].join(','));
            } else if (newFilters[key]) {
                params.append(key, newFilters[key]);
            }
        });

        router.push(`?${params.toString()}`);
    };

    const handlePriceChange = (e) => {
        const value = parseFloat(e.target.value);
        setPriceRange([0, value]);
        const newFilters = { ...filters, minPrice: 0, maxPrice: value };
        setFilters(newFilters);
        updateUrlParams(newFilters);
    };

  return (
    <div className={`w-[100%] lg:w-[20%] h-fit p-7 border-r border-black transition-all duration-700 flex items-start flex-col gap-3`}>
        <span className="font-bold text-xl text-black uppercase">Filters</span>
        <div className='grid grid-cols-2 lg:grid-cols-1 w-full gap-2'>
          {/* Category Filter */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">Category</span>
            <ul className="flex flex-col gap-2 text-base">
              {categories.map((category, index) => (
                <div onClick={()=> toggleFilter('category', category)} key={index} className="flex items-center gap-3 cursor-pointer">
                    <input checked={category === filters.category} onChange={handleChangeFilter} value={category} type="radio" name="category" id="" className='h-4 w-f text-blue-500 focus:ring-blue-400 border-gray-300 mr-2' />
                    <li className='text-gray-900'>{category}</li>
                </div>
              ))}
            </ul>
          </div>

          {/* Gender Filter */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">Gender</span>
            <ul className="flex flex-col gap-2 text-base">
                {genders.map((gender, index) => (
                    <div onClick={()=> toggleFilter('gender', gender)} key={index} className="flex items-center gap-3 cursor-pointer">
                        <input checked={gender === filters.gender} onChange={handleChangeFilter} value={gender} type="radio" name="gender" id="" className='h-4 w-f text-blue-500 focus:ring-blue-400 border-gray-300 mr-2' />
                        <li className='text-gray-900'>{gender}</li>
                    </div>
                ))}
            </ul>
          </div>
              {/* Color filter */}
            <div  className="flex flex-col gap-2">
                  <span className="font-bold text-base">Color</span>
                  <ul className="grid grid-cols-2 gap-3 text-base">
                    {colors.map((color) => (
                        <div
                            key={color}
                            className={`border border-gray-400 w-8 h-8 rounded-full cursor-pointer transition hover:scale-110 ${color.toLowerCase() === filters.color ? 'border-2 border-black' : ''}`}
                            style={{backgroundColor : color.toLowerCase()}}
                            onClick={() => handleChangeFilter({ target: { name: 'color', value: color } })}
                            value={color}
                        >
                        </div>
                    ))}
                  </ul>
            </div>

          {/* Material Filter */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">Material</span>
            <ul className="grid grid-cols-2 gap-3 text-base">
              {materials.map((material, index) => (
                <div key={material} className="flex items-center gap-3 cursor-pointer">
                    <input checked={filters.material.includes(material)} onChange={handleChangeFilter} value={material} type="checkbox" name="material" id="" className='h-4 w-f text-blue-500 focus:ring-blue-400 border-gray-300 mr-2' />
                    <li className='text-gray-900'>{material}</li>
                </div>
              ))}
            </ul>
            </div>
            
          {/* Sizes Filter */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">Size</span>
            <ul className="grid grid-cols-2 gap-3 text-base">
              {sizes.map((size, index) => (
                <div key={size} className="flex items-center gap-3 cursor-pointer">
                    <input checked={filters.size.includes(size)} onChange={handleChangeFilter} value={size} type="checkbox" name="size" id="" className='h-4 w-f text-blue-500 focus:ring-blue-400 border-gray-300 mr-2' />
                    <li className='text-gray-900'>{size}</li>
                </div>
              ))}
            </ul>
          </div>

            {/* Price Filter */}
            <div className="flex flex-col gap-2">
                <span className="font-bold text-base">Price</span>
                  <input value={priceRange[1]} onChange={handlePriceChange} type="range" name="price" id=""
                      className='w-[100%] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
                      min={0} max={100}
                  />
                  <div className='w-full flex items-center justify-between mt-2'> 
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                  </div>
        </div>
  {/* Color Filter */}
            <div>
                <span className="font-bold text-base">Color</span>
                <div className="grid grid-cols-5 gap-2 mt-2">
                    {colors.map((color, index) => (
                        <div
                            key={index}
                            className={`w-8 h-8 rounded-full cursor-pointer border ${filters.color.includes(color) ? 'border-2 border-black' : ''}`}
                            style={{ backgroundColor: color.toLowerCase() }}
                            onClick={() => handleChangeFilter('color', color)}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Size Filter */}
            <div>
                <span className="font-bold text-base">Size</span>
                <div className="grid grid-cols-3 gap-2 mt-2">
                    {sizes.map((size, index) => (
                        <button
                            key={index}
                            className={`border px-2 py-1 rounded-md text-sm ${filters.size.includes(size) ? 'bg-black text-white' : 'bg-gray-100'}`}
                            onClick={() => handleChangeFilter('size', size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </div>

  )
}
