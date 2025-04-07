import './welcome.css';

function WelcomeScreen() {
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
