import React, { useEffect, useState } from 'react'
import { db, storage, COLLECTION_BERKAS, COLLECTION_USER } from '../../config/firestore'
import Swal from 'sweetalert2'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Untuk Firebase Storage
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';
import imgTangan from '../../assets/images/img-tangan.png'
import iconIg from '../../assets/images/icon-ig.png'
import iconFb from '../../assets/images/icon-fb.png'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const SuratPengantar = () => {
  const [userUid, setUserUid] = useState('');
  const [nama, setNama] = useState('');
  const [nik, setNik] = useState('');
  const [ttl, setTtl] = useState('');
  const [agama, setAgama] = useState('');
  const [status, setStatus] = useState('');
  const [alamat, setAlamat] = useState('');
  const [keperluanSurat, setKeperluanSurat] = useState('Surat Pengantar Pembuatan KTP');
  const [fileKTP, setFileKTP] = useState(null);
  const [fileKK, setFileKK] = useState(null);
  const navigate = useNavigate()
  const auth = getAuth();
  const [userData, setUserData] = useState({})

  useEffect(() => {
    Swal.fire({
      title: 'Loading',
      text: 'Mohon tunggu...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Menampilkan indikator loading
      }
    });
    onAuthStateChanged( auth, (user) => {
      if (user) {
        console.log(`ini user id : ${user.uid}`)
        setUserUid(user.uid)
        const fetchUserData = async () => {
          const docRef = doc(db, COLLECTION_USER, user.uid);
          try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              console.log("User data:", docSnap.data());
              setUserData(docSnap.data())
            } else {
              console.log("No such document!");
            }
            Swal.close()
          } catch (error) {
            console.error("Error getting document:", error);
            Swal.fire({
              title: 'Error!',
              text: 'Terjadi kesalahan saat mengambil data.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        };
        fetchUserData();
      } 
    });
  }, []);

  useEffect(() => {
    setNama(userData.nama)
    setNik(userData.nik)
    setTtl(userData.ttl)
    setAgama(userData.agama)
    setStatus(userData.status)
    setAlamat(userData.alamat)
  }, [userData])

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
      // Upload file KTP dan KK ke Firebase Storage
      const uploadFile = async (file, folder) => {
        const storageRef = ref(storage, `${folder}/${file.name}`);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef); // Mendapatkan URL download dari file
      };

      const ktpUrl = fileKTP ? await uploadFile(fileKTP, `KTP`) : null;
      const kkUrl = fileKK ? await uploadFile(fileKK, `KK`) : null;

      // Tambahkan data ke Firestore
      const now = new Date();

      // Mengonversi waktu ke UTC+7 (Waktu Indonesia)
      const offset = now.getTimezoneOffset() * 60000; // Perbedaan waktu dari UTC dalam milidetik
      const wibTime = new Date(now.getTime() + (7 * 60 * 60 * 1000) - offset);

      // Mengambil tanggal dengan format YYYY-MM-DD
      const tanggalPengajuan = wibTime.toISOString().split('T')[0];

      const docRef = await addDoc(collection(db, COLLECTION_BERKAS), {
        userUid,
        nama,
        nik,
        ttl,
        agama,
        status,
        alamat,
        keperluanSurat,
        ktpUrl,
        kkUrl,
        tanggalPengajuan, // Menambahkan tanggal pengajuan
        statusSurat: 'Terkirim',
        suratBalasan: '',
        alasanPenolakan: ''
      });

      await setDoc(docRef, { id: docRef.id }, { merge: true });

      Swal.fire({
        title: 'Sukses!',
        text: 'Berkas Terkirim',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/statussurat')
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
    <>
      <div className='container mx-auto pt-1' style={{marginTop: '70px'}}>
        <h1 className='text-3xl font-semibold mt-3'>Layanan Surat Pengantar RT</h1>

        <div className='flex justify-center mt-5'>
          <form onSubmit={handleUpload} className='mb-10 border border-primary rounded px-6 py-4 form-w' >
            <h1 className='text-2xl font-bold mb-2 text-center'>Masukkan Berkas</h1>

            <label htmlFor="alamat" className="block mb-3">
              <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Jenis Keperluan Surat
              </span>
              <select
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                id="keperluanSurat"
                name="keperluanSurat"
                value={keperluanSurat}
                onChange={e => setKeperluanSurat(e.target.value)}
              >
                <option value="Surat Pengantar Pembuatan KTP">Surat Pengantar Pembuatan KTP</option>
                <option value="Surat Pengantar Pembuatan Akta Kelahiran Anak">Surat Pengantar Pembuatan Akta Kelahiran Anak</option>
                <option value="Surat Pengantar Pengurusan SKTM">Surat Pengantar Pengurusan SKTM</option>
                <option value="Surat Pengantar Pengurusan Kartu Keluarga">Surat Pengantar Pengurusan Kartu Keluarga</option>
                <option value="Surat Pengantar Pengurusan Surat Pindah Penduduk">Surat Pengantar Pengurusan Surat Pindah Penduduk</option>
                <option value="Surat Pengantar Pengurusan Surat Domisili">Surat Pengantar Pengurusan Surat Domisili</option>
                <option value="Surat Pengantar Pengurusan Surat Ahli Waris">Surat Pengantar Pengurusan Surat Ahli Waris</option>
                <option value="Surat Pengantar Pengurusan Surat Dispensasi Nikah">Surat Pengantar Pengurusan Surat Dispensasi Nikah</option>
                <option value="Surat Pengantar Pengurusan Surat Rekomendasi Sekolah">Surat Pengantar Pengurusan Surat Rekomendasi Sekolah</option>
                <option value="Surat Pengantar Pengurusan Surat Keterangan Kematian">Surat Pengantar Pengurusan Surat Keterangan Kematian</option>
                <option value="Surat Pengantar Pengurusan Surat Keterangan Usaha">Surat Pengantar Pengurusan Surat Keterangan Usaha</option>
              </select>
            </label>

            <label htmlFor="fileKTP" className="block mb-3">
              <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Upload KTP
              </span>
              <span className="after:ml-0.5 after:text-red-500 block text-xs font-medium text-primary">
                Upload file dalam bentuk Pdf
              </span>
              
              <input
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                id="fileKTP"
                type="file"
                name="fileKTP"
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file && file.type !== "application/pdf") {
                    alert("Hanya file PDF yang diperbolehkan!");
                    e.target.value = null; // Reset input file
                  } else {
                    setFileKTP(file); // Simpan file jika valid
                  }
                }}
              />
            </label>

            <label htmlFor="fileKK" className="block mb-3">
              <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Upload KK
              </span>
              <span className="after:ml-0.5 after:text-red-500 block text-xs font-medium text-primary">
                Upload file dalam bentuk Pdf
              </span>
              <input
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                id="fileKK"
                type="file"
                name="fileKK"
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file && file.type !== "application/pdf") {
                    alert("Hanya file PDF yang diperbolehkan!");
                    e.target.value = null; // Reset input file
                  } else {
                    setFileKK(file); // Simpan file jika valid
                  }
                }} // Mengambil file yang dipilih
              />
            </label>

            <button type="submit" className="mt-4 w-full bg-primary text-secondary  font-bold p-2 rounded-md hover:bg-secondary hover:text-primary">
              Kirim Berkas
            </button>
          </form>
        </div>
      </div>

    <div className=" bg-primary mt-8">
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 py-8'>
        <div className="flex items-center space-x-4 ">
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
            <img className=" object-cover" src={iconFb} alt="" />
            <img className=" object-cover" src={iconIg} alt="" />
          </div> */}
        </div>
      </div>
    </div>
    </>
  )
}

export default SuratPengantar