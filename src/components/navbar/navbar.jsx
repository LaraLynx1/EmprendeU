import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import homeIcon from '../../resources/home.png';
import starIcon from '../../resources/star.png';
import userIcon from '../../resources/user.png';
import './navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getButtonContent = (path, icon, altText, displayText) => {
        return location.pathname === path 
            ? <span className="page-name">{displayText}</span>
            : <img src={icon} alt={altText} />;
    };

    return (
        <div className='navbar'>
            <button 
                className={`nav-btn ${location.pathname === '/dashboard' ? 'active' : ''}`} 
                onClick={() => navigate('/dashboard')}
            >
                {getButtonContent('/dashboard', homeIcon, 'Home', 'Inicio')}
            </button>

            <button 
                className={`nav-btn ${location.pathname === '/favorites' ? 'active' : ''}`} 
                onClick={() => navigate('/favorites')}
            >
                {getButtonContent('/favorites', starIcon, 'Star', 'Favoritos')}
            </button>

            <button 
                className={`nav-btn ${location.pathname === '/perfil-personal' ? 'active' : ''}`} 
                onClick={() => navigate('/perfil-personal')}
            >
                {getButtonContent('/perfil-personal', userIcon, 'User', 'Perfil')}
            </button>
        </div>
    );
};

export default Navbar;