
import {  Route, Routes} from 'react-router-dom'
import Home from "./pages/Home"
import Services from "./pages/Services"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Contact from "./pages/Contact"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import UserProfile from './pages/UserProfile'
import Explore from './pages/Explore'
import IsAuth from './hooks/IsAuth'


const App = () => {


 
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
          <Route path='/profile' element={   <IsAuth> <UserProfile />   </IsAuth>       } />
          <Route path='/explore' element ={   <IsAuth>   <Explore />  </IsAuth> }/>
        </Routes>
      </div>
      
      <Footer />



    </>


  )
}

export default App