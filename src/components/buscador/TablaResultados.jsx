export default function TablaResultados({
	variables,
	cargando,
	error,
	page,
	totalPages,
	totalRegistros,
	seleccion,
	onAlternarSeleccion,
	onAlternarPagina,
	onCambiarPagina,
}) {
	const todasSeleccionadas = variables.length > 0 && variables.every((fila) => seleccion.has(fila.id));

	return (
		<section className="panel-resultados">
			<div className="encabezado-resultados">
				<h3>Explora el Catálogo</h3>
				<span className="contador-resultados">
					<span className="contador-numero">{cargando ? '…' : totalRegistros}</span> resultados encontrados
				</span>
			</div>

			<div className="contenedor-tabla">
				<table className="tabla-ciudadana">
					<thead>
						<tr>
							<th className="col-checkbox">
								<input
									type="checkbox"
									checked={todasSeleccionadas}
									onChange={() => onAlternarPagina(variables)}
									disabled={variables.length === 0}
									title="Seleccionar todas las variables de esta página"
									aria-label="Seleccionar todas las variables de esta página"
								/>
							</th>
							<th>Nombre de la Variable</th>
							<th>Eje</th>
							<th>Institución</th>
							<th>Valor</th>
						</tr>
					</thead>
					<tbody>
						{cargando ? (
							<tr><td colSpan="5" className="tabla-mensaje">Cargando resultados…</td></tr>
						) : variables.length > 0 ? (
							variables.map((fila) => (
								<tr key={fila.id}>
									<td className="col-checkbox">
										<input
											type="checkbox"
											checked={seleccion.has(fila.id)}
											onChange={() => onAlternarSeleccion(fila)}
											aria-label={`Seleccionar ${fila.nombre}`}
										/>
									</td>
									<td title={fila.nombre}>{fila.nombre}</td>
									<td>{fila.eje}</td>
									<td>{fila.institucion}</td>
									<td>{fila.valor}</td>
								</tr>
							))
						) : (
							<tr><td colSpan="5" className="tabla-mensaje">{error || 'No hay variables registradas o hubo un error.'}</td></tr>
						)}
					</tbody>
				</table>
			</div>

			<div className="paginacion">
				<button type="button" className="boton" disabled={page <= 1} onClick={() => onCambiarPagina(page - 1)}>
					Anterior
				</button>

				<span className="paginacion-indicador">Página {page} de {totalPages}</span>

				<button type="button" className="boton" disabled={page >= totalPages} onClick={() => onCambiarPagina(page + 1)}>
					Siguiente
				</button>
			</div>
		</section>
	);
}
