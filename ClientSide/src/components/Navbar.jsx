import { NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'remixicon/fonts/remixicon.css'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react';
import '../css/navbar.scss' // Importing the CSS file

const Navbar = () => {
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    let token = localStorage.getItem("token");

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    const handleMenuItemClick = () => {
        setShowMenu(false); // Hide the menu when a menu item is clicked
    };
    const handleLogOut = () => {
        localStorage.clear()
        navigate("/")
    }

    return (

        <nav className={`nav container-fluid d-flex w-100 mb-5  sticky-top`}>
            <h4 className='white-text flex-row'><NavLink to='/dashboard' className="nav__logo">DCX CMS</NavLink></h4>

            <div className={`nav__menu ${showMenu ? 'show-menu' : ''}`} style={{ zIndex: 1 }}>
                {showMenu && (

                    <i className="bi bi-x d-flex flex-row-reverse" onClick={handleMenuItemClick}></i>

                )}
                <ul className="nav__list my-auto" >
                    <li className="nav__item my-auto" style={{ fontSize: '14px' }}>
                        <NavLink to="/dashboard" onClick={handleMenuItemClick}>Dashboard</NavLink>
                    </li>
                    <li className="nav__item my-auto" style={{ fontSize: '14px' }}>
                        <NavLink to='/pages' onClick={handleMenuItemClick}>Pages</NavLink>
                    </li>
                    <li className="nav__item my-auto" style={{ fontSize: '14px' }}>
                        <NavLink to='/categories' onClick={handleMenuItemClick}>Categories</NavLink>
                    </li>
                    <li className="nav__item my-auto" style={{ fontSize: '14px' }}>
                        <NavLink to='/users' onClick={handleMenuItemClick}>Users</NavLink>
                    </li>
                    <li className="nav__item my-auto">

                    </li>

                </ul>
            </div>
            <NavLink to='/search'><i className="ri-search-line nav__search  my-auto" onClick={toggleSearch} style={{ fontSize: '18px' }}></i></NavLink>

            <div className="nav__actions d-flex align-items-center  my-auto">


                <NavLink to='/userprofile' className="ri-user-line nav__login  my-auto" style={{ fontSize: '18px' }} ></NavLink>
                <div className="nav__toggle" onClick={toggleMenu}>
                    <i className="ri-menu-line"></i>
                </div>

                <div>
                    {
                        token ? <button className='btn btn primary btn-sm  btn-outline-light' onClick={handleLogOut}>Logout</button> : <NavLink to="/"><button className='btn btn primary btn-sm  btn-outline-light'>Login</button></NavLink>
                    }

                </div>


            </div>

        </nav>
    );
};

export default Navbar;

