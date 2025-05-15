import React from 'react';
import { useNavigate } from 'react-router-dom';
import homeIcon from '../../resources/home.png';
import starIcon from '../../resources/star.png';
import userIcon from '../../resources/user.png';
import './navbar.css';

const Navbar = () => {
	const navigate = useNavigate();

	return (
		<div className='navbar'>
			<button className='nav-btn' onClick={() => navigate('/dashboard')}>
				<img src={homeIcon} alt='Home' />
			</button>

			<button className='nav-btn' onClick={() => navigate('/favorites')}>
				<img src={starIcon} alt='Star' />
			</button>

			<button className='nav-btn' onClick={() => navigate('/perfil-personal')}>
				<img src={userIcon} alt='User' />
			</button>
		</div>
	);
};

export default Navbar;
