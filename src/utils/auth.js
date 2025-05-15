import { auth } from '../services/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';

export const isAuthenticated = () => {
	return localStorage.getItem('authenticated') === 'true';
};

export const loginWithCode = async (code, password) => {
	try {
		const usersRef = collection(db, 'users');
		const q = query(usersRef, where('code', '==', code));
		const querySnapshot = await getDocs(q);

		if (querySnapshot.empty) {
			throw new Error('User not found with the provided code');
		}

		const userDoc = querySnapshot.docs[0];
		const userData = userDoc.data();
		const email = userData.email;

		if (!email) {
			throw new Error('Email not found for the provided code');
		}

		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		localStorage.setItem('authenticated', 'true');
		return userCredential.user;
	} catch (error) {
		console.error('Error logging in with code:', error.message);
		throw error;
	}
};

export const logout = async () => {
	try {
		await signOut(auth);
		localStorage.removeItem('authenticated');
		console.log('User logged out successfully');
	} catch (error) {
		console.error('Error logging out:', error);
		throw error; 
	}
};
