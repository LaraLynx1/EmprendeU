let users = [];

export const registerUser = (name, codigo, password, userType) => {
	const userExists = users.some((user) => user.codigo === codigo);

	if (userExists) {
		return { success: false, message: 'Este código ya está registrado' };
	}

	const newUser = {
		name,
		codigo,
		password,
		userType,
		createdAt: new Date(),
	};

	users.push(newUser);

	console.log('Usuario registrado:', newUser);
	console.log('Total usuarios:', users.length);

	return { success: true, message: 'Usuario registrado correctamente' };
};

export const verifyUser = (codigo, password) => {
	const user = users.find((user) => user.codigo === codigo);

	if (!user) {
		return { success: false, message: 'Código no encontrado' };
	}

	if (user.password !== password) {
		return { success: false, message: 'Contraseña incorrecta' };
	}

	return {
		success: true,
		message: 'Inicio de sesión exitoso',
		user: {
			name: user.name,
			codigo: user.codigo,
			userType: user.userType,
		},
	};
};

export const getAllUsers = () => {
	return [...users];
};
