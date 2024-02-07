import React from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const navigate=useNavigate()
    const handleLogout=()=>{
        localStorage.clear()
        navigate("/")
    }
  return (
    <>
        <button className='bg-side-bar text-pink-600 font-semibold text-lg px-4 py-1 hover:invert transition-all duration-300' onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Logout