import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className='text-2xl'>
            <Link className='ml-2' to="/">Home</Link>
            <Link className='ml-2' to="/login">Login</Link>
            <Link className='ml-2' to="/register">Register</Link>
        </nav>
    );
};

export default Header;