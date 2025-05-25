import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/signup/signup';
import SignIn from './pages/SignIn/SignIn';
import Welcome from './pages/welcome/welcome';
import Game from './pages/game/game';
import Dashboard from './pages/dashboard/dashboard';
import Categories from './pages/pag-categories/pag-categories';
import Favorites from './pages/favorites/favorites';
import SellerProfile from './pages/perfil-comercial/perfil-comercial';
import PersonalProfile from './pages/perfil-personal/perfil-personal';
import Coupons from './pages/coupons/coupons';
import MyStore from './pages/myStore/myStore';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
	return (
		<Router>
			<div className='app-container'>
				<Routes>
					<Route path='/' element={<SignIn />} />
					<Route path='/signup' element={<SignUp />} />
					<Route
						path='/welcome'
						element={
							<ProtectedRoute>
								<Welcome />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/game'
						element={
							<ProtectedRoute>
								<Game />
							</ProtectedRoute>
						}
					/>
					<Route path='/signin' element={<SignIn />} />
					<Route
						path='/dashboard'
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/categories'
						element={
							<ProtectedRoute>
								<Categories />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/favorites'
						element={
							<ProtectedRoute>
								<Favorites />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/seller-profile'
						element={
							<ProtectedRoute>
								<SellerProfile />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/perfil-personal'
						element={
							<ProtectedRoute>
								<PersonalProfile />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/coupons'
						element={
							<ProtectedRoute>
								<Coupons />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/MyStore'
						element={
							<ProtectedRoute>
								<MyStore />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
