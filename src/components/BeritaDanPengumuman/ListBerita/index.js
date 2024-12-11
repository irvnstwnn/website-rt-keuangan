import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { COLLECTION_BERITA, COLLECTION_PENGUMUMAN, db} from '../../../config/firestore'; 
import Swal from 'sweetalert2';

const ListBerita = () => {
  const [data, setData] = useState([]);
  const [dataPengumuman, setDataPengumuman] = useState([]);
  const navigate = useNavigate()

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
      const querySnapshot = await getDocs(collection(db, COLLECTION_BERITA));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(items);
      console.log(data)

      const querySnapshotPengumuman = await getDocs(collection(db, COLLECTION_PENGUMUMAN));
      const itemsPengumuman = querySnapshotPengumuman.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDataPengumuman(itemsPengumuman);
      console.log(data)
      Swal.close()
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Hapus Data?',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
    }).then(async result => {
      Swal.fire({
        title: 'Loading',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); 
        }
      });

      if (result.value) {
        await deleteDoc(doc(db, COLLECTION_BERITA, id));
        Swal.fire({
          icon: 'success',
          title: 'Data Berhasil DiHapus!',
          showConfirmButton: 'OK',
        });
        const dataCopy = data.filter(dataa => dataa.id !== id);
        setData(dataCopy);
      } else {
        Swal.close();
      }
    });
  };

  const handleDeletePengumuman = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Hapus Data?',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
    }).then(async result => {
      Swal.fire({
        title: 'Loading',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); 
        }
      });

      if (result.value) {
        await deleteDoc(doc(db, COLLECTION_PENGUMUMAN, id));
        Swal.fire({
          icon: 'success',
          title: 'Data Berhasil DiHapus!',
          showConfirmButton: 'OK',
        });
        const dataCopy = dataPengumuman.filter(dataa => dataa.id !== id);
        setDataPengumuman(dataCopy);
      } else {
        Swal.close();
      }
    });
  };

  return (
    <div className="bg-white">
      <div className='flex justify-between'>
        <h1 className='text-lg font-semibold'>Table Berita</h1>
        <button type="button" onClick={() => navigate('/dashboardadmin/beritadanpengumuman/add')} class="bg-green-500 text-white font-bold py-1 px-5 rounded-md hover:bg-green-600"
        >
          Tambah Data
        </button>
      </div>
      <table className="min-w-full shadow-md rounded-lg divide-y mt-3 divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Isi</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gambar</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" colSpan={2}>
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.judulBerita}</td>
              <td className="px-6 py-4 text-sm text-gray-500 line-clamp-5" style={{width:'450px'}}>{item.isiBerita}</td>
              <td>
                <img src={item.fotoUrl} alt="" />
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button 
                  type="button" 
                  className="bg-blue-500 text-white font-bold py-1 px-3 rounded-md hover:bg-blue-600"
                  onClick={() => navigate(`/dashboardadmin/beritadanpengumuman/${item.id}`)}
                >
                  Edit
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button 
                  type="button" 
                  className="bg-red-500 text-white font-bold py-1 px-3 rounded-md hover:bg-red-600"
                  onClick={() => handleDelete(item.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1 className='text-lg font-semibold mt-5'>Table Pengumuman</h1>
      <table className="min-w-full shadow-md rounded-lg divide-y mt-3 divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Isi</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" colSpan={2}>
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {dataPengumuman.map((item, index) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.judulPengumuman}</td>
              <td className="px-6 py-4 text-sm text-gray-500 line-clamp-5">{item.isiPengumuman}</td>
              <td>
                <img src={item.fotoUrl} alt="" />
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button 
                  type="button" 
                  className="bg-blue-500 text-white font-bold py-1 px-3 rounded-md hover:bg-blue-600"
                  onClick={() => navigate(`/dashboardadmin/beritadanpengumuman/pengumuman/${item.id}`)}
                >
                  Edit
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button 
                  type="button" 
                  className="bg-red-500 text-white font-bold py-1 px-3 rounded-md hover:bg-red-600"
                  onClick={() => handleDeletePengumuman(item.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListBerita