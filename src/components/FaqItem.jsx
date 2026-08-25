import { useState } from 'react';

export default function FaqItem({ id, pregunta, children }) {
	const [abierta, setAbierta] = useState(false);
	const idPregunta = `pregunta-${id}`;
	const idRespuesta = `resp-${id}`;

	return (
		<div className="faq-item">
			<h2 className="faq-pregunta-titulo">
				<button
					type="button"
					className="faq-pregunta"
					aria-expanded={abierta}
					aria-controls={idRespuesta}
					id={idPregunta}
					onClick={() => setAbierta((valor) => !valor)}
				>
					{pregunta}
				</button>
			</h2>
			<div id={idRespuesta} className="faq-respuesta" role="region" aria-labelledby={idPregunta} hidden={!abierta}>
				{children}
			</div>
		</div>
	);
}
