import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../services/firebase';
import './profile-box-C.css';

const ProfileBoxC = () => {
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				try {
					const docRef = doc(db, 'users', user.uid);

					await updateDoc(docRef, { status: 'active' });

					const docSnap = await getDoc(docRef);
					if (docSnap.exists()) {
						setUserData(docSnap.data());
					} else {
						console.error('No such document!');
					}
				} catch (error) {
					console.error('Error fetching/updating user data:', error);
				}
			}
		});
		return () => unsubscribe();
	}, []);

	const isActive = userData?.status?.toLowerCase() === 'active';

	return (
		<div className='profile-yo'>
			<div className='profile-header'>
				<img
					src={userData?.avatar || 'https://cdn-icons-png.flaticon.com/512/706/706830.png'}
					alt='Avatar'
					className='avatar'
				/>
				<div className='profile-info'>
					<h3 className='name'>
						{userData?.name || 'Cargando...'}
						<span className={`status-badge ${isActive ? 'active' : 'inactive'}`}>
							<div className='status-dot'></div>
							{isActive ? 'Active' : 'Inactive'}
						</span>
					</h3>
					<p className='id'>{userData?.code || ''}</p>
				</div>
			</div>
		</div>
	);
};

export default ProfileBoxC;
