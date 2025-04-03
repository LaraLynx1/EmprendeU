import { useState } from 'react';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/signup/signup';
import './App.css';

function App() {
	const [currentView, setCurrentView] = useState('signin'); // 'signin' o 'signup'

	return (
		<div className='auth-container'>
			<h1>EmprendeU</h1>

			{/* Botones para cambiar entre vistas */}
			<div className='view-toggle'>
				<button onClick={() => setCurrentView('signin')} className={currentView === 'signin' ? 'active' : ''}>
					Iniciar Sesión
				</button>
				<button onClick={() => setCurrentView('signup')} className={currentView === 'signup' ? 'active' : ''}>
					Registrarse
				</button>
			</div>

			{currentView === 'signin' ? <SignIn /> : <SignUp />}
		</div>
	);
}

export default App;
