import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Untuk Firebase Storage
import { db, storage, COLLECTION_BERITA, COLLECTION_PENGUMUMAN } from '../../../config/firestore'
import { collection, addDoc, setDoc } from "firebase/firestore"; 

const Add = () => {
  const [isiBerita, setIsiBerita] = useState('')
  const [judulBerita, setJudulBerita] = useState('')
  const [judulPengumuman, setJudulPengumuman] = useState('')
  const [fileFoto, setFileFoto] = useState(null)
  const [isiPengumuman, setIsiPengumuman] = useState('')

  const uploadBerita = async (e) => {
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

      const fotoUrl = fileFoto ? await uploadFile(fileFoto, `FotoBerita`) : null;
      
      const docRef = await addDoc(collection(db, COLLECTION_BERITA), {
        judulBerita,
        isiBerita,
        fotoUrl,
      });

      await setDoc(docRef, { id: docRef.id }, { merge: true });

      Swal.fire({
        title: 'Sukses!',
        text: 'Berkas Terkirim',
        icon: 'success',
        confirmButtonText: 'OK'
      })

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Terjadi kesalahan saat menambahkan data.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const uploadPengumuman = async (e) => {
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

      const docRef = await addDoc(collection(db, COLLECTION_PENGUMUMAN), {
        judulPengumuman,
        isiPengumuman
      });

      await setDoc(docRef, { id: docRef.id }, { merge: true });

      Swal.fire({
        title: 'Sukses!',
        text: 'Berkas Terkirim',
        icon: 'success',
        confirmButtonText: 'OK'
      })

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
      <h1 className='text-xl font-semibold text-gray-800'>Menambahkan Berita</h1>
      <form onSubmit={uploadBerita} className='mt-4 mb-6 border border-primary rounded px-6 py-2' >
        <h1 className='text-md font-semibold mb-2'>Informasi Umum</h1>
        <label htmlFor="judulBerita" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Judul Berita
          </span>
          <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="judulBerita"
          type="text"
          name="judulBerita"
          placeholder="Masukkan Judul Berita"
          value={judulBerita}
          onChange={e => setJudulBerita(e.target.value)} />
        </label>

        <label htmlFor="isiBerita" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Isi Berita
          </span>
          <textarea rows={8} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="isiBerita"
          type="text"
          name="isiBerita"
          placeholder="Masukkan Isi Berita"
          value={isiBerita}
          onChange={e => setIsiBerita(e.target.value)} />
        </label>

        <label htmlFor="fileFoto" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Upload Gambar
          </span>
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
            id="fileFoto"
            type="file"
            name="fileFoto"
            onChange={(e) => setFileFoto(e.target.files[0])} // Mengambil file yang dipilih
          />
        </label>

        <button type="submit" className="mt-2 w-full bg-primary text-white font-bold p-2 rounded-md hover:bg-blue-600">
          Tambahkan Berita
        </button>
      </form>

      <form onSubmit={uploadPengumuman} className='mb-10 border border-primary rounded px-6 py-2' >
        <h1 className='text-md font-semibold mb-2'>Pengumuman</h1>

        <label htmlFor="judulPengumuman" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Judul Pengumuman
          </span>
          <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="judulPengumuman"
          type="text"
          name="judulPengumuman"
          placeholder="Masukkan Judul Pengumuman"
          value={judulPengumuman}
          onChange={e => setJudulPengumuman(e.target.value)} />
        </label>

        <label htmlFor="isiPengumuman" className="block mb-3">
          <textarea rows={8} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="isiPengumuman"
          type="text"
          name="isiPengumuman"
          placeholder="Tuliskan Pengumuman Disini"
          value={isiPengumuman}
          onChange={e => setIsiPengumuman(e.target.value)} />
        </label>

        <button type="submit" className="mt-2 w-full bg-primary text-white font-bold p-2 rounded-md hover:bg-blue-600">
          Tambahkan Pengumuman
        </button>
      </form>
    </div>
  )
}

export default Add