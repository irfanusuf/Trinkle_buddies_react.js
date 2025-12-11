import React, { useEffect, useState } from 'react'
import {  Route, Routes, useNavigate } from 'react-router-dom'
import Home from "./pages/Home"
import Services from "./pages/Services"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Contact from "./pages/Contact"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import UserProfile from './pages/UserProfile'
import { axiosInstance } from './utils/axiosinstance'


const App = () => {

  const [user, setUser] = useState({})


  const navigate = useNavigate()

  async function fetchUserApi() {

    try {
      const token = localStorage.getItem("token")
      if (token !== null) {
        const response = await axiosInstance.get(`/user/verify?token=${token}`)   // API CALL
        if (response.status === 200) {

          setUser(response.data.payload)
        }

      } else {
        navigate("/login")
      }

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    fetchUserApi()      // whenveer App renders
  }, [])


  return (

    // jsx fragmentation 
    <>
      <Navbar />
      <ToastContainer />
      <div className='main'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/services' element={<Services />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/user/profile' element={<UserProfile user={user} />} />
        </Routes>
      </div>
      <Footer />



    </>


  )
}

export default App