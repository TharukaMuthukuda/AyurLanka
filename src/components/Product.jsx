import React from 'react'

const Product = ({ imgSrc, name, price, rating }) => {
  return (
    <div className='relative flex flex-col items-start py-2'>
      {(rating === "positive") && (
            <div className='absolute top-4 right-2 bg-[#4F9469] text-white text-xs px-2 py-1 rounded-full shadow-md z-10'>
        Guaranteed ✅
      </div>
      )}
  
      
      <img
        src={imgSrc}
        alt="Product"
        className='w-[223px] h-[223px] rounded-lg object-cover'
      />
      <p className='text-[#0D1C12] text-md font-semibold pt-0.5'>{name}</p>
      <p className='text-[#4F9469] text-sm'>Rs.{price}</p>
    </div>
  )
}

export default Product
