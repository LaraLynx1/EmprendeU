import React, { useState } from 'react';
import { db, auth } from '../../services/firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import './CreateProductModal.css';

const CreateProductModal = ({ isOpen, onClose }) => {
	const [nombre, setNombre] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [precio, setPrecio] = useState('');
	const [favorito, setFavorito] = useState('false');
	const [stock, setStock] = useState('false');
	const [imageFile, setImageFile] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [imagePreview, setImagePreview] = useState(null);

	if (!isOpen) return null;

	const uploadImageToCloudinary = async (file, userId) => {
		if (!file || !userId) return '';

		try {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('upload_preset', 'productos_preset');

			const timestamp = Date.now();
			const fileName = `${userId}_product_${timestamp}`;
			formData.append('public_id', fileName);

			console.log('🚀 Uploading to Cloudinary...');
			console.log('Cloud Name: ducza0syr');
			console.log('Upload Preset: productos_preset');
			console.log('File name:', fileName);

			const response = await fetch('https://api.cloudinary.com/v1_1/ducza0syr/image/upload', {
				method: 'POST',
				body: formData,
			});

			console.log('📡 Response status:', response.status);

			const data = await response.json();
			console.log('📦 Cloudinary response:', data);

			if (!response.ok) {
				console.error('❌ Cloudinary error:', data);

				if (data.error?.message === 'Upload preset not found') {
					throw new Error('El preset de upload no existe. Por favor, créalo en tu dashboard de Cloudinary siguiendo las instrucciones.');
				}

				throw new Error(data.error?.message || `HTTP ${response.status}: ${response.statusText}`);
			}

			if (data.error) {
				throw new Error(data.error.message);
			}

			console.log('✅ Image uploaded successfully to:', data.secure_url);

			return {
				url: data.secure_url,
				publicId: data.public_id,
				cloudinaryData: data
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
		setStock('false');
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
			alert('Usuario no autenticado');
			return;
		}

		setUploading(true);

		try {
			let imageData = {
				url: '',
				publicId: '',
				cloudinaryData: null
			};

			if (imageFile) {
				console.log('🚀 Starting image upload for user:', userId);
				imageData = await uploadImageToCloudinary(imageFile, userId);
				console.log('✅ Image upload completed');
			}

			const newProduct = {
				id: Date.now().toString(),
				nombre: nombre.trim(),
				descripcion,
				precio: parseFloat(precio).toFixed(3),
				favorito: favorito === 'true',
				stock: stock === 'true',
				imagen: imageData.url,
				imagePublicId: imageData.publicId,
				createdAt: new Date(),
				userId: userId
			};

			const userRef = doc(db, 'users', userId);
			await updateDoc(userRef, {
				productos: arrayUnion(newProduct),
			});

			console.log('✅ Product created successfully:', newProduct);
			alert('¡Producto creado exitosamente!');
			resetForm();
			onClose();
		} catch (error) {
			console.error('❌ Error completo al crear producto:', error);

			if (error.message.includes('Upload preset not found')) {
				alert('Error: El preset de upload no existe en Cloudinary. Por favor, sigue las instrucciones para crearlo.');
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
					<label htmlFor="image-input">
						{imageFile ? `Imagen seleccionada: ${imageFile.name}` : 'Subir imagen'}
					</label>
					<input
						id="image-input"
						type="file"
						accept="image/*"
						onChange={handleImageChange}
						disabled={uploading}
					/>
					{imagePreview && (
						<div className="image-preview">
							<img
								src={imagePreview}
								alt="Preview"
								style={{
									width: '100px',
									height: '100px',
									objectFit: 'cover',
									borderRadius: '8px',
									marginTop: '10px'
								}}
							/>
						</div>
					)}
				</div>

				<div className='form-groupx'>
					<input
						type='text'
						placeholder='Nombre del producto'
						value={nombre}
						onChange={(e) => setNombre(e.target.value)}
						disabled={uploading}
						maxLength={100}
					/>
				</div>

				<div className='form-groupx'>
					<select
						value={descripcion}
						onChange={(e) => setDescripcion(e.target.value)}
						className='category-select'
						disabled={uploading}
					>
						<option value='' disabled>Selecciona una categoría</option>
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
						placeholder='Precio (COP)'
						value={precio}
						onChange={(e) => setPrecio(e.target.value)}
						disabled={uploading}
						min="0"
						step="0.001"
					/>
				</div>

				<div className='form-group2'>
					<label htmlFor='favorite'>¿Es favorito?</label>
					<select
						id='favorite'
						value={favorito}
						onChange={(e) => setFavorito(e.target.value)}
						disabled={uploading}
					>
						<option value='false'>No favorito</option>
						<option value='true'>Favorito</option>
					</select>
				</div>

				<div className='form-group2'>
					<label htmlFor='stock'>¿Está en stock?</label>
					<select
						id='stock'
						value={stock}
						onChange={(e) => setStock(e.target.value)}
						disabled={uploading}
					>
						<option value='true'>En Stock</option>
						<option value='false'>Sin Stock</option>
					</select>
				</div>

				<button
					className='create-btnx'
					onClick={handleCreate}
					disabled={uploading}
				>
					{uploading ? 'Subiendo...' : 'Crear!'}
				</button>

				<button
					className='close-btnx'
					onClick={handleClose}
					disabled={uploading}
				>
					✕
				</button>
			</div>
		</div>
	);
};

export default CreateProductModal;
