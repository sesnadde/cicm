import usePageMeta from '../hooks/usePageMeta.js';
import ContactForm from '../components/ContactForm.jsx';
import '../styles/contacto.css';

export default function Contacto() {
	usePageMeta({
		title: 'Contáctanos - CICM',
		description: 'Escríbenos tu duda, comentario o sugerencia sobre el Catálogo de Información sobre la Corrupción en México.',
	});

	return (
		<>
			<section className="banner">
				<div className="container">
					<h1>Contáctanos</h1>
					<p className="subtitulo">¿Tienes alguna duda? Comparte tu experiencia con el CICM.</p>
				</div>
			</section>

			<section id="seccion-contacto">
				<div className="container contenedor-formulario">
					<article id="info-invitacion">
						<p>Sólo tienes que llenar el siguiente formulario con tu pregunta, comentario o sugerencia. Con gusto la leeremos y te responderemos a la brevedad.</p>
					</article>

					<ContactForm />
				</div>
			</section>
		</>
	);
}
