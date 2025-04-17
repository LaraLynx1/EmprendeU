import React from 'react';
import starIcon from '../../resources/star.png';
import whatsapplogo from '../../resources/whatsapp logo.png';
import './profile-box.css';

const ProfileBox = ({ name, id, status, avatar }) => {
	return (
		<div className='profile-box'>
			<img src={avatar} className='avatar' alt='profile' />
			<div className='info'>
				<p className='status'>{status}</p>
				<h2 className='name'>{name}</h2>
				<p className='id'>{id}</p>
			</div>
			<div className='final'>
				<img src={starIcon} className='star' alt='favorite' />
				<button className='chat-btn'>
					<img src={whatsapplogo} alt='chat' />
				</button>
			</div>
		</div>
	);
};

export default ProfileBox;
