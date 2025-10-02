import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import arrow from '../../assets/arrow_icon.png'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={logo} alt="logo" className='logo' />

        <ul>
            <li>Home</li>
            <li>Feature</li>
            <li>Pricing</li>
            <li>Blog</li>
        </ul>

        <div className="nav-right">
            <select>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="inr">INR</option>
                <option value="bdt">BDT</option>
            </select>

            <button>Sign Up <img src={arrow} alt="" /></button>
        </div>
    </div>
  )
}

export default Navbar