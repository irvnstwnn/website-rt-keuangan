import React from 'react';

import iconKeuangan from '../../../assets/images/icon-keuangan.png';
import { Outlet } from 'react-router-dom';


const Keuangan = () => {
  return (
    <>
      <div className='shadow flex bg-secondary mt-6 pl-5 py-2'>
        <img src={iconKeuangan} width={25} alt=""></img>
        <h1 className='text-lg text-primary font-semibold ms-1'>Keuangan</h1>
      </div>
      <div className='p-7'>
        <Outlet />
      </div>
    </>
    
  )
}

export default Keuangan