import React from 'react';
import homeIcon from '../../recursos/home.png';
import starIcon from '../../recursos/star.png';
import userIcon from '../../recursos/user.png';
import './navbar.css';

const Navbar = () => {
	return (
		<div className='navbar'>
			<button className='nav-btn'>
				<img src={homeIcon} />
			</button>
			<button className='nav-btn'>
				<img src={starIcon} />
			</button>
			<button className='nav-btn'>
				<img src={userIcon} />
			</button>
		</div>
	);
};

export default Navbar;
