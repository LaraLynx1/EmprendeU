import { useState } from 'react';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
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
    <div className="auth-container">
  
      {currentView === 'signin'
        ? <SignIn onSwitchToSignUp={switchToSignUp} />
        : <SignUp onSwitchToSignIn={switchToSignIn} />
      }
    </div>
  );
}

export default App;
