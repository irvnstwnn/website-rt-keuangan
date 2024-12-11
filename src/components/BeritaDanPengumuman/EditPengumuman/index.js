import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { db, COLLECTION_PENGUMUMAN} from '../../../config/firestore'
import { updateDoc, doc, getDoc} from "firebase/firestore"; 

const EditPengumuman = () => {
  const { id } = useParams();
  const docRef = doc(db, COLLECTION_PENGUMUMAN, id);
  const [isiPengumuman, setIsiPengumuman] = useState('')
  const [judulPengumuman, setJudulPengumuman] = useState('')
  const navigate = useNavigate()

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
      const pengumumanRef = doc(db, COLLECTION_PENGUMUMAN, id);

      await updateDoc(pengumumanRef, {
        judulPengumuman,
        isiPengumuman,
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
  }

  const fetchPengumuman = async () => {
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
        setJudulPengumuman(beritaSnapshot.data().judulPengumuman)
        setIsiPengumuman(beritaSnapshot.data().isiPengumuman)
        Swal.close()
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  useEffect(() => {
    fetchPengumuman();
  }, [id]);

  return (
    <div>
      <h1 className='text-xl font-semibold text-gray-800'>Edit Pengumuman</h1>
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
          Edit Pengumuman
        </button>
      </form>
    </div>
  )
}

export default EditPengumuman