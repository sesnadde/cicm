import { useState } from 'react';

const REGLAS = {
	nombre: (valor) => valor.trim().length > 0 || 'Escribe tu nombre.',
	correo: (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim()) || 'Escribe un correo válido.',
	asunto: (valor) => valor.trim().length > 0 || 'Escribe el asunto de tu mensaje.',
	mensaje: (valor) => valor.trim().length >= 10 || 'Tu mensaje debe tener al menos 10 caracteres.',
};

const VALORES_INICIALES = { nombre: '', correo: '', asunto: '', mensaje: '' };

export default function ContactForm() {
	const [valores, setValores] = useState(VALORES_INICIALES);
	const [errores, setErrores] = useState({});
	const [mensajeEnvio, setMensajeEnvio] = useState(null);

	function validarCampo(campo) {
		const resultado = REGLAS[campo](valores[campo]);
		setErrores((anteriores) => ({ ...anteriores, [campo]: resultado === true ? '' : resultado }));
		return resultado === true;
	}

	function manejarCambio(evento) {
		const { name, value } = evento.target;
		setValores((anteriores) => ({ ...anteriores, [name]: value }));
	}

	function manejarSubmit(evento) {
		let formularioValido = true;
		const nuevosErrores = {};

		Object.keys(REGLAS).forEach((campo) => {
			const resultado = REGLAS[campo](valores[campo]);
			if (resultado !== true) {
				formularioValido = false;
				nuevosErrores[campo] = resultado;
			}
		});

		setErrores(nuevosErrores);

		if (!formularioValido) {
			evento.preventDefault();
			setMensajeEnvio(null);
			return;
		}

		// El formulario se envía de forma nativa vía mailto: (sin preventDefault).
		setMensajeEnvio('Abriendo tu cliente de correo para enviar el mensaje...');
	}

	return (
		<form
			id="form-contacto"
			className="tarjeta"
			action="mailto:contacto@cicm.sesna.gob.mx"
			method="POST"
			encType="text/plain"
			noValidate
			onSubmit={manejarSubmit}
		>
			<div className="fila-inputs">
				<div className={`grupo-input${errores.nombre ? ' campo-invalido' : ''}`}>
					<label htmlFor="input-nombre">Nombre</label>
					<input
						type="text"
						id="input-nombre"
						name="nombre"
						placeholder="Tu nombre"
						required
						value={valores.nombre}
						onChange={manejarCambio}
						onBlur={() => validarCampo('nombre')}
					/>
					<span className="mensaje-error" data-error-de="input-nombre">{errores.nombre}</span>
				</div>

				<div className={`grupo-input${errores.correo ? ' campo-invalido' : ''}`}>
					<label htmlFor="input-correo">Correo</label>
					<input
						type="email"
						id="input-correo"
						name="correo"
						placeholder="tu@correo.com"
						required
						value={valores.correo}
						onChange={manejarCambio}
						onBlur={() => validarCampo('correo')}
					/>
					<span className="mensaje-error" data-error-de="input-correo">{errores.correo}</span>
				</div>
			</div>

			<div className={`grupo-input${errores.asunto ? ' campo-invalido' : ''}`}>
				<label htmlFor="input-asunto">Asunto</label>
				<input
					type="text"
					id="input-asunto"
					name="asunto"
					placeholder="Asunto de tu mensaje"
					required
					value={valores.asunto}
					onChange={manejarCambio}
					onBlur={() => validarCampo('asunto')}
				/>
				<span className="mensaje-error" data-error-de="input-asunto">{errores.asunto}</span>
			</div>

			<div className={`grupo-input${errores.mensaje ? ' campo-invalido' : ''}`}>
				<label htmlFor="txt-mensaje">Mensaje</label>
				<textarea
					id="txt-mensaje"
					name="mensaje"
					placeholder="Escribe tu pregunta, comentario o sugerencia"
					rows="6"
					required
					value={valores.mensaje}
					onChange={manejarCambio}
					onBlur={() => validarCampo('mensaje')}
				></textarea>
				<span className="mensaje-error" data-error-de="txt-mensaje">{errores.mensaje}</span>
			</div>

			<p id="mensaje-envio" className="mensaje-envio" role="status" hidden={!mensajeEnvio}>
				{mensajeEnvio}
			</p>

			<button type="submit" className="boton">Enviar mensaje</button>
		</form>
	);
}
