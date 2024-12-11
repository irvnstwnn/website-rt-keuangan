import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Untuk Firebase Storage
import { db, storage, COLLECTION_PENDUDUK } from '../../../config/firestore'
import { collection, addDoc, setDoc } from "firebase/firestore"; 


const Add = () => {
  const [nama, setNama] = useState('')
  const [jabatan, setJabatan] = useState('')
  const [fileFoto, setFileFoto] = useState(null)
  const [keterangan, setKeterangan] = useState('')
  const navigate = useNavigate()

  const handleUpload = async (e) => {
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
      const uploadFile = async (file, folder) => {
        const storageRef = ref(storage, `${folder}/${file.name}`);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef); // Mendapatkan URL download dari file
      };

      const fotoUrl = fileFoto ? await uploadFile(fileFoto, `FotoWarga`) : null;
      
      const docRef = await addDoc(collection(db, COLLECTION_PENDUDUK), {
        nama,
        jabatan,
        fotoUrl,
        keterangan
      });

      await setDoc(docRef, { id: docRef.id }, { merge: true });

      Swal.fire({
        title: 'Sukses!',
        text: 'Berkas Terkirim',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/dashboardadmin/datapenduduk/listpenduduk')
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
  };

  return (
    <div className='flex justify-center'>
      <form onSubmit={handleUpload} className='mb-10 border border-primary rounded px-6 py-2 form-w' >
        <h1 className='text-xl font-semibold mb-2 text-center'>Tambah Data Penduduk</h1>
        <label htmlFor="nama" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Nama Lengkap
          </span>
          <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="nama"
          type="text"
          name="nama"
          placeholder="Masukkan Nama Lengkap"
          value={nama}
          onChange={e => setNama(e.target.value)} />
        </label>

        <label htmlFor="jabatan" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Jabatan
          </span>
          <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="jabatan"
          type="text"
          name="jabatan"
          placeholder="Warga Sipil"
          value={jabatan}
          onChange={e => setJabatan(e.target.value)} />
        </label>

        <label htmlFor="fileFoto" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Upload Foto
          </span>
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
            id="fileFoto"
            type="file"
            name="fileFoto"
            onChange={(e) => setFileFoto(e.target.files[0])} // Mengambil file yang dipilih
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
          placeholder="Masih Hidup / Almarhum"
          value={keterangan}
          onChange={e => setKeterangan(e.target.value)} />
        </label>

        <button type="submit" className="mt-2 w-full bg-primary text-white font-bold p-2 rounded-md hover:bg-blue-600">
          Tambahkan Data
        </button>
      </form>
    </div>
  )
}

export default Add