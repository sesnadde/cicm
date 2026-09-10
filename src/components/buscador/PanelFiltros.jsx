import { useEffect, useState } from 'react';

// Los valores deben coincidir exactamente con el contenido de la columna
// "eje" en Supabase: son valores de filtro, no solo etiquetas visuales.
const EJES = [
	'1. Combatir la corrupción y la impunidad',
	'2. Combatir la arbitrariedad y el abuso de poder',
	'3. Promover la mejora de la gestión y los puntos de contacto gobierno-sociedad',
	'4. Involucrar a la sociedad y el sector privado',
];

const TEMAS = [
	{ valor: 'gestion', etiqueta: 'Gestión Pública' },
	{ valor: 'impunidad', etiqueta: 'Impunidad' },
];

export default function PanelFiltros({ filtros, anosDisponibles, listaEstados, onAplicar }) {
	const [borrador, setBorrador] = useState(filtros);

	// Si los filtros aplicados cambian desde fuera (ej. al buscar por texto),
	// el formulario de filtros se mantiene sincronizado.
	useEffect(() => {
		setBorrador(filtros);
	}, [filtros]);

	function actualizarCampo(campo, valor) {
		setBorrador((anteriores) => ({ ...anteriores, [campo]: valor }));
	}

	function manejarSubmit(evento) {
		evento.preventDefault();
		onAplicar(borrador);
	}

	const mostrarEstado = borrador.nivel === 'estatal';

	return (
		<aside className="panel-filtros">
			<h3 className="titulo-filtros">Filtros Disponibles</h3>

			<form onSubmit={manejarSubmit}>
				<div className="grupo-filtro">
					<label htmlFor="filtro-eje">Eje</label>
					<select
						id="filtro-eje"
						className="input-select"
						value={borrador.eje}
						onChange={(evento) => actualizarCampo('eje', evento.target.value)}
					>
						<option value="">Todos los Ejes</option>
						{EJES.map((eje) => (
							<option key={eje} value={eje}>{eje}</option>
						))}
					</select>
				</div>

				<div className="grupo-filtro">
					<label htmlFor="filtro-tema">Tema</label>
					<select
						id="filtro-tema"
						className="input-select"
						value={borrador.tema}
						onChange={(evento) => actualizarCampo('tema', evento.target.value)}
					>
						<option value="">Todos los Temas</option>
						{TEMAS.map((tema) => (
							<option key={tema.valor} value={tema.valor}>{tema.etiqueta}</option>
						))}
					</select>
				</div>

				<div className="grupo-filtro">
					<label htmlFor="filtro-ano">Año</label>
					<select
						id="filtro-ano"
						className="input-select"
						value={borrador.ano}
						onChange={(evento) => actualizarCampo('ano', evento.target.value)}
					>
						<option value="">Todos los años</option>
						{anosDisponibles.map((anio) => (
							<option key={anio} value={String(anio)}>{anio}</option>
						))}
					</select>
				</div>

				<div className="grupo-filtro">
					<label>Nivel de Gobierno</label>
					<div className="opciones-radio">
						<label>
							<input
								type="radio"
								name="nivel_gobierno"
								value="todos"
								checked={borrador.nivel === 'todos'}
								onChange={(evento) => actualizarCampo('nivel', evento.target.value)}
							/> Todos
						</label>
						<label>
							<input
								type="radio"
								name="nivel_gobierno"
								value="federal"
								checked={borrador.nivel === 'federal'}
								onChange={(evento) => actualizarCampo('nivel', evento.target.value)}
							/> Federal
						</label>
						<label>
							<input
								type="radio"
								name="nivel_gobierno"
								value="estatal"
								checked={borrador.nivel === 'estatal'}
								onChange={(evento) => actualizarCampo('nivel', evento.target.value)}
							/> Estatal / Municipal
						</label>
					</div>
				</div>

				{mostrarEstado && (
					<div className="grupo-filtro">
						<label htmlFor="filtro-estado">Entidad Federativa</label>
						<select
							id="filtro-estado"
							className="input-select"
							value={borrador.estado}
							onChange={(evento) => actualizarCampo('estado', evento.target.value)}
						>
							<option value="">Selecciona un Estado...</option>
							{listaEstados.map((estado) => (
								<option key={estado.id} value={estado.name}>{estado.name}</option>
							))}
						</select>
					</div>
				)}

				<button type="submit" className="boton boton-aplicar-filtros">Aplicar filtros</button>
			</form>
		</aside>
	);
}
