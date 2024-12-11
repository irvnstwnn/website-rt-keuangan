import React from 'react'

import iconBerita from '../../assets/images/icon-berita-primary.png';
import { Outlet } from 'react-router-dom';

const BeritaDanPengumuman = () => {
  return (
    <div>
      <div className='shadow flex bg-secondary mt-6 pl-5 py-2'>
        <img src={iconBerita} width={25} alt=""></img>
        <h1 className='text-lg text-primary font-semibold ms-1'>Berita Dan Pegumuman</h1>
      </div>
      <div className='p-7'>
        <Outlet />
      </div>
    </div>
  )
}

export default BeritaDanPengumuman