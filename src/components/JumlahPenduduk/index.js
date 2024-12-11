import React from 'react'

import iconProsesSurat from '../../assets/images/icon-jml-penduduk-primary.png';
import { Outlet } from 'react-router-dom';

const DataPenduduk = () => {
  return (
    <>
      <div className='shadow flex bg-secondary mt-6 pl-5 py-2'>
        <img src={iconProsesSurat} width={25} alt=""></img>
        <h1 className='text-lg text-primary font-semibold ms-1'>Data Warga</h1>
      </div>
      <div className='p-7'>
        <Outlet />
      </div>
    </>
  )
}

export default DataPenduduk