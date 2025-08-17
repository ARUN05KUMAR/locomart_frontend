import React, { useState } from 'react'
import { IoMenuOutline } from 'react-icons/io5'
import { AiOutlineClose } from 'react-icons/ai'
import { BsShopWindow } from 'react-icons/bs'
import { GrCart } from 'react-icons/gr'
import logo from '@/assets/logo.png'
import Search from './Search'
import { RiContactsLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
 
const Navbar = () => {
    const navigate = useNavigate()
    const [nav, setNav] = useState(true)
    const [navOpen, setNavOpen] = useState(false)

    const handleHamburger = () => {
        setNav(!nav)
        setNavOpen(!navOpen)
    }

    const scrollToSection = (id) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }
    const handleLogout = () => {
        localStorage.removeItem('access')
        navigate('/login/customer')
    }

    return (
        <nav className={`bg-slate-200`}>
            <div className=" flex justify-center items-center  mx-4 max-w-[1240px] md:mx-auto py-2 tracking-wider">
                <div className="flex gap-1 items-center justify-center">
                    <img src={logo} width={34} height={34} alt="logo" />
                    <h1 className="text-xl font-bold tighter-wider">Locomart</h1>
                </div>

                <Search />

                <ul className="hidden uppercase font-medium md:flex text-black ">
                <li className="">
                        <button
                            className="p-4 hover:text-[#000000] transition-all duration-300 underLight"
                            onClick={() => scrollToSection('company')}
                        >
                            <Link to="/">
                                <div className="flex justify-center items-center gap-2 underLight duration-300">
                                    Home
                                    
                                </div>
                            </Link>
                        </button>
                    </li>
                    <li className="">
                        <button
                            className="p-4 hover:text-[#000000] transition-all duration-300 underLight"
                            onClick={() => scrollToSection('company')}
                        >
                            <Link to="/login/vendor">
                                <div className="flex justify-center items-center gap-2">
                                    Store
                                    <BsShopWindow size={20} />
                                </div>
                            </Link>
                        </button>
                    </li>
                    <li>
                        <button
                            className="p-4 hover:text-[#000000] transition-all duration-300 underLight"
                            onClick={() => scrollToSection('resources')}
                        >
                            <Link to="/cart">
                                <div className="flex gap-2 justify-center items-center">
                                    Cart
                                    <GrCart size={20} />
                                </div>
                            </Link>
                        </button>
                    </li>

                    <li>
                        <button
                            className="p-4 hover:text-[#000000] transition-all duration-300 underLight"
                            onClick={() => scrollToSection('newsletter')}
                        >
                            <Link to="/profile">
                                <div className="flex justify-center items-center gap-2">
                                    Profile
                                    <RiContactsLine size={20} />
                                </div>
                            </Link>
                        </button>
                    </li>
                    <li>
                        <button
                            className="p-4 hover:text-[#000000] transition-all duration-300 underLight"
                            onClick={() => scrollToSection('newsletter')}
                        >
                            
                                <div className="flex justify-center items-center gap-2" onClick={handleLogout}>
                                    Logout
                                    <RiContactsLine size={20} />
                                </div>
                          
                        </button>
                    </li>
                </ul>
                <div>
                    <button className="block md:hidden px-4" onClick={handleHamburger}>
                        {navOpen ? <AiOutlineClose size={25} /> : <IoMenuOutline size={25} />}
                    </button>
                </div>
                <div
                    className={
                        !nav
                            ? 'fixed left-0 top-0 w-[60%] md:hidden h-full border-r border-r-red-600 bg-[#1e1b1b] ease-in-out duration-[0.5s] text-white'
                            : 'fixed left-[-60%]  top-0 h-full border-r border-r-red-600 bg-[#1e1b1b] ease-out duration-[0.8s]'
                    }
                >
                    <h1 className="text-xl font-bold text-[#b028b0] w-full p-4 hover:text-red-400 transition-all duration-300">
                        Locomart
                    </h1>
                    <ul className="uppercase p-4">
                        <li>
                            {' '}
                            <button
                                className="p-4 border-b-gray-600 border-b-[1px] hover:text-red-400 transition-all duration-300"
                                onClick={() => scrollToSection('hero')}
                            >
                                Home
                            </button>
                        </li>
                        <li>
                            <button
                                className="p-4 border-b-gray-600 border-b-[1px] hover:text-red-400 transition-all duration-300"
                                onClick={() => scrollToSection('company')}
                            >
                                Company
                            </button>
                        </li>
                        <li>
                            <button
                                className="p-4 border-b-gray-600 border-b-[1px] hover:text-red-400 transition-all duration-300"
                                onClick={() => scrollToSection('resources')}
                            >
                                Resources
                            </button>
                        </li>
                        <li>
                            {' '}
                            <button
                                className="p-4 border-b-gray-600 border-b-[1px] hover:text-red-400 transition-all duration-300"
                                onClick={() => scrollToSection('footer')}
                            >
                                About
                            </button>
                        </li>
                        <li>
                            <button
                                className="p-4 border-b-gray-600 border-b-[1px] hover:text-red-400 transition-all duration-300"
                                onClick={() => scrollToSection('newsletter')}
                            >
                                Contact
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
