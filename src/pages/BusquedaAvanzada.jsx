import usePageMeta from '../hooks/usePageMeta.js';
import SeccionEnConstruccion from '../components/SeccionEnConstruccion.jsx';
import '../styles/busqueda.css';

export default function BusquedaAvanzada() {
	usePageMeta({
		title: 'Búsqueda avanzada - CICM',
		robots: 'noindex',
	});

	return (
		<>
			<section className="banner">
				<div className="container">
					<h1>Búsqueda avanzada</h1>
					<p className="subtitulo">Filtra variables por tema, proceso, nivel geográfico y periodicidad.</p>
				</div>
			</section>

			<SeccionEnConstruccion mensaje="Estamos trabajando en esta herramienta de búsqueda avanzada. Mientras tanto, puedes consultar las preguntas frecuentes o escribirnos directamente." />
		</>
	);
}
