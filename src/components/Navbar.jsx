import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import cart_icon from '../Assets/cart_icon.png';
import logo from '../Assets/gotrek.png';
import '../CSS/Navbar.css';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));

    useEffect(() => {
        // Update user state whenever component mounts or localStorage changes
        const updateUser = () => {
            const userData = localStorage.getItem('user');
            setUser(userData ? JSON.parse(userData) : null);
        };

        updateUser(); // Initial check

        // Add event listener for storage changes
        window.addEventListener('storage', updateUser);

        return () => {
            window.removeEventListener('storage', updateUser);
        };
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery.trim()}`);
        }
    };

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className='navbar px-4'>
            <div className="nav-logo">
                <img src={logo} alt="Logo" />
                <p>GO TREK</p>
            </div>
            <ul className="nav-menu">
                <li className={currentPath === '/' ? 'active' : ''}>
                    <Link to='/'>Shop</Link>
                    {currentPath === '/' && <hr />}
                </li>
                <li className={currentPath === '/blog' ? 'active' : ''}>
                    <Link to='/blog'>Blog</Link>
                    {currentPath === '/blog' && <hr />}
                </li>
                <li className={currentPath === '/trails' ? 'active' : ''}>
                    <Link to='/trails'>Trails</Link>
                    {currentPath === '/trails' && <hr />}
                </li>
                <li className={currentPath === '/destination' ? 'active' : ''}>
                    <Link to='/destination'>Destination</Link>
                    {currentPath === '/destination' && <hr />}
                </li>
                <li className={currentPath === '/contact' ? 'active' : ''}>
                    <Link to='/contact'>Contact</Link>
                    {currentPath === '/contact' && <hr />}
                </li>
                <li className={currentPath === '/admin' ? 'active' : ''}>
                    <Link to='/admin'>Admin Panel</Link>
                    {currentPath === '/admin' && <hr />}
                </li>
                <form className="search-form d-flex" role="search" onSubmit={handleSearchSubmit}>
                    <input 
                        className="form-control me-2" 
                        type="search" 
                        placeholder="Search" 
                        aria-label="Search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </ul>
            <div className="nav-login-cart">
                {user ? (
                    <>
                        <Link to='/cart'><img src={cart_icon} alt="Cart Icon" /></Link>
                        <div className="nav-profile" onClick={toggleDropdown}>
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fas fa-user"></i> 
                                    {user.firstName}
                                </button>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/profile"><i className="fas fa-user"></i> Profile</Link></li>
                                    <li><Link className="dropdown-item" to="/settings"><i className="fas fa-cog"></i> Settings</Link></li>
                                    <li><button onClick={handleLogout} className="dropdown-item"><i className="fas fa-sign-out-alt"></i> Logout</button></li>
                                </ul>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/register" className="btn btn-outline-danger me-2">R</Link>
                        <Link to="/login" className="btn btn-outline-success">Login</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
