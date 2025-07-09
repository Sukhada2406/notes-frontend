import React from 'react'
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({ userInfo ,onLogout}) => {

  if (!userInfo) return null;
  
  return (
    <>
        <div className='flex items-center gap-4'>
            <div className='w-12 h-12 flex items-center justify-center rounded-full text-blue-500 font-bold bg-white'>
                {getInitials(userInfo.fullName)}
            </div>
            <p className='text-medium font-medium text-white'>{userInfo.fullName}</p>
            <button className='text-white text-lg ' onClick={onLogout}>Logout</button>
        </div>
    </>
  )
}

export default ProfileInfo