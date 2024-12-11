import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { db, COLLECTION_KEUANGAN } from '../../../../config/firestore'
import { collection, addDoc, setDoc } from "firebase/firestore"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';

const AddKeuangan = () => {
  const [kategori, setKategori] = useState('Pemasukan');
  const [tanggal, setTanggal] = useState(null);
  const [keterangan, setKeterangan] = useState('')
  const [jumlah, setJumlah] = useState(0)
  const navigate = useNavigate()

  const handleDateChange = (date) => {
    setTanggal(date);
  };


  const uploadKeuangan = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Uploading...',
      text: 'Mohon tunggu, data sedang di-upload.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Menampilkan indikator loading
      }
    });
    try {
      const jumlahToSend = Number(jumlah);
      const docRef = await addDoc(collection(db, COLLECTION_KEUANGAN), {
        tanggal,
        keterangan,
        kategori,
        jumlah: jumlahToSend
      });

      await setDoc(docRef, { id: docRef.id }, { merge: true });

      Swal.fire({
        title: 'Sukses!',
        text: 'Berkas Terkirim',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/dashboardbendahara/keuangan/listkeuangan')
        }
      });

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Terjadi kesalahan saat menambahkan data.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
  
  return (
    <div>
      <form onSubmit={uploadKeuangan} className='mb-10 border border-primary rounded px-6 py-2' >
        <h1 className='text-md font-semibold mb-2'>Input Informasi Keuangan</h1>

        <label htmlFor="judulPengumuman" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Tanggal
          </span>
          <DatePicker
          selected={tanggal}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          placeholderText="Pilih Tanggal"
        />
        </label>

        <label htmlFor="keterangan" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Keterangan
          </span>
          <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="keterangan"
          type="text"
          name="keterangan"
          placeholder="Masukkan Keterangan"
          value={keterangan}
          onChange={e => setKeterangan(e.target.value)} />
        </label>

        <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          Kategori
        </span>
        <select
          className="mt-1 mb-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          id="kategori"
          name="kategori"
          value={kategori}
          onChange={e => setKategori(e.target.value)}
        >
          <option value="Pemasukan">Pemasukan</option>
          <option value="Pengeluaran">Pengeluaran</option>
        </select>

        <label htmlFor="jumlah" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Jumlah
          </span>
          <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="jumlah"
          type="number"
          name="jumlah"
          placeholder="Masukkan Jumlah Pemasukan/Pengeluaran"
          value={jumlah}
          onChange={e => setJumlah(e.target.value)} />
        </label>

        <button type="submit" className="mt-2 w-full bg-primary text-white font-bold p-2 rounded-md hover:bg-blue-600">
          Tambahkan
        </button>
      </form>
    </div>
  )
}

export default AddKeuangan