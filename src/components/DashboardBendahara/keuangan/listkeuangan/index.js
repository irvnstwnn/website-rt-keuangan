import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import {COLLECTION_KEUANGAN, db} from '../../../../config/firestore'; 
import Swal from 'sweetalert2';
import { format } from "date-fns";

const ListKeuangan = () => {
  const [data, setData] = useState([]);
  const [totalSaldo, setTotalSaldo] = useState(0);
  const navigate = useNavigate();
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
        await deleteDoc(doc(db, COLLECTION_KEUANGAN, id));
        Swal.fire({
          icon: 'success',
          title: 'Data Berhasil DiHapus!',
          showConfirmButton: 'OK',
        });
        const dataCopy = data.filter(dataa => dataa.id !== id);

        let totalPemasukan = 0;
        let totalPengeluaran = 0;

        dataCopy.forEach(item => {
          if (item.kategori === "Pemasukan") {
            totalPemasukan += item.jumlah; // Asumsi ada field 'jumlah' yang menyimpan nilai pemasukan/pengeluaran
          } else if (item.kategori === "Pengeluaran") {
            totalPengeluaran += item.jumlah;
          }
        });
        setTotalSaldo(totalPemasukan - totalPengeluaran);
        setData(dataCopy);
      } else {
        Swal.close();
      }
    });
  };

  return (
    <div className="bg-white">
      <div className='flex justify-end'>
        <button type="button" onClick={() => navigate('/dashboardbendahara/keuangan/add')} class="bg-green-500 text-white font-bold py-1 px-5 rounded-md hover:bg-green-600"
        >
          Tambah Data
        </button>
      </div>
      <table className="min-w-full shadow-md rounded-lg divide-y mt-3 divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keterangan</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" colSpan={2}>
              Aksi
            </th>
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button 
                  type="button" 
                  className="bg-blue-500 text-white font-bold py-1 px-3 rounded-md hover:bg-blue-600"
                  onClick={() => navigate(`/dashboardbendahara/keuangan/${item.id}`)}
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
  )
}

export default ListKeuangan