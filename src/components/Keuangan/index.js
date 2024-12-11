import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import { collection, getDocs } from 'firebase/firestore';
import {COLLECTION_KEUANGAN, db} from '../../config/firestore'; 
import imgTangan from '../../assets/images/img-tangan.png'
import iconIg from '../../assets/images/icon-ig.png'
import iconFb from '../../assets/images/icon-fb.png'
import { format } from "date-fns";

const Keuangan = () => {
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
      <div className="bg-white min-h-screen"
      style={{
        marginTop: 90
      }}>
      <table className="min-w-full shadow-md rounded-lg divide-y mt-3 divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keterangan</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
            
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{format(item.tanggal.toDate(), "dd/MM/yyyy")}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.keterangan}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.kategori}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{item.jumlah}</td>
            </tr>
          ))}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-primary" colSpan={4}>Total Pemasukan</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-primary font-semibold">{pemasukan}</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-primary" colSpan={4}>Total Pengeluaran</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-primary font-semibold">{pengeluaran}</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-primary" colSpan={4}>Total Saldo RT</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-primary font-semibold">{totalSaldo}</td>
          </tr>
        </tbody>
      </table>
      </div>
    
      <div className=" bg-primary mt-8">
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 py-8'>
          <div className="flex items-center space-x-4 ">
            <img className="w-32 h-32 object-cover" src={imgTangan} alt="" />
            <div>
              <p className='text-white'>RT 11 Perumahan Valencia, RT Mendalo Indah, Kecamatan Jambi Luar Kota, Kabupaten Muaro Jambi</p>
            </div>
          </div>
          <div className='ms-20 text-white flex flex-col items-center justify-center'>
            <div>
              <h1 className='text-center font-semibold text-xl'>Kontak Kami</h1>
              <h1 className='text-center text-lg'>+62 8000-0000-0000</h1>
            </div>
            <div className='flex gap-4 mt-1'>
              <img className=" object-cover" src={iconFb} alt="" />
              <img className=" object-cover" src={iconIg} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Keuangan