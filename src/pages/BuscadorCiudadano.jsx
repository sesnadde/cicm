import usePageMeta from '../hooks/usePageMeta.js';
import SeccionEnConstruccion from '../components/SeccionEnConstruccion.jsx';
import '../styles/busqueda.css';

export default function BuscadorCiudadano() {
	usePageMeta({
		title: 'Buscador ciudadano - CICM',
		robots: 'noindex',
	});

	return (
		<>
			<section className="banner">
				<div className="container">
					<h1>Buscador ciudadano</h1>
					<p className="subtitulo">Una herramienta de consulta pensada para la ciudadanía, simple y accesible.</p>
				</div>
			</section>

			<SeccionEnConstruccion mensaje="Estamos trabajando en el buscador ciudadano. Mientras tanto, puedes consultar las preguntas frecuentes o escribirnos directamente." />
		</>
	);
}
