import React from 'react'
import imgBg from '../../assets/images/bg-beranda.png';
import imgVisi from '../../assets/images/gbr-visi.png'
import imgMisi from '../../assets/images/img-misi.png'
import imgTangan from '../../assets/images/img-tangan.png'
import iconIg from '../../assets/images/icon-ig.png'
import iconFb from '../../assets/images/icon-fb.png'

const TentangKami = () => {
  return (
    <>
    <div
      style={{
        backgroundImage: `url(${imgBg})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        marginTop: 70
      }}
    >
      <div className='container mx-auto pt-1' style={{marginTop: '70px'}}>
        <h1 className='text-center text-4xl text-white font-bold mt-4 underline underline-offset-8' style={{ textDecorationColor: '#FEB811' }}>Tentang Kami</h1>
        <p className='text-center mt-5 text-white text-xl leading-9 pb-10'>Selamat datang di website SIMARATA, sebuah platform digital yang dirancang untuk memudahkan warga dalam mendapatkan informasi terkini, transparan, dan akurat mengenai segala kegiatan di lingkungan RT kami.Website ini hadir sebagai inisiatif untuk menjawab kebutuhan warga akan akses yang lebih mudah terhadap laporan keuangan, berita, pengumuman, serta layanan administratif secara online. Kami berkomitmen untuk membangun lingkungan yang partisipatif, di mana setiap warga dapat dengan mudah berkontribusi, memberikan masukan, dan terlibat aktif dalam berbagai kegiatan sosial dan kemasyarakatan.</p>
        
      </div>
    </div>
    <div className='container mx-auto'>
      <h1 className='text-center text-4xl font-bold mt-4'>Visi dan Misi</h1>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className='flex justify-center md:justify-start'>
            <img src={imgVisi} alt='' width={350} style={{height: 'auto', objectFit: 'cover'}} />
          </div>
          <div className="flex flex-col align-center justify-center p-4">
            <div>
              <h1 className='text-primary text-3xl font-bold mb-2'>Visi</h1>
              <p>Mewujudkan komunitas RT yang harmonis, transparan, dan proaktif melalui pemanfaatan teknologi digital untuk membangun komunikasi dan kerjasama yang solid di antara warga</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-5">
          <div className="flex flex-col align-center justify-center p-4">
            <div>
              <h1 className='text-primary text-3xl font-bold mb-2'>Misi</h1>
              <ul class="list-disc">
                <li>Transparansi Keuangan</li>
                <p>Menyediakan akses terbuka bagi warga untuk melihat laporan keuangan RT secara detail, termasuk anggaran, pengeluaran, dan pemasukan, guna mendorong kepercayaan dan akuntabilitas.</p>
                <li>Informasi Terkini dan Akurat</li>
                <p>Menyajikan berita dan pengumuman terkait kegiatan RT, peraturan, kebijakan, serta isu-isu penting di lingkungan warga secara cepat, akurat, dan mudah diakses.</p>
                <li>Meningkatkan Partisipasi Warga</li>
                <p>Mendorong keterlibatan aktif warga dalam kegiatan sosial, kebersihan, keamanan, dan keputusan RT dengan mempublikasikan informasi penting melalui fitur berita dan pengumuman yang terintegrasi.</p>
                <li>Penyebaran Informasi yang Merata</li>
                <p>Menjamin bahwa setiap warga mendapatkan informasi penting melalui pengumuman dan berita yang diunggah secara rutin, dengan notifikasi yang dapat diakses kapan saja.</p>
              </ul>
            </div>
          </div>
          <div className='flex justify-center md:justify-end'>
            <img src={imgMisi} alt='' width={350} style={{height: 'auto', objectFit: 'cover'}} />
          </div>
        </div>
        
      </div>
      <h1 className='text-4xl font-bold mt-4 underline underline-offset-8 mb-4' style={{ textDecorationColor: '#FEB811' }}>Kenapa Kami Hadir ?</h1>
      <p>Website ini hadir sebagai respons terhadap kebutuhan masyarakat yang semakin dinamis dan modern, di mana kemudahan akses informasi dan transparansi menjadi aspek penting dalam membangun lingkungan yang harmonis dan produktif. Seiring berkembangnya teknologi, banyak warga yang membutuhkan sarana digital untuk memperoleh informasi yang cepat, akurat, dan transparan mengenai kegiatan RT, laporan keuangan, dan pengumuman penting lainnya.</p>
    </div>

    <div className=" bg-primary mt-8">
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 py-8'>
        <div className="flex items-center space-x-4 ">
          <img className="w-32 h-32 object-cover" src={imgTangan} alt="" />
          <div>
            <p className='text-white'>RT 11 Perumahan Valencia, Desa Mendalo Indah, Kecamatan Jambi Luar Kota, Kabupaten Muaro Jambi</p>
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

export default TentangKami