import React from 'react'

const Product = ({imgSrc, name, price}) => {
  return (
    <div className='flex flex-col items-start py-2'>
        <img src={imgSrc} alt="Product" className='w-[223px] h-[223px] rounded-lg' />
        <p className='text-[#0D1C12] text-md font-semibold pt-0.5'>{name}</p>
        <p className='text-[#4F9469] text-sm'>Rs.{price}</p>
    </div>
  )
}

export default Product