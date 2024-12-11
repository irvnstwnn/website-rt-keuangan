import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Untuk Firebase Storage
import { db, storage, COLLECTION_USER } from '../../../config/firestore'
import { collection, addDoc, setDoc, doc, getDoc, updateDoc} from "firebase/firestore"; 

const Edit = () => {
  const { id } = useParams();
  const docRef = doc(db, COLLECTION_USER, id);
  const [nama, setNama] = useState('')
  const [urlFoto, setUrlFoto] = useState('')
  const [fileFoto, setFileFoto] = useState(null)
  const navigate = useNavigate()
  const [nik, setNik] = useState('');
  const [ttl, setTtl] = useState('');
  const [jk, setJk] = useState('Laki-Laki');
  const [alamat, setAlamat] = useState('');
  const [agama, setAgama] = useState('');
  const [status, setStatus] = useState('Sudah Kawin');
  const [pekerjaan, setPekerjaan] = useState('');

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
      const pendudukRef = doc(db, COLLECTION_USER, id);

      const uploadFile = async (file, folder) => {
        const storageRef = ref(storage, `${folder}/${file.name}`);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef); 
      };

      const url = fileFoto ? await uploadFile(fileFoto, `FotoWarga`) : urlFoto;

      console.log(url)

      await updateDoc(pendudukRef, {
        agama,
        alamat,
        fotoUrl: url,
        jk,
        nama,
        nik,
        pekerjaan,
        status,
        ttl
      })

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
      console.log(error)
    }
  };

  const fetchPenduduk = async () => {
    Swal.fire({
      title: 'Loading...',
      text: 'Mohon Tunggu',
      allowOutsideClick: false, // Prevent closing by clicking outside
      didOpen: () => {
        Swal.showLoading(); // Show loading spinner
      }
    });

    try {
      const pendudukSnapshot = await getDoc(docRef);
      if (pendudukSnapshot.exists()) {
        console.log("Document data:", pendudukSnapshot.data());
        setNama(pendudukSnapshot.data().nama)
        setUrlFoto(pendudukSnapshot.data().fotoUrl)
        setNik(pendudukSnapshot.data().nik)
        setTtl(pendudukSnapshot.data().ttl)
        setAlamat(pendudukSnapshot.data().alamat)
        setJk(pendudukSnapshot.data().jk)
        setAgama(pendudukSnapshot.data().agama)
        setStatus(pendudukSnapshot.data().status)
        setPekerjaan(pendudukSnapshot.data().pekerjaan)
        Swal.close()
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  

  useEffect(() => {
    fetchPenduduk();
  }, [id]);

  return (
    <div className='flex justify-center'>
      <form onSubmit={handleUpload} className='mb-10 border border-primary rounded px-6 py-2 form-w' >
        <h1 className='text-xl font-semibold mb-2 text-center'>{`Edit Data ${nama}`}</h1>
        <label for="nik" class="block mb-3">
          <span class="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            NIK
          </span>
          <input class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="nik"
          type="text"
          name="nik"
          placeholder="Masukkan NIK"
          value={nik}
          onChange={e => setNik(e.target.value)} />
        </label>

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

        <label htmlFor="ttl" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Tempat, Tanggal Lahir
          </span>
          <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="ttl"
          type="text"
          name="ttl"
          placeholder="Masukkan Tempat Tanggal Lahir"
          value={ttl}
          onChange={e => setTtl(e.target.value)} />
        </label>

        <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          Jenis Kelamin
        </span>
        <select
          className="mt-1 mb-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          id="jk"
          name="jk"
          value={jk}
          onChange={e => setJk(e.target.value)}
        >
          <option value="Laki-Laki">Laki-Laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>

        <label htmlFor="alamat" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Alamat Lengkap
          </span>
          <textarea rows={4} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="alamat"
          type="alamat"
          name="alamat"
          placeholder="Masukkan Alamat Lengkap"
          value={alamat}
          onChange={e => setAlamat(e.target.value)} />
        </label>

        <label htmlFor="agama" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Agama
          </span>
          <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="agama"
          type="text"
          name="agama"
          placeholder="Masukkan Agama"
          value={agama}
          onChange={e => setAgama(e.target.value)} />
        </label>

        <label htmlFor="status" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Status Perkawinan
          </span>
          <select
          className="mt-1 mb-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          id="status"
          name="status"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="Sudah Kawin">Sudah Kawin</option>
          <option value="Belum Kawin">Belum Kawin</option>
        </select>
        </label>

        <label htmlFor="pekerjaan" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Pekerjaan
          </span>
          <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="pekerjaan"
          type="text"
          name="pekerjaan"
          placeholder="Masukkan Pekerjaan"
          value={pekerjaan}
          onChange={e => setPekerjaan(e.target.value)} />
        </label>

        <label htmlFor="fileFoto" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Ganti Foto
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
          Edit Data
        </button>
      </form>
    </div>
  )
}

export default Edit