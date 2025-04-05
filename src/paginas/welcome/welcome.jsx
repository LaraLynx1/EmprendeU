// // import logo from './assets/icesi-logo-white.png'; // Asegúrate de tener el logo en esta ruta
// import '../welcome/welcome.css';

// function WelcomeScreen() {
// 	return (
// 		<div className='welcome-container'>
// 			<div className='background-overlay'>
// 				<img src={logo} alt='Logo ICESI' className='icesi-logo' />
// 				<div className='welcome-text'>
// 					<h1>WELCOME</h1>
// 					<p>
// 						to your market place for
// 						<br />
// 						students of ICESI
// 					</p>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default WelcomeScreen;
import './welcome.css';

function WelcomeScreen() {
	// Importa el logo correctamente. Asegúrate de que la ruta sea la correcta
	// Si no tienes acceso al logo, puedes comentar esta línea temporalmente
	// import logo from '../path/to/your/icesi-logo-white.png';

	return (
		<div className='welcome-container'>
			<div className='background-overlay'>
				{/* Si no tienes el logo disponible, puedes comentar esta línea */}
				{/* <img src={logo} alt='Logo ICESI' className='icesi-logo' /> */}
				<div className='welcome-text'>
					<h1>WELCOME</h1>
					<p>
						to your market place for
						<br />
						students of ICESI
					</p>
				</div>
			</div>
		</div>
	);
}

export default WelcomeScreen;
