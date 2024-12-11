import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db, COLLECTION_BERKAS } from '../../config/firestore'; 
import Swal from 'sweetalert2';

const ListSurat = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      Swal.fire({
        title: 'Loading...',
        text: 'Mohon Tunggu',
        allowOutsideClick: false, // Prevent closing by clicking outside
        didOpen: () => {
          Swal.showLoading(); // Show loading spinner
        }
      });

      const querySnapshot = await getDocs(collection(db, COLLECTION_BERKAS));
      const items = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => new Date(a.tanggalPengajuan) - new Date(b.tanggalPengajuan));
      setData(items);
      console.log(data)
      Swal.close()
    } catch (error) {
      console.error('Error fetching data: ', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch the document!'
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Pengajuan</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIK</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tempat, Tanggal Lahir</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agama</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Pernikahan</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alamat</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keperluan Surat</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">KTP</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">KK</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keterangan</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tanggalPengajuan}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.nama}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.nik}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.ttl}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.agama}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.status}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.alamat}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.keperluanSurat}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><a target="_blank" href={`${item.ktpUrl}`} className="text-blue-500 underline hover:text-blue-700">KTP.Pdf</a></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><a target="_blank" href={`${item.kkUrl}`} className="text-blue-500 underline hover:text-blue-700">KK.Pdf</a></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white flex justify-center items-center">
                <h1 
                  className={`cursor-pointer rounded px-2 py-1 ${item.statusSurat === 'DiTerima' ? 'bg-green-500' : item.statusSurat === 'DiTolak' ? 'bg-red-500' : 'bg-primary'}`}
                  onClick={() => navigate(`/dashboardadmin/prosessurat/${item.id}`)}
                >
                  {item.statusSurat}
                </h1>
              </td>
              {item.statusSurat === 'DiTerima' ? (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><a target="_blank" href={`${item.suratBalasan}`} className="text-blue-500 underline hover:text-blue-700">Download Surat Balasan</a></td>
              ) : item.statusSurat === 'DiTolak' ? (
                <td className="px-6 py-4 text-sm text-gray-500">{item.alasanPenolakan}</td>
              ) : (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sedang DiProses</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListSurat