import React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from "react-icons/io";

const SearchBar = ({value , onChange , handleSearch , onClearSearch }) => {


  return (
    <div className='w-100 flex items-center px-4 bg-white rounded-lg'>
        <input 
        type="text"
        placeholder='Search Notes'
        className='w-full text-xs bg-transparent py-[10px] outline-none'
        value={value}
        onChange={onChange}
        />
        { value && (<IoMdClose className='text-xl text-slate-400 cursor-pointer hover:text-black mr-3' onClick={onClearSearch}
        />
    )}
        <FaMagnifyingGlass className='text-slate-400 cursor-pointer hover:text-black'onClick={handleSearch}/>
    </div>
  )
}

export default SearchBar