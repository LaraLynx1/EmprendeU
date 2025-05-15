import React from 'react';
import './profile-box-C.css';

const ProfileBoxC = ({ avatar, name, id, status }) => {
	const isActive = status?.toLowerCase() === 'active';

	return (
		<div className='profile-yo'>
			<div className='profile-header'>
				<img src={avatar} alt='Avatar' className='avatar' />
				<div className='profile-info'>
					<h3 className='name'>
						{name}
						<span className={`status-badge ${isActive ? 'active' : 'inactive'}`}>
							<div className='status-dot'></div>
							{isActive ? 'Active' : 'Inactive'}
						</span>
					</h3>
					<p className='id'>{id}</p>
				</div>
			</div>
		</div>
	);
};

export default ProfileBoxC;
