import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'
import { NavbarMenuAdmin, NavbarMenu } from '../../data'
import { useNavigate } from 'react-router-dom'
import { signOut, getAuth } from 'firebase/auth'

const ResponsiveMenu = ({open, user}) => {
  const auth = getAuth()
  const navigate = useNavigate()
  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign Out"))
      .catch((error) => console.log(error))
  }
  return (
    <AnimatePresence>
      {
        open && (
          <motion.div
            initial={{opacity:0, y:-100}}          
            animate={{opacity:1, y:0}}          
            exit={{opacity:0, y:-100}}
            transition={{duration: 0.3}}
            className='absolute top-20 left-0 w-full h-screen z-20'          
          >
            <div className='text-xl font-semibold bg-primary text-white py-10 m-6 rounded-3xl'>
              <ul className='flex flex-col justify-center items-center gap-10'>
                {user ? (
                <>
                  {
                    NavbarMenuAdmin.map((item) => {
                      return (
                        <li key={item.id}>
                          <a href={item.link} className='inline-block py-1 px-3 hover:text-secondary font-semibold'>{item.title}</a>
                        </li>
                      )
                    })
                  }
                </>
                ) : (
                <>
                  {
                    NavbarMenu.map((item) => {
                      return (
                        <li key={item.id}>
                          <a href={item.link} className='inline-block py-1 px-3 hover:text-secondary font-semibold'>{item.title}</a>
                        </li>
                      )
                    })
                  }
                </>
                
              )}
              </ul>
              {user ? (
                <button onClick={handleSignOut} type="submit" class="mt-4 w-full bg-primary text-red-500 font-semibold p-2 rounded-md hover:bg-red-500 hover:text-white border border-red-300">
                  Logout
                </button>
              ): (
                <button onClick={() => navigate('/login')} type="submit" class="mt-4 w-full bg-primary text-secondary semi-bold p-2 rounded-md hover:bg-secondary hover:text-white border border-secondary">
                  Login
                </button>
              )}

            </div>
          </motion.div>
        )
      }
    </AnimatePresence>
  )
}

export default ResponsiveMenu