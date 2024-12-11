import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Untuk Firebase Storage
import { db, storage, COLLECTION_BERITA} from '../../../config/firestore'
import { updateDoc, doc, getDoc} from "firebase/firestore"; 

const EditBerita = () => {
  const { id } = useParams();
  const docRef = doc(db, COLLECTION_BERITA, id);
  const [isiBerita, setIsiBerita] = useState('')
  const [judulBerita, setJudulBerita] = useState('')
  const [fileFoto, setFileFoto] = useState(null)
  const [urlFoto, setUrlFoto] = useState(null)
  const navigate = useNavigate()

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
      const beritaRef = doc(db, COLLECTION_BERITA, id);

      const uploadFile = async (file, folder) => {
        const storageRef = ref(storage, `${folder}/${file.name}`);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef); // Mendapatkan URL download dari file
      };

      const url = fileFoto ? await uploadFile(fileFoto, `FotoWarga`) : urlFoto;
      
      await updateDoc(beritaRef, {
        judulBerita,
        isiBerita,
        fotoUrl: url
      })

      Swal.fire({
        title: 'Sukses!',
        text: 'Berkas Terkirim',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/dashboardadmin/beritadanpengumuman/listberita')
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

  const fetchBerita = async () => {
    Swal.fire({
      title: 'Loading...',
      text: 'Mohon Tunggu',
      allowOutsideClick: false, // Prevent closing by clicking outside
      didOpen: () => {
        Swal.showLoading(); // Show loading spinner
      }
    });

    try {
      const beritaSnapshot = await getDoc(docRef);
      if (beritaSnapshot.exists()) {
        console.log("Document data:", beritaSnapshot.data());
        setJudulBerita(beritaSnapshot.data().judulBerita)
        setIsiBerita(beritaSnapshot.data().isiBerita)
        setUrlFoto(beritaSnapshot.data().fotoUrl)
        Swal.close()
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  useEffect(() => {
    fetchBerita();
  }, [id]);

  return (
    <div>
      <h1 className='text-xl font-semibold text-gray-800'>Edit Berita</h1>
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
            Ganti Gambar
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
          Edit Berita
        </button>
      </form>
    </div>
  )
}

export default EditBerita