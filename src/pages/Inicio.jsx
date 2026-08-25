import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta.js';
import EjesPna from '../components/EjesPna.jsx';
import HistoriaCicm from '../components/HistoriaCicm.jsx';
import '../styles/inicio.css';
import '../styles/acerca-de.css';

export default function Inicio() {
	usePageMeta({
		title: 'CICM - Catálogo de Información sobre la Corrupción en México',
		description: 'Repositorio de variables especializado en compartir información sobre el fenómeno de la corrupción en México.',
	});

	return (
		<>
			{/* Banner principal */}
			<section className="banner">
				<div className="container">
					<h1>Catálogo de Información sobre la Corrupción en México <em>(CICM)</em></h1>
					<p className="subtitulo">Repositorio de variables especializado en compartir información sobre el fenómeno de la corrupción en México.</p>
					<a href="#acerca-de-cicm" className="boton">Acerca del CICM</a>
				</div>
			</section>

			{/* Sección: acceso directo al buscador */}
			<section id="como-usar-portal" className="seccion-alterna">
				<div className="container">
					<div className="cta-buscador">
						<div className="cta-buscador-icono" aria-hidden="true">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<circle cx="11" cy="11" r="7"></circle>
								<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
							</svg>
						</div>
						<div className="cta-buscador-texto">
							<h3>Busca en el catálogo de variables</h3>
							<p>Filtra por tema, proceso, nivel geográfico y periodicidad en un solo buscador, simple y accesible para toda la ciudadanía.</p>
						</div>
						<Link to="/buscador-ciudadano" className="boton cta-buscador-boton">Ir al buscador</Link>
					</div>
				</div>
			</section>

			{/* Acerca del CICM: tríptico Objetivo / Misión / Visión */}
			<section id="acerca-de-cicm">
				<div className="container">
					<p className="eyebrow"></p>
					<h2>Acerca del CICM</h2>

					<div className="triptico">
						<div className="triptico-panel">
							<h3>Objetivo</h3>
							<p>Facilitar a la población y actores interesados el acceso a datos y variables sobre el fenómeno de la corrupción en México, así como a sus fuentes de información de forma ágil, ciudadana y transparente a través de la estandarización de los datos que se generan sobre la corrupción, la anticorrupción, integridad, fiscalización y control de los recursos públicos en México.</p>
						</div>
						<div className="triptico-panel">
							<h3>Misión</h3>
							<p>Contribuir a la socialización y reutilización de información generada en el país relacionada con el fenómeno de la corrupción y las medidas anticorrupción, a partir de una herramienta tecnológica amigable y accesible.</p>
						</div>
						<div className="triptico-panel">
							<h3>Visión</h3>
							<p>Ser la mejor plataforma de transparencia proactiva y consulta dinámica del fenómeno de la corrupción y de las acciones anticorrupción en México, que sirva de referencia para la sociedad civil, academia y gobiernos en la toma de decisiones, diagnósticos y consulta sobre los avances del Estado mexicano en temas de anticorrupción e integridad.</p>
						</div>
					</div>
				</div>
			</section>

			<HistoriaCicm />

			{/* Ejes del Plan Nacional Anticorrupción */}
			<section id="ejes-pna">
				<div className="container">
					<h2>Ejes del Plan Nacional Anticorrupción</h2>
					<p>
						Los procesos de coordinación de acciones de todos los entes públicos que integran el Estado mexicano y el involucramiento de los distintos sectores de la sociedad, se articulan en torno a cuatro ejes estratégicos que, en conjunto, integran las distintas dimensiones de la corrupción como un fenómeno sistémico.
					</p>

					<EjesPna />
				</div>
			</section>
		</>
	);
}
