import React from 'react';
import {MdOutlinePushPin} from 'react-icons/md';
import {MdCreate , MdDelete } from 'react-icons/md';
import moment from "moment";


const NoteCard = ({title , date , content , tags , isPinned , onEdit , onDelete , onPinNote }) => {
  return (
    <>
        <div className='border-none rounded-xl p-5 bg-white hover:shadow-xl transition-all ease-in-out'>
            <div className='flex items-center justify-between'>
                <div>
                    <h6 className='text-sm font-medium'>{title}</h6>
                    <span className='text-xs text-slate-500'>{moment(date).format('DD/MM/YYYY')}</span>
                </div>

                <MdOutlinePushPin 
                className={`icon-btn ${isPinned ? 'text-blue-400': 'text-black'}`}
                onClick = {onPinNote}
                />
            </div>

            <p className='text-xs text-slate-600 mt-2'>{content?.slice(0,60)}</p>

            <div className='flex items-center justify-between mt-2'>
                <div className='text-xs text-pink-500'>{tags.map((item) => `#${item} `)}</div>

                <div className='flex items-center gap-2'>
                    <MdCreate className='icon-btn text-green-500 hover:text-blue-500' onClick={onEdit}/>

                    <MdDelete className='icon-btn text-rose-600 hover:text-blue-500' onClick={onDelete}/>

                </div>
            </div>
        </div>
    </>
  )
}

export default NoteCard