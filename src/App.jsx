// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import SignUp from './paginas/signup/signup';
// import SignIn from './paginas/SignIn/SignIn';
// import WelcomeScreen from './paginas/welcome/welcome';
// import './App.css';

// function App() {
// 	return (
// 		<Router>
// 			<div className='app-container'>
// 				<Routes>
// 					<Route path='/' element={<Navigate to='/signin' />} />
// 					<Route path='/signin' element={<SignIn />} />
// 					<Route path='/signup' element={<SignUp />} />
// 					<Route path='/welcome' element={<WelcomeScreen />} />
// 				</Routes>
// 			</div>
// 		</Router>
// 	);
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './paginas/signup/signup';
import SignIn from './paginas/SignIn/SignIn';
import WelcomeScreen from './paginas/welcome/welcome';
import Juego from './paginas/juego/juego'; // Importa el componente Juego
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/juego" element={<Juego />} /> {/* Nueva ruta para el juego */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;