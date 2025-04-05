// Array para almacenar los usuarios registrados
let users = [];

// Función para registrar un nuevo usuario
export const registerUser = (name, codigo, password, userType) => {
  // Verificar si el código ya existe
  const userExists = users.some(user => user.codigo === codigo);

  if (userExists) {
    return { success: false, message: 'Este código ya está registrado' };
  }

  // Crear nuevo usuario
  const newUser = {
    name,
    codigo,
    password,
    userType,
    createdAt: new Date()
  };

  // Añadir al array
  users.push(newUser);

  console.log('Usuario registrado:', newUser);
  console.log('Total usuarios:', users.length);

  return { success: true, message: 'Usuario registrado correctamente' };
};

// Función para verificar credenciales
export const verifyUser = (codigo, password) => {
  // Buscar usuario por código
  const user = users.find(user => user.codigo === codigo);

  // Si no existe el usuario o la contraseña no coincide
  if (!user) {
    return { success: false, message: 'Código no encontrado' };
  }

  if (user.password !== password) {
    return { success: false, message: 'Contraseña incorrecta' };
  }

  // Si todo es correcto
  return {
    success: true,
    message: 'Inicio de sesión exitoso',
    user: {
      name: user.name,
      codigo: user.codigo,
      userType: user.userType
    }
  };
};

// Función para obtener todos los usuarios (para depuración)
export const getAllUsers = () => {
  return [...users];
};
