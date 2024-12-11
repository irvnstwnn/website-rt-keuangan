import React, { useState, useEffect } from 'react';
import imgTangan from '../../assets/images/img-tangan.png'
import iconIg from '../../assets/images/icon-ig.png'
import iconFb from '../../assets/images/icon-fb.png'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { COLLECTION_BERITA, COLLECTION_PENGUMUMAN, db} from '../../config/firestore'; 
import { collection, getDocs, doc, deleteDoc, addDoc } from 'firebase/firestore';


const Dashboard = () => {
  const [data, setData] = useState([]);
  const [dataPengumuman, setDataPengumuman] = useState([]);
  const navigate = useNavigate()

  const Accordion = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="border border-gray-200 rounded-md mb-2">
        <button
          className="rounded-md w-full text-left px-4 py-2 bg-primary text-white text-lg font-bold flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {title}
        </button>
        {isOpen && (
          <div className="px-4 py-2 bg-white border-t border-gray-200">
            {content}
          </div>
        )}
      </div>
    );
  };

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
          <div className='grid grid-cols-3 gap-y-3 gap-x-3'>
            {data.map((item, index) => (
              <>
                <img className='cursor-pointer object-cover rounded-lg' src={item.fotoUrl} alt='' style={{height: '180px', width:'300px'}}
                onClick={() => navigate(`/detailberita/${item.id}`)}/>
                <div className='col-span-2 flex flex-col justify-center'>
                  <h1 className='cursor-pointer text-3xl font-bold text-primary line-clamp-2'
                  onClick={() => navigate(`/detailberita/${item.id}`)}>{item.judulBerita}</h1>
                  <p className='cursor-pointer line-clamp-4'
                  onClick={() => navigate(`/detailberita/${item.id}`)}>{item.isiBerita} </p>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className='mt-6'>
          <h1 className='text-4xl font-bold'>Pengumuman</h1>
          <hr className="mt-1 border-t-4 border-orange mb-5" />
            {dataPengumuman.map((item, index) => (
              <>
                <Accordion
                  title={item.judulPengumuman}
                  content={item.isiPengumuman}
                />
              </>
            ))}
          
        </div>
      </div>
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

export default Dashboard