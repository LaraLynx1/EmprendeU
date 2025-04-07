import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './paginas/signup/signup';
import SignIn from './paginas/SignIn/SignIn';
import WelcomeScreen from './paginas/welcome/welcome';
import Juego from './paginas/juego/juego';
import './App.css';
import PerfilComercial from './paginas/perfil-comercial/perfil-comercial';
import PerfilPersonal from './paginas/perfil-personal/perfil-personal';
import Cupones from './paginas/cupones/cupones';

function App() {
	return (
		<Router>
			<div className='app-container'>
				<Routes>
					<Route path='/' element={<SignIn />} />
					<Route path='/signup' element={<SignUp />} />
					<Route path='/welcome' element={<WelcomeScreen />} />
					<Route path='/juego' element={<Juego />} /> {/* Nueva ruta para el juego */}
				</Routes>
			</div>
		</Router>
	);
	return (
		<div>
			<PerfilPersonal />
			<PerfilComercial />
			<Cupones />
		</div>
	);
}

export default App;
