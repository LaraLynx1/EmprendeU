import { useState } from 'react';
import SignUp from './paginas/signup/signup';
import SignIn from './paginas/SignIn/SignIn';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('signin'); // 'signin' o 'signup'

  const switchToSignUp = () => {
    setCurrentView('signup');
  };

  const switchToSignIn = () => {
    setCurrentView('signin');
  };

  return (
    <div className='app-container'>
      {currentView === 'signin' ? (
        <SignIn onSwitchToSignUp={switchToSignUp} />
      ) : (
        <SignUp onSwitchToSignIn={switchToSignIn} />
      )}
    </div>
  );
}

export default App;