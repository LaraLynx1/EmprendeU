import React, { useEffect, useState } from 'react';
import { Paper, Box, Typography, IconButton } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import StarIcon from '@mui/icons-material/Star';
import starIcon from '../../resources/star.png';
import whatsapplogo from '../../resources/whatsapp logo.png';
import './profile-box.css';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const ProfileBox = ({ name, id, status, avatar, variant = 'default' }) => {
	const [phoneNumber, setPhoneNumber] = useState(null);

	useEffect(() => {
		const fetchPhone = async () => {
			if (!id) return;
			const docRef = doc(db, 'users', id);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				// Cambia 'telefono' por el nombre real del campo en tu base de datos si es diferente
				setPhoneNumber(docSnap.data().telefono || docSnap.data().phoneNumber || '');
			}
		};
		fetchPhone();
	}, [id]);

	const getWhatsAppApiUrl = (phone) => {
		if (!phone) return null;
		const cleanPhone = phone.replace(/\D/g, '');
		const phoneWithCode = cleanPhone.startsWith('57') ? cleanPhone : `57${cleanPhone}`;
		const message = encodeURIComponent('Hola, quiero más información sobre tu perfil');
		return `https://wa.me/${phoneWithCode}?text=${message}`;
	};

	const whatsappApiUrl = getWhatsAppApiUrl(phoneNumber);

	if (variant === 'large') {
		return (
			<Paper
				elevation={6}
				sx={{
					position: 'relative',
					width: 450,
					height: 600,
					borderRadius: 4,
					overflow: 'hidden',
					cursor: 'pointer',
					boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-end',
					backgroundImage: avatar && avatar.trim() !== '' ? `url(${avatar})` : 'none',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					color: 'white',
					padding: 3,
				}}
			>
				<Box
					sx={{
						position: 'absolute',
						inset: 0,
						background: 'linear-gradient(to top, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0) 100%)',
						zIndex: 1,
					}}
				/>
				<Box sx={{ position: 'relative', zIndex: 2, width: '100%' }}>
					<Typography variant='h4' fontWeight='bold' sx={{ mb: 1 }}>
						{name}
					</Typography>
					<Typography variant='subtitle1' sx={{ mb: 1 }}>
						ID: {id}
					</Typography>
					<Typography variant='body2' sx={{ color: '#00e676', mb: 2 }}>
						<span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
							<span className='status-dot' /> {status}
						</span>
					</Typography>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						{whatsappApiUrl && (
							<IconButton
								component='a'
								href={whatsappApiUrl}
								target='_blank'
								rel='noopener noreferrer'
								sx={{
									backgroundColor: '#25D366',
									color: 'white',
									padding: 1,
									borderRadius: '50%',
									'&:hover': {
										backgroundColor: '#1ebe5d',
									},
								}}
							>
								<ChatBubbleIcon sx={{ fontSize: 24 }} />
							</IconButton>
						)}
						<StarIcon sx={{ color: 'white', fontSize: 30 }} />
					</Box>
				</Box>
			</Paper>
		);
	}

	return (
		<div className='profile-box'>
			{avatar && avatar.trim() !== '' ? <img src={avatar} className='avatar' alt='profile' /> : null}
			<div className='info'>
				<p className='status'>
					<span className='status-dot' /> {status}
				</p>
				<h2 className='name'>{name}</h2>
				<p className='id'>{id}</p>
			</div>
			<div className='final'>
				<img src={starIcon} className='star' alt='favorite' />
				{whatsappApiUrl ? (
					<a href={whatsappApiUrl} target='_blank' rel='noopener noreferrer' className='chat-btn'>
						<img src={whatsapplogo} alt='chat' />
					</a>
				) : (
					<button className='chat-btn' disabled>
						<img src={whatsapplogo} alt='chat' />
					</button>
				)}
			</div>
		</div>
	);
};

export default ProfileBox;
