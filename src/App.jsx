import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Inicio from './pages/Inicio.jsx';
import BuscadorCiudadano from './pages/BuscadorCiudadano.jsx';
import BusquedaAvanzada from './pages/BusquedaAvanzada.jsx';
import PreguntasFrecuentes from './pages/PreguntasFrecuentes.jsx';
import Contacto from './pages/Contacto.jsx';

export default function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path="/" element={<Inicio />} />
				<Route path="/buscador-ciudadano" element={<BuscadorCiudadano />} />
				<Route path="/busqueda-avanzada" element={<BusquedaAvanzada />} />
				<Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
				<Route path="/contacto" element={<Contacto />} />
			</Route>
		</Routes>
	);
}
