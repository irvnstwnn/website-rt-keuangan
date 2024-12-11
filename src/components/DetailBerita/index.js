import React, { useState, useEffect } from 'react';
import imgTangan from '../../assets/images/img-tangan.png'
import iconIg from '../../assets/images/icon-ig.png'
import iconFb from '../../assets/images/icon-fb.png'
import Swal from 'sweetalert2';
import { COLLECTION_BERITA, db} from '../../config/firestore'; 
import { getDoc, doc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';


const DetailBerita = () => {
  const { id } = useParams();
  const docRef = doc(db, COLLECTION_BERITA, id);
  const [judulBerita, setJudulBerita] = useState('')
  const [isiBerita, setIsiBerita] = useState('')
  const [fotoUrl, setFotoUrl] = useState('')

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
        setFotoUrl(beritaSnapshot.data().fotoUrl)
        
        Swal.close()
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      Swal.close()
      console.error("Error fetching document:", error);
    }
  }
  useEffect(() => {
    fetchBerita();
  }, [id])

  return (
    <>
    <div
      style={{
        marginTop: 80
      }}
      className='min-h-screen px-5'
    >
      <div className="grid grid-cols-3 gap-4">
        <div className='mt-6 col-span-2'>
          <h1 className='text-4xl font-bold'>Berita Terkini</h1>
          <hr className="mt-1 border-t-4 border-orange mb-5" />
        </div>
      </div>

      <h1 className='font-bold text-3xl mb-5 text-primary'>{judulBerita}</h1>
      <img src={fotoUrl} alt='' className='rounded-5 h-96 w-full object-cover'/>

      <p className='mt-5'>{isiBerita}</p>

    </div>
    

    <div className=" bg-primary mt-8">
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 py-8'>
        <div className="flex items-center space-x-4 ">
          <img className="w-32 h-32 object-cover" src={imgTangan} alt="" />
          <div>
            <p className='text-white'>RT 11 Perumahan Valencia, RT Mendalo Indah, Kecamatan Jambi Luar Kota, Kabupaten Muaro Jambi</p>
          </div>
        </div>
        <div className='ms-20 text-white flex flex-col items-center justify-center'>
          <div>
            <h1 className='text-center font-semibold text-xl'>Kontak Kami</h1>
            <h1 className='text-center text-lg'>+62 8000-0000-0000</h1>
          </div>
          <div className='flex gap-4 mt-1'>
            <img className=" object-cover" src={iconFb} alt="" />
            <img className=" object-cover" src={iconIg} alt="" />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default DetailBerita