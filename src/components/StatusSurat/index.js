import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, COLLECTION_BERKAS } from '../../config/firestore'; 
import imgTangan from '../../assets/images/img-tangan.png'
import iconIg from '../../assets/images/icon-ig.png'
import iconFb from '../../assets/images/icon-fb.png'
import Swal from 'sweetalert2';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const StatusSurat = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    // Menampilkan Swal loading
    Swal.fire({
      title: 'Loading',
      text: 'Mohon tunggu...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Menampilkan indikator loading
      }
    });
  
    try {
      const auth = getAuth();
  
      // Menggunakan onAuthStateChanged untuk cek user
      onAuthStateChanged(auth, async (user) => { // Mengubah menjadi async
        if (user) {
          const uid = user.uid;
  
          // Query untuk mengambil data dengan userUid yang sama dengan user.uid
          const q = query(collection(db, COLLECTION_BERKAS), where("userUid", "==", uid));
  
          // Mendapatkan dokumen yang cocok
          const querySnapshot = await getDocs(q);
          const items = querySnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .sort((a, b) => new Date(a.tanggalPengajuan) - new Date(b.tanggalPengajuan));
  
          // Menyimpan data ke state
          setData(items);
  
          // Menutup Swal setelah data berhasil diambil
          Swal.close();
        }
      });
  
    } catch (error) {
      console.error('Error fetching data: ', error);
      Swal.fire({
        title: 'Error!',
        text: 'Terjadi kesalahan saat mengambil data.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='h-screen flex flex-col'>
      <div className="container mx-auto p-6 bg-gray-100 mt-20">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Pengajuan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keperluan Surat</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">Keterangan</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tanggalPengajuan}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.nama}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.keperluanSurat}</td>
                  <td className="px-6  py-4 whitespace-nowrap text-sm text-white flex justify-center"><h1 
                    className={`rounded px-2 py-1 ${item.statusSurat === 'DiTerima' ? 'bg-green-500' : item.statusSurat === 'DiTolak' ? 'bg-red-500' : 'bg-primary'}`}
                  >
                    {item.statusSurat}
                  </h1></td>
                  {item.statusSurat === 'DiTerima' ? (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><a target="_blank" href={`${item.suratBalasan}`} className="text-blue-500 underline hover:text-blue-700">Download Surat Balasan</a></td>
                  ) : item.statusSurat === 'DiTolak' ? (
                    <td className="px-6 py-4  text-sm text-gray-500">{item.alasanPenolakan}</td>
                  ) : (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sedang DiProses</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-auto bg-primary">
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 py-8'>
          <div className="flex items-center space-x-4">
            <img className="w-32 h-32 object-cover" src={imgTangan} alt="" />
            <div>
              <p className='text-secondary'>RT 11 Perumahan Valencia, Desa Mendalo Indah, Kecamatan Jambi Luar Kota, Kabupaten Muaro Jambi</p>
            </div>
          </div>
          <div className='ms-20 text-secondary flex flex-col items-center justify-center'>
            <div>
              <h1 className='text-center font-semibold text-xl'>Kontak Kami</h1>
              <h1 className='text-center text-lg'>+62 8000-0000-0000</h1>
            </div>
            {/* <div className='flex gap-4 mt-1'>
              <img className="object-cover" src={iconFb} alt="" />
              <img className="object-cover" src={iconIg} alt="" />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusSurat;
