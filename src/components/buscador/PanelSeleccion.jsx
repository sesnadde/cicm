import { useState } from 'react';

// Widget flotante: no ocupa espacio en la cuadrícula, así la tabla
// conserva el mismo ancho sin importar cuántas variables estén elegidas.
export default function PanelSeleccion({ seleccionadas, onQuitar, onVerSeleccionadas }) {
	const [abierto, setAbierto] = useState(false);
	const items = Array.from(seleccionadas.values());
	const total = items.length;

	return (
		<div className="selector-flotante">
			<button
				type="button"
				className="boton-flotante-seleccion"
				aria-expanded={abierto}
				aria-controls="panel-seleccion"
				aria-label="Ver variables seleccionadas"
				onClick={() => setAbierto((valor) => !valor)}
			>
				<span className="icono-flotante" aria-hidden="true">🗂️</span>
				<span className="contador-flotante">{total}</span>
			</button>

			{abierto && (
				<aside className="panel-seleccion" id="panel-seleccion">
					<div className="panel-seleccion-encabezado">
						<h3 className="titulo-filtros">Variables seleccionadas</h3>
						<button
							type="button"
							className="cerrar-panel-seleccion"
							aria-label="Cerrar panel de variables seleccionadas"
							onClick={() => setAbierto(false)}
						>
							&times;
						</button>
					</div>

					{total === 0 ? (
						<p className="mensaje-seleccion-vacia">
							Aún no has seleccionado ninguna variable. Marca el checkbox junto a cada fila de la tabla.
						</p>
					) : (
						<ul className="lista-seleccion">
							{items.map((item) => (
								<li key={item.id}>
									<span title={item.nombre}>{item.nombre}</span>
									<button type="button" onClick={() => onQuitar(item.id)} aria-label={`Quitar ${item.nombre} de la selección`}>
										&times;
									</button>
								</li>
							))}
						</ul>
					)}

					<button
						type="button"
						className="boton boton-ver-seleccionadas"
						disabled={total === 0}
						onClick={() => {
							setAbierto(false);
							onVerSeleccionadas();
						}}
					>
						Ver variables seleccionadas ({total})
					</button>
				</aside>
			)}
		</div>
	);
}
