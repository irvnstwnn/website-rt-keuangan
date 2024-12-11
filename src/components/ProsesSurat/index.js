import React from 'react';

import iconProsesSurat from '../../assets/images/icon-proses-surat-primary.png';
import { Outlet } from 'react-router-dom';


const ProsesSurat = () => {
  return (
    <>
      <div className='shadow flex bg-secondary mt-6 pl-5 py-2'>
        <img src={iconProsesSurat} width={25} alt=""></img>
        <h1 className='text-lg text-primary font-semibold ms-1'>Proses Surat</h1>
      </div>
      <div className='p-7'>
        <Outlet />
      </div>
    </>
    
  )
}

export default ProsesSurat