import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './paginas/signup/signup';
import SignIn from './paginas/SignIn/SignIn';
import WelcomeScreen from './paginas/welcome/welcome';
import Juego from './paginas/juego/juego';
import Dashboard from './paginas/dashboard/dashboard';
import PagCategorias from './paginas/pag-categoria/pag-categoria';
import Favoritos from './paginas/favoritos/favoritos';
import PerfilComercial from './paginas/perfil-comercial/perfil-comercial';
import PerfilPersonal from './paginas/perfil-personal/perfil-personal';
import Cupones from './paginas/cupones/cupones';
import './App.css';

function App() {
	return (
		<Router>
			<div className='app-container'>
				<Routes>
					<Route path='/' element={<SignIn />} />
					<Route path='/signup' element={<SignUp />} />
					<Route path='/welcome' element={<WelcomeScreen />} />
					<Route path='/juego' element={<Juego />} />
					<Route path='/signIn' element={<SignIn />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/categorias' element={<PagCategorias />} />
					<Route path='/favoritos' element={<Favoritos />} />
					<Route path='/perfil-comercial' element={<PerfilComercial />} />
					<Route path='/perfil-personal' element={<PerfilPersonal />} />
					<Route path='/cupones' element={<Cupones />} />
				</Routes>
			</div>
		</Router>
	);
}
export default App;
