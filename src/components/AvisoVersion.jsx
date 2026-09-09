import { useEffect, useRef } from 'react';

const CLAVE_SESION = 'cicm-aviso-nueva-version';

export default function AvisoVersion({ onCerrar }) {
	const botonCerrarRef = useRef(null);

	useEffect(() => {
		botonCerrarRef.current?.focus();

		function alPresionarTecla(evento) {
			if (evento.key === 'Escape') onCerrar();
		}

		document.addEventListener('keydown', alPresionarTecla);
		return () => document.removeEventListener('keydown', alPresionarTecla);
	}, [onCerrar]);

	return (
		<div className="modal-fondo" onClick={onCerrar}>
			<div
				className="modal-caja"
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-aviso-titulo"
				onClick={(evento) => evento.stopPropagation()}
			>
				<button
					type="button"
					className="modal-cerrar"
					aria-label="Cerrar aviso"
					onClick={onCerrar}
					ref={botonCerrarRef}
				>
					&times;
				</button>
				<h2 id="modal-aviso-titulo">Nueva versión en construcción</h2>
				<p>
					Estamos trabajando en una nueva versión del CICM con más funciones y mejoras.
					Por ahora, seguirás navegando en la versión actual del sitio.
				</p>
				<button type="button" className="boton" onClick={onCerrar}>Entendido</button>
			</div>
		</div>
	);
}

AvisoVersion.claveSesion = CLAVE_SESION;
