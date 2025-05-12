import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/signup/SignUp';
import SignIn from './pages/signin/SignIn';
import Welcome from './pages/welcome/welcome';
import Game from './pages/game/Game';
import Dashboard from './pages/dashboard/Dashboard';
import Categories from './pages/pag-categories/pag-categories';
import Favorites from './pages/favorites/Favorites';
import SellerProfile from './pages/perfil-comercial/perfil-comercial';
import PersonalProfile from './pages/perfil-personal/perfil-personal';
import Coupons from './pages/coupons/coupons';
import MyStore from './pages/myStore/myStore';
import './App.css';

function App() {
	return (
		<Router>
			<div className='app-container'>
				<Routes>
					<Route path='/' element={<SignIn />} />
					<Route path='/signup' element={<SignUp />} />
					<Route path='/welcome' element={<Welcome />} />
					<Route path='/game' element={<Game />} />
					<Route path='/signin' element={<SignIn />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/categories' element={<Categories />} />
					<Route path='/favorites' element={<Favorites />} />
					<Route path='/seller-profile' element={<SellerProfile />} />
					<Route path='/perfil-personal' element={<PersonalProfile />} />
					<Route path='/coupons' element={<Coupons />} />
					<Route path='/MyStore' element={<MyStore />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
