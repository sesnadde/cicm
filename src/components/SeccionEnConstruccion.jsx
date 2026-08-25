import { Link } from 'react-router-dom';

export default function SeccionEnConstruccion({ mensaje }) {
	return (
		<section id="en-construccion">
			<div className="container">
				<div className="tarjeta tarjeta-proximamente">
					<h2>Próximamente</h2>
					<p>{mensaje}</p>
					<Link to="/contacto" className="boton">Contáctanos</Link>
				</div>
			</div>
		</section>
	);
}
