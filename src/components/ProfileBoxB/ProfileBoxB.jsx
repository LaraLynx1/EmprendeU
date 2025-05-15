import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../services/firebase';
import './ProfileBoxB.css';

const ProfileBoxB = () => {
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const userId = auth.currentUser?.uid;
				if (!userId) {
					console.error('No user is authenticated');
					return;
				}

				const docRef = doc(db, 'users', userId);
				const docSnap = await getDoc(docRef);

				if (docSnap.exists()) {
					setUserData(docSnap.data());
				} else {
					console.error('No such document!');
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};

		fetchUserData();
	}, []);

	return (
		<div className='profile-yo'>
			<div className='profile-header'>
				<img src='https://cdn-icons-png.flaticon.com/512/706/706830.png' alt='Avatar' className='avatar' />
				<div className='profile-info'>
					<h3 className='name'>{userData ? userData.name : 'Loading...'}</h3>
					<p className='id'>{userData ? userData.code : ''}</p>
				</div>
			</div>
		</div>
	);
};

export default ProfileBoxB;
