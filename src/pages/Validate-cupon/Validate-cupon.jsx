import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import ProfileBoxB from '../../components/ProfileBoxB/ProfileBoxB';
import BlueLogo from '../../resources/logo icesi blue.png';
import avatar from '../../resources/avatar.png';
import { Box } from '@mui/material';

import './Validate-cupon.css';

const ValidateCupon = () => {
	const navigate = useNavigate();

	return (
		<>
			<Box className={`profile-container`}>
				<img src={BlueLogo} alt='Logo' className='logo-mobile' />

				<ProfileBoxB avatar={avatar} name='Ana Gomez' id='A0072214' logo={BlueLogo} />
				<Navbar />
			</Box>
		</>
	);
};

export default ValidateCupon;
