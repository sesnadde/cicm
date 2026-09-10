import { useEffect, useRef, useState } from 'react';
import { supabase } from '../../lib/supabaseClient.js';

// Autocompletado: sugiere nombres de variables que coinciden con el texto escrito.
export default function BarraBusqueda({ valorInicial, onBuscar }) {
	const [texto, setTexto] = useState(valorInicial || '');
	const [sugerencias, setSugerencias] = useState([]);
	const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
	const contenedorRef = useRef(null);

	useEffect(() => {
		setTexto(valorInicial || '');
	}, [valorInicial]);

	useEffect(() => {
		const termino = texto.trim();
		if (termino.length < 2) {
			setSugerencias([]);
			return;
		}

		let cancelado = false;
		const temporizador = setTimeout(async () => {
			try {
				const { data, error } = await supabase
					.from('variables')
					.select('nombre')
					.ilike('nombre', `%${termino}%`)
					.limit(20);

				if (error) throw error;
				if (cancelado) return;

				// Quitamos duplicados (la misma variable puede repetirse por
				// distintos estados/años) conservando el orden de aparición.
				const nombresUnicos = Array.from(new Set((data || []).map((fila) => fila.nombre).filter(Boolean)));
				setSugerencias(nombresUnicos.slice(0, 8));
			} catch (error) {
				console.error('Error al obtener sugerencias:', error);
				if (!cancelado) setSugerencias([]);
			}
		}, 300);

		return () => {
			cancelado = true;
			clearTimeout(temporizador);
		};
	}, [texto]);

	useEffect(() => {
		function manejarClicFuera(evento) {
			if (contenedorRef.current && !contenedorRef.current.contains(evento.target)) {
				setMostrarSugerencias(false);
			}
		}
		document.addEventListener('mousedown', manejarClicFuera);
		return () => document.removeEventListener('mousedown', manejarClicFuera);
	}, []);

	function manejarSubmit(evento) {
		evento.preventDefault();
		setMostrarSugerencias(false);
		onBuscar(texto.trim());
	}

	function elegirSugerencia(nombre) {
		setTexto(nombre);
		setMostrarSugerencias(false);
		onBuscar(nombre);
	}

	return (
		<form className="formulario-principal" onSubmit={manejarSubmit}>
			<div className="contenedor-autocompletado" ref={contenedorRef}>
				<input
					type="text"
					value={texto}
					onChange={(evento) => setTexto(evento.target.value)}
					onFocus={() => setMostrarSugerencias(true)}
					placeholder="Escribe el nombre de la variable, ej. presupuesto, auditoría..."
					className="input-busqueda-grande"
					autoComplete="off"
					role="combobox"
					aria-expanded={mostrarSugerencias && sugerencias.length > 0}
					aria-controls="lista-sugerencias"
					aria-autocomplete="list"
				/>
				{mostrarSugerencias && sugerencias.length > 0 && (
					<ul id="lista-sugerencias" className="lista-sugerencias" role="listbox">
						{sugerencias.map((nombre) => (
							<li key={nombre} role="option" aria-selected="false">
								<button type="button" onClick={() => elegirSugerencia(nombre)}>{nombre}</button>
							</li>
						))}
					</ul>
				)}
			</div>
			<button type="submit" className="boton">Buscar</button>
		</form>
	);
}
