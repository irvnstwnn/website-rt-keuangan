import { NavbarMenu, NavbarMenuAdmin, NavbarMenuBendahara } from '../../data'
import { MdMenu } from "react-icons/md"
import imgLogo from '../../assets/images/logo-website.jpeg'
import React, { useState, useEffect } from 'react'
import ResponsiveMenu from './ResponsiveMenu'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { signOut, getAuth } from 'firebase/auth'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import imgTangan from '../../assets/images/img-tangan.png'

const Navbar = ({ user, role }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const auth = getAuth()
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign Out")
        navigate('/')
      })
      .catch((error) => console.log(error))
  }
  const [index, setIndex] = useState(0);
  const handleClick = (i) => {
    setIndex(i === index ? null : i); 
  };
  
  return (
    <>
      <nav className='bg-primary navbar'>
        <div className="px-2 flex justify-between items-center">
          <div className='text-2xl font-bold flex items-center gap-2'>
            <img src={imgTangan} className='img-logo' alt='...'></img>
            <p className='text-secondary cursor-pointer' onClick={() => navigate('/')}>SIMARATA</p>
          </div>
          <div className='hidden md:block'>
            <ul className='flex items-center gap-6 text-secondary'>
              <NavLink exact='true' to='/' className={({ isActive }) => `rounded-md py-1 px-5 cursor-pointer transition-all font-semibold ${ isActive ? 'bg-secondary text-primary' : 'hover:bg-secondary hover:text-primary'}`}>
                Keuangan
              </NavLink>

              { role === "Bendahara" && (
                <NavLink exact='true' to='/dashboardbendahara/bendahara' className={({ isActive }) => `rounded-md py-1 px-5 cursor-pointer transition-all font-semibold ${ isActive ? 'bg-secondary text-primary' : 'hover:bg-secondary hover:text-primary'}`}>
                  Bendahara
                </NavLink>
              )}
              
            </ul>
          </div>
          {user ? (
            <div className='flex items-center'>
              <button onClick={handleSignOut} className='hover:bg-secondary font-semibold hover:text-primary rounded-md border border-secondary text-secondary px-6 py-2 duration-200 hidden md:block'>Logout</button>
            </div>
          ): (
            <div className='flex items-center'>
              <NavLink to='/login' className={({ isActive }) => `hover:bg-secondary font-semibold hover:text-primary rounded-md border border-secondary px-6 py-2 duration-200 hidden md:block me-2 ${ isActive ? 'bg-secondary text-primary' : 'hover:bg-secondary'}`}>
                Login
              </NavLink>

              <NavLink to='/register' className={({ isActive }) => `hover:bg-secondary  font-semibold hover:text-primary rounded-md border border-secondary px-6 py-2 duration-200 hidden md:block ${ isActive ? 'bg-secondary text-primary' : 'hover:bg-secondary'}`}>
                Register
              </NavLink>
            </div>
          )}
          
          <div className='md:hidden cursor-pointer' onClick={() => setOpen(!open)}>
            <MdMenu className='text-4xl'/>
          </div>
        </div>
      </nav>
      <ResponsiveMenu open={open} user={user}/>

    </>
  )
}

export default Navbar