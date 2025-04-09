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
}

export default App;
