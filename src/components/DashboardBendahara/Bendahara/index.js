import React, { useState, useEffect } from 'react'
import bgDashboard from '../../../assets/images/bg-dashboard-admin.jpg';
import imgSelamatDatang from '../../../assets/images/img-selamat-datang-admin.png'
import IconUangMasuk from "../../../assets/images/icon-uang-masuk.png";
import IconUangKeluar from "../../../assets/images/icon-uang-keluar.png";
import Swal from 'sweetalert2';
import { collection, getDocs } from 'firebase/firestore';
import {COLLECTION_KEUANGAN, db} from '../../../config/firestore'; 

const Bendahara = () => {
  const [data, setData] = useState([]);
  const [totalSaldo, setTotalSaldo] = useState(0);
  const [pemasukan, setPemasukan] = useState(0);
  const [pengeluaran, setPengeluaran] = useState(0);


  const fetchData = async () => {
    Swal.fire({
      title: 'Loading...',
      text: 'Mohon Tunggu',
      allowOutsideClick: false, // Prevent closing by clicking outside
      didOpen: () => {
        Swal.showLoading(); // Show loading spinner
      }
    });

    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_KEUANGAN));
      const items = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => a.tanggal.seconds - b.tanggal.seconds);
      setData(items);
      console.log(data)

      let totalPemasukan = 0;
      let totalPengeluaran = 0;

      items.forEach(item => {
        if (item.kategori === "Pemasukan") {
          totalPemasukan += item.jumlah; // Asumsi ada field 'jumlah' yang menyimpan nilai pemasukan/pengeluaran
        } else if (item.kategori === "Pengeluaran") {
          totalPengeluaran += item.jumlah;
        }
      });

      setPemasukan(totalPemasukan);
      setPengeluaran(totalPengeluaran);

      setTotalSaldo(totalPemasukan - totalPengeluaran);
      console.log("Total Pemasukan: ", totalPemasukan);
      console.log("Total Pengeluaran: ", totalPengeluaran);
      console.log("Total Saldo: ", totalSaldo);

      Swal.close()
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div
        className="bg-cover mt-6 pb-40 bg-center"
        style={{ backgroundImage: `url(${bgDashboard})` }}>
          <h1 className='text-white p-8 text-3xl font-semibold'>Dashboard Bendahara</h1>
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
            <h1 className='text-primary text-3xl font-bold mb-2 text-center'>Selamat Datang Bendahara</h1>
          </div>
          <div className='flex justify-center align-center'>
            <img src={imgSelamatDatang} width={280} alt='...'/>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-3'>
          <div className="flex flex-col bg-primary rounded-md p-4">
            <div className='flex justify-between'>
              <div>
                <h1 className='text-white font-semibold'>Total Pemasukan</h1>
                <h1 className='text-white font-bold'>{pemasukan}</h1>
              </div>
              <div>
                <img src={IconUangMasuk} width={50} alt=''/>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-primary rounded-md p-4">
            <div className='flex justify-between'>
              <div>
                <h1 className='text-white font-semibold'>Total Pengeluaran</h1>
                <h1 className='text-white font-bold'>{pengeluaran}</h1>
              </div>
              <div>
                <img src={IconUangKeluar} width={50} alt=''/>
              </div>
            </div>
          </div>
          
        </div>

        <div className='grid grid-cols-1 gap-3 mt-3'>
          <div className="flex flex-col bg-primary rounded-md p-8">
            <h1 className='text-white font-semibold text-center'>Sisa Saldo RT</h1>
            <h1 className='text-white font-semibold text-center'>{totalSaldo}</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default Bendahara