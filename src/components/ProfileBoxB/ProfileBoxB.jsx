import React from 'react';
import './ProfileBoxB.css';

const ProfileBoxB = ({ avatar, name, id, logo }) => {
	return (
		<div className='profile-yo'>
			<div className='profile-header'>
				<img src={avatar} alt='Avatar' className='avatar' />
				<div className='profile-info'>
					<h3 className='name'>{name}</h3>
					<p className='id'>{id}</p>
				</div>
			</div>
		</div>
	);
};

export default ProfileBoxB;
