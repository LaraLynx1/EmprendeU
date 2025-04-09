<<<<<<< HEAD
// import { useState } from 'react';
// import SignUp from './paginas/signup/signup';
// import SignIn from './paginas/SignIn/SignIn';
// import './App.css';

// function App() {
//   const [currentView, setCurrentView] = useState('signin'); // 'signin' o 'signup'

//   const switchToSignUp = () => {
//     setCurrentView('signup');
//   };

//   const switchToSignIn = () => {
//     setCurrentView('signin');
//   };

//   return (
//     <div className='app-container'>
//       {currentView === 'signin' ? (
//         <SignIn onSwitchToSignUp={switchToSignUp} />
//       ) : (
//         <SignUp onSwitchToSignIn={switchToSignIn} />
//       )}
//     </div>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './paginas/signup/signup';
import SignIn from './paginas/SignIn/SignIn';
import WelcomeScreen from './paginas/welcome/welcome';
import './App.css';

function App() {
  return (
    <Router>
      <div className='app-container'>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/welcome" element={<WelcomeScreen />} />
        </Routes>
      </div>
    </Router>
  );
=======
import { useState } from 'react';
import PerfilComercial from './paginas/perfil-comercial/perfil-comercial';
import PerfilPersonal from './paginas/perfil-personal/perfil-personal';
import Cupones from './paginas/cupones/cupones';

function App() {
	return (
		<div>
			<PerfilPersonal />
			<Cupones />
		</div>
	);
>>>>>>> origin/lau
}

export default App;