import { useState } from 'react';

function TablaSeleccion({ items, conEntidad }) {
	if (items.length === 0) {
		return <p className="mensaje-seleccion-vacia">No hay variables seleccionadas en esta categoría.</p>;
	}

	return (
		<div className="contenedor-tabla">
			<table className="tabla-ciudadana tabla-seleccion">
				<thead>
					<tr>
						<th>Nombre de la Variable</th>
						<th>Eje</th>
						<th>Institución</th>
						<th>Valor</th>
						{conEntidad && <th>Entidad</th>}
					</tr>
				</thead>
				<tbody>
					{items.map((item) => (
						<tr key={item.id}>
							<td title={item.nombre}>{item.nombre}</td>
							<td>{item.eje}</td>
							<td>{item.institucion}</td>
							<td>{item.valor}</td>
							{conEntidad && <td>{item.estado}</td>}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

// Vista de pestañas: variables seleccionadas, agrupadas por nivel de gobierno.
export default function VistaSeleccionadas({ seleccionadas, onVolver }) {
	const [tab, setTab] = useState('todas');
	const [subtab, setSubtab] = useState('lista');

	const items = Array.from(seleccionadas.values());
	const federales = items.filter((item) => item.nivel === 'federal');
	const estatales = items.filter((item) => item.nivel === 'estatal');

	return (
		<div className="vista-pestanas">
			<div className="pestanas-encabezado">
				<button type="button" className="boton boton-secundario" onClick={onVolver}>&larr; Volver a filtros</button>
				<h3>Variables seleccionadas</h3>
			</div>

			<nav className="pestanas-nav" role="tablist">
				<button type="button" className={`pestana-tab${tab === 'todas' ? ' activo' : ''}`} role="tab" aria-selected={tab === 'todas'} onClick={() => setTab('todas')}>
					Todas
				</button>
				<button type="button" className={`pestana-tab${tab === 'federal' ? ' activo' : ''}`} role="tab" aria-selected={tab === 'federal'} onClick={() => setTab('federal')}>
					Federal
				</button>
				<button type="button" className={`pestana-tab${tab === 'estatal' ? ' activo' : ''}`} role="tab" aria-selected={tab === 'estatal'} onClick={() => setTab('estatal')}>
					Estatal
				</button>
			</nav>

			{tab === 'todas' && <TablaSeleccion items={items} conEntidad={false} />}
			{tab === 'federal' && <TablaSeleccion items={federales} conEntidad={false} />}

			{tab === 'estatal' && (
				<div className="pestana-panel">
					<nav className="subpestanas-nav" role="tablist">
						<button type="button" className={`subpestana-tab${subtab === 'lista' ? ' activo' : ''}`} role="tab" aria-selected={subtab === 'lista'} onClick={() => setSubtab('lista')}>
							Lista
						</button>
						<button type="button" className={`subpestana-tab${subtab === 'mapa' ? ' activo' : ''}`} role="tab" aria-selected={subtab === 'mapa'} onClick={() => setSubtab('mapa')}>
							Ver mapa
						</button>
					</nav>

					{subtab === 'lista' ? (
						<TablaSeleccion items={estatales} conEntidad={true} />
					) : (
						<div className="contenedor-mapa">
							<div className="placeholder-mapa">
								<p>🗺️ Próximamente: visualización en mapa.</p>
								<p className="placeholder-mapa-detalle">
									Aquí se mostrará el mapa de la República coloreado según las variables estatales que hayas seleccionado.
								</p>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
