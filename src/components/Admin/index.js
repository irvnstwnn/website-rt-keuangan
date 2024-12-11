import React, { useEffect, useState } from 'react';
import bgDashboard from '../../assets/images/bg-dashboard-admin.jpg';
import imgSelamatDatang from '../../assets/images/img-selamat-datang-admin.png'
import imgSurat from '../../assets/images/icon-surat.png'
import imgJmlPenduduk from '../../assets/images/icon-jml-penduduk-white.png'
import { collection, getDocs } from 'firebase/firestore';
import { db, COLLECTION_BERKAS, COLLECTION_DELETE, COLLECTION_USER } from '../../config/firestore';

const Admin = () => {
  const [jmlDataBerkas, setJmlDataBerkas] = useState(0);
  const [jmlDataDelete, setJmlDataDelete] = useState(0);
  const [jmlDataUser, setJmlDataUser] = useState(0);
  useEffect(() => {
    // Fungsi untuk mengambil data dari Firestore
    const fetchData = async () => {
      try {
        // Mengambil semua dokumen dari koleksi
        const querySnapshot = await getDocs(collection(db, COLLECTION_BERKAS));
        setJmlDataBerkas(querySnapshot.size); // Menghitung jumlah dokumen
        
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    const fetchDataUser = async () => {
      try {
        // Mengambil semua dokumen dari koleksi
        const querySnapshot = await getDocs(collection(db, COLLECTION_USER));
        setJmlDataUser(querySnapshot.size); // Menghitung jumlah dokumen
        console.log(querySnapshot.size)
        
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchDataUser();
    fetchData();
  }, []);

  return (
    <>
      <div
      className="bg-cover mt-6 pb-40 bg-center"
      style={{ backgroundImage: `url(${bgDashboard})` }}>
        <h1 className='text-white p-8 text-3xl font-semibold'>Dashboard Admin</h1>
      </div>
      <div
        style={{
          position: 'relative',
          marginLeft: 20,
          marginRight: 20,
          bottom: 170
        }}
        
      >
        <div style={{zIndex: 50,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',}} className='grid grid-cols-2 rounded-md mb-5 bg-white'>
          <div className="flex flex-col align-center justify-center">
            <h1 className='text-primary text-3xl font-bold mb-2 text-center'>Selamat Datang Admin</h1>
          </div>
          <div className='flex justify-center align-center'>
            <img src={imgSelamatDatang} width={280} alt='...'/>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-3'>
          <div className="flex flex-col bg-primary rounded-md p-4">
            <div className='flex justify-between'>
              <div>
                <h1 className='text-white font-semibold'>Surat Masuk</h1>
                <h1 className='text-white font-bold'>{jmlDataBerkas}</h1>
              </div>
              <div>
                <img src={imgSurat} width={50} alt=''/>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-primary rounded-md p-4">
            <div className='flex justify-between'>
              <div>
                <h1 className='text-white font-semibold'>Jumlah Penduduk</h1>
                <h1 className='text-white font-bold'>{jmlDataUser}</h1>
              </div>
              <div>
                <img src={imgJmlPenduduk} width={50} alt=''/>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Admin