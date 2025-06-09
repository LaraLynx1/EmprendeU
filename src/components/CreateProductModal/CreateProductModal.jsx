import React, { useState } from 'react';
import { db, auth } from '../../services/firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import './CreateProductModal.css';

const CreateProductModal = ({ isOpen, onClose }) => {
	const [nombre, setNombre] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [precio, setPrecio] = useState('');
	const [favorito, setFavorito] = useState('false');
	const [stock, setStock] = useState('true');
	const [imageFile, setImageFile] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [imagePreview, setImagePreview] = useState(null);

	const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'ducza0syr';
	const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'productos_preset';

	if (!isOpen) return null;

	const uploadImageToCloudinary = async (file, userId) => {
		if (!file || !userId) return '';

		try {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('upload_preset', UPLOAD_PRESET);

			const timestamp = Date.now();
			const fileName = `${userId}_product_${timestamp}`;
			formData.append('public_id', `productos/${fileName}`);

			const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

			const response = await fetch(CLOUDINARY_URL, {
				method: 'POST',
				body: formData,
			});

			const data = await response.json();

			if (!response.ok) {
				console.error('❌ Cloudinary error:', data);

				if (data.error?.message === 'Upload preset not found') {
					throw new Error(
						'El preset de upload no existe. Debes crear "productos_preset" en tu dashboard de Cloudinary como "Unsigned".'
					);
				}

				throw new Error(data.error?.message || `HTTP ${response.status}: ${response.statusText}`);
			}

			if (data.error) {
				throw new Error(data.error.message);
			}

			return {
				url: data.secure_url,
				publicId: data.public_id,
				cloudinaryData: data,
			};
		} catch (error) {
			console.error('❌ Upload error:', error);
			throw error;
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
			if (!validTypes.includes(file.type)) {
				alert('Por favor selecciona un archivo de imagen válido (JPEG, PNG, GIF, WebP)');
				return;
			}

			if (file.size > 10 * 1024 * 1024) {
				alert('El archivo es demasiado grande. Máximo 10MB permitido.');
				return;
			}

			setImageFile(file);

			const reader = new FileReader();
			reader.onload = (e) => {
				setImagePreview(e.target.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const resetForm = () => {
		setNombre('');
		setDescripcion('');
		setPrecio('');
		setFavorito('false');
		setStock('true');
		setImageFile(null);
		setImagePreview(null);
	};

	const validateForm = () => {
		if (!nombre.trim()) {
			alert('El nombre del producto es requerido');
			return false;
		}
		if (!descripcion) {
			alert('La categoría es requerida');
			return false;
		}
		if (!precio.trim()) {
			alert('El precio es requerido');
			return false;
		}
		if (isNaN(precio) || parseFloat(precio) <= 0) {
			alert('El precio debe ser un número válido mayor a 0');
			return false;
		}
		return true;
	};

	const handleCreate = async () => {
		if (!validateForm()) return;

		const userId = auth.currentUser?.uid;
		if (!userId) {
			alert('Usuario no autenticado. Por favor, inicia sesión.');
			return;
		}

		if (!CLOUDINARY_CLOUD_NAME || !UPLOAD_PRESET) {
			alert('Error de configuración: Variables de Cloudinary no encontradas');
			console.error('Missing Cloudinary config:', {
				cloudName: CLOUDINARY_CLOUD_NAME ? 'OK' : 'MISSING',
				uploadPreset: UPLOAD_PRESET ? 'OK' : 'MISSING',
			});
			return;
		}

		setUploading(true);

		try {
			let imageData = {
				url: '',
				publicId: '',
				cloudinaryData: null,
			};

			if (imageFile) {
				console.log('🚀 Starting image upload for user:', userId);
				imageData = await uploadImageToCloudinary(imageFile, userId);
				console.log('✅ Image upload completed successfully');
			}

			const newProduct = {
				id: Date.now().toString(),
				nombre: nombre.trim(),
				descripcion,
				precio: parseInt(precio, 10),
				favorito: favorito === 'true',
				stock: stock === 'true',
				imagen: imageData.url,
				imagePublicId: imageData.publicId,
				createdAt: new Date(),
				userId: userId,
				juegoDescuento: {
					activo: false,
					porcentaje: 0,
				},
			};

			const userRef = doc(db, 'users', userId);
			await updateDoc(userRef, {
				productos: arrayUnion(newProduct),
			});

			resetForm();
			onClose();
		} catch (error) {
			console.error('❌ Error completo al crear producto:', error);

			if (error.message.includes('Upload preset not found')) {
				alert(
					'Error: El preset de upload no existe en Cloudinary. Por favor, crea "productos_preset" como "Unsigned" en tu dashboard.'
				);
			} else if (error.message.includes('Missing or insufficient permissions')) {
				alert('Error: No tienes permisos para crear productos. Verifica tu autenticación.');
			} else {
				alert(`Error al crear producto: ${error.message}`);
			}
		} finally {
			setUploading(false);
		}
	};

	const handleClose = () => {
		if (!uploading) {
			resetForm();
			onClose();
		}
	};

	return (
		<div className='modal-overlayx'>
			<div className='modal-contentx'>
				<h2>Crea tu nuevo producto</h2>

				<div className='image-uploadx'>
					<label htmlFor='image-input'>
						{imageFile ? `Imagen seleccionada: ${imageFile.name}` : 'Subir imagen (opcional)'}
					</label>
					<input id='image-input' type='file' accept='image/*' onChange={handleImageChange} disabled={uploading} />
					{imagePreview && (
						<div className='image-preview'>
							<img
								src={imagePreview}
								alt='Preview del producto'
								style={{
									width: '100px',
									height: '100px',
									objectFit: 'cover',
									borderRadius: '8px',
									marginTop: '10px',
									border: '2px solid #ddd',
								}}
							/>
						</div>
					)}
				</div>

				<div className='form-groupx'>
					<input
						type='text'
						placeholder='Nombre del producto *'
						value={nombre}
						onChange={(e) => setNombre(e.target.value)}
						disabled={uploading}
						maxLength={100}
						required
					/>
				</div>

				<div className='form-groupx'>
					<select
						value={descripcion}
						onChange={(e) => setDescripcion(e.target.value)}
						className='category-select'
						disabled={uploading}
						required
					>
						<option value='' disabled>
							Selecciona una categoría *
						</option>
						<option value='Snacks y Golosinas'>Snacks y Golosinas</option>
						<option value='Accesorios y Bisutería'>Accesorios y Bisutería</option>
						<option value='Galletas'>Galletas</option>
						<option value='Bebidas'>Bebidas</option>
						<option value='Postres'>Postres</option>
						<option value='Cuidado Personal y Belleza'>Cuidado Personal y Belleza</option>
						<option value='Morrales, Bolsos y Estuches'>Morrales, Bolsos y Estuches</option>
						<option value='Plataformas Streaming'>Plataformas Streaming</option>
						<option value='Accesorios para Celular'>Accesorios para Celular</option>
						<option value='Arte y Manualidades'>Arte y Manualidades</option>
						<option value='Libros y Apuntes'>Libros y Apuntes</option>
						<option value='Perfumes y Fragancias'>Perfumes y Fragancias</option>
					</select>
				</div>

				<div className='form-groupx'>
					<input
						type='number'
						placeholder='Precio en COP *'
						value={precio}
						onChange={(e) => setPrecio(e.target.value)}
						disabled={uploading}
						min='0'
						step='0.001'
						required
					/>
				</div>
				{precio && (
					<small>Valor en COP: {Number(precio).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</small>
				)}

				<div className='form-group2'>
					<label htmlFor='favorite'>¿Es producto favorito?</label>
					<select id='favorite' value={favorito} onChange={(e) => setFavorito(e.target.value)} disabled={uploading}>
						<option value='false'>No favorito</option>
						<option value='true'>Producto favorito</option>
					</select>
				</div>

				<div className='form-group2'>
					<label htmlFor='stock'>¿Está disponible en stock?</label>
					<select id='stock' value={stock} onChange={(e) => setStock(e.target.value)} disabled={uploading}>
						<option value='true'>Disponible en stock</option>
						<option value='false'>Sin stock</option>
					</select>
				</div>

				<div className='modal-buttons'>
					<button className='create-btnx' onClick={handleCreate} disabled={uploading}>
						{uploading ? 'Creando producto...' : 'Crear Producto'}
					</button>

					<button className='close-btnx' onClick={handleClose} disabled={uploading} title='Cerrar modal'>
						✕
					</button>
				</div>

				{uploading && (
					<div className='loading-indicator'>
						<p>⏳ {imageFile ? 'Subiendo imagen y creando producto...' : 'Creando producto...'}</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default CreateProductModal;
