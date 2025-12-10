import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='navbar'>

            <ul>
               
       
                <li> <Link to='/user/profile'>  Profile </Link> </li>
                <li> <Link to='/register'>  Register </Link> </li>
                <li> <Link to='/login'>  Login </Link> </li>
            </ul>


        </div>
    )
}

export default Navbar