import React from 'react'

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className='flex flex-col items-center justify-center mt-20'>
        <img src={imgSrc} alt="No notes " className='w-80 h-60 mt-20'/>
        <p className='w-1/2 text-md font-bold text-gray-500 text-center leading-10 mt-10'>
        {message}
        </p>
    </div>
  )
}

export default EmptyCard