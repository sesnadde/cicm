import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta.js';
import { supabase } from '../lib/supabaseClient.js';
import BarraBusqueda from '../components/buscador/BarraBusqueda.jsx';
import PanelFiltros from '../components/buscador/PanelFiltros.jsx';
import TablaResultados from '../components/buscador/TablaResultados.jsx';
import PanelSeleccion from '../components/buscador/PanelSeleccion.jsx';
import VistaSeleccionadas from '../components/buscador/VistaSeleccionadas.jsx';
import '../styles/busqueda.css';

const POR_PAGINA = 5;
const ANO_INICIAL = 2023;

// El nivel de gobierno se deriva de la columna "estado":
// "No aplica" = Federal, cualquier otro valor = Estatal/Municipal.
function nivelDeEstado(estado) {
	return estado === 'No aplica' ? 'federal' : 'estatal';
}

export default function Buscador() {
	usePageMeta({
		title: 'Buscador - CICM',
		robots: 'noindex',
	});

	const [searchParams, setSearchParams] = useSearchParams();
	const [variables, setVariables] = useState([]);
	const [totalRegistros, setTotalRegistros] = useState(0);
	const [cargando, setCargando] = useState(true);
	const [error, setError] = useState(null);
	const [listaEstados, setListaEstados] = useState([]);
	const [seleccionadas, setSeleccionadas] = useState(new Map());
	const [vista, setVista] = useState('busqueda');

	const filtros = {
		q: searchParams.get('q') || '',
		eje: searchParams.get('eje') || '',
		tema: searchParams.get('tema') || '',
		ano: searchParams.get('ano') || '',
		nivel: searchParams.get('nivel_gobierno') || 'todos',
		estado: searchParams.get('estado') || '',
	};
	const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);

	const anioActual = new Date().getFullYear();
	const anosDisponibles = [];
	for (let anio = anioActual; anio >= ANO_INICIAL; anio--) anosDisponibles.push(anio);

	const totalPages = totalRegistros > 0 ? Math.ceil(totalRegistros / POR_PAGINA) : 1;

	// Lista de entidades federativas para el filtro (se obtiene una sola vez).
	useEffect(() => {
		let cancelado = false;
		(async () => {
			try {
				const { data, error: errorConsulta } = await supabase.from('estado').select('id, name').order('name');
				if (errorConsulta) throw errorConsulta;
				if (!cancelado) setListaEstados(data || []);
			} catch (errorConsulta) {
				console.error('Error al obtener estados:', errorConsulta);
				if (!cancelado) setListaEstados([]);
			}
		})();
		return () => {
			cancelado = true;
		};
	}, []);

	// Consulta las variables cada vez que cambian los filtros o la página
	// (searchParams es la fuente de verdad, igual que request.args en Flask).
	useEffect(() => {
		let cancelado = false;
		setCargando(true);
		setError(null);

		(async () => {
			try {
				const inicio = (page - 1) * POR_PAGINA;
				const fin = inicio + POR_PAGINA - 1;

				let consulta = supabase.from('variables').select('id, nombre, eje, institucion, valor, estado', { count: 'exact' });

				if (filtros.q) consulta = consulta.ilike('nombre', `%${filtros.q}%`);
				if (filtros.eje) consulta = consulta.eq('eje', filtros.eje);
				if (filtros.tema) consulta = consulta.eq('tema', filtros.tema);
				if (filtros.ano) consulta = consulta.eq('ano', filtros.ano);

				if (filtros.nivel === 'federal') {
					consulta = consulta.eq('estado', 'No aplica');
				} else if (filtros.nivel === 'estatal') {
					consulta = consulta.neq('estado', 'No aplica');
					if (filtros.estado) consulta = consulta.eq('estado', filtros.estado);
				}

				const { data, count, error: errorConsulta } = await consulta.range(inicio, fin);
				if (errorConsulta) throw errorConsulta;
				if (cancelado) return;

				setVariables(data || []);
				setTotalRegistros(count || 0);
			} catch (errorConsulta) {
				console.error('Error de conexión:', errorConsulta);
				if (!cancelado) {
					setVariables([]);
					setTotalRegistros(0);
					setError('No hay variables registradas o hubo un error.');
				}
			} finally {
				if (!cancelado) setCargando(false);
			}
		})();

		return () => {
			cancelado = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams]);

	function aplicarParametros(cambios) {
		setSearchParams((anteriores) => {
			const nuevos = new URLSearchParams(anteriores);
			Object.entries(cambios).forEach(([clave, valor]) => {
				if (valor === '' || valor === null || valor === undefined) {
					nuevos.delete(clave);
				} else {
					nuevos.set(clave, String(valor));
				}
			});
			return nuevos;
		});
	}

	function manejarBusquedaTexto(texto) {
		aplicarParametros({ q: texto, page: 1 });
	}

	function manejarAplicarFiltros(nuevosFiltros) {
		aplicarParametros({
			eje: nuevosFiltros.eje,
			tema: nuevosFiltros.tema,
			ano: nuevosFiltros.ano,
			nivel_gobierno: nuevosFiltros.nivel === 'todos' ? '' : nuevosFiltros.nivel,
			estado: nuevosFiltros.nivel === 'estatal' ? nuevosFiltros.estado : '',
			page: 1,
		});
	}

	function manejarCambiarPagina(nuevaPagina) {
		aplicarParametros({ page: nuevaPagina });
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function alternarSeleccion(fila) {
		setSeleccionadas((anteriores) => {
			const nuevas = new Map(anteriores);
			if (nuevas.has(fila.id)) {
				nuevas.delete(fila.id);
			} else {
				nuevas.set(fila.id, { ...fila, nivel: nivelDeEstado(fila.estado) });
			}
			return nuevas;
		});
	}

	function alternarSeleccionPagina(filasPagina) {
		setSeleccionadas((anteriores) => {
			const nuevas = new Map(anteriores);
			const todasSeleccionadas = filasPagina.length > 0 && filasPagina.every((fila) => nuevas.has(fila.id));
			filasPagina.forEach((fila) => {
				if (todasSeleccionadas) {
					nuevas.delete(fila.id);
				} else {
					nuevas.set(fila.id, { ...fila, nivel: nivelDeEstado(fila.estado) });
				}
			});
			return nuevas;
		});
	}

	function quitarSeleccion(id) {
		setSeleccionadas((anteriores) => {
			const nuevas = new Map(anteriores);
			nuevas.delete(id);
			return nuevas;
		});
	}

	return (
		<>
			<section className="banner">
				<div className="container">
					<h1>Buscador</h1>
					<p className="subtitulo">Consulta datos públicos de combate a la corrupción, filtrados por eje, año, nivel de gobierno y entidad federativa.</p>
				</div>
			</section>

			<section id="seccion-busqueda" className="seccion-alterna">
				<div className="container">
					<div className="busqueda-superior">
						<BarraBusqueda valorInicial={filtros.q} onBuscar={manejarBusquedaTexto} />
					</div>

					{vista === 'busqueda' ? (
						<div className="layout-catalogo">
							<PanelFiltros
								filtros={filtros}
								anosDisponibles={anosDisponibles}
								listaEstados={listaEstados}
								onAplicar={manejarAplicarFiltros}
							/>

							<TablaResultados
								variables={variables}
								cargando={cargando}
								error={error}
								page={page}
								totalPages={totalPages}
								totalRegistros={totalRegistros}
								seleccion={seleccionadas}
								onAlternarSeleccion={alternarSeleccion}
								onAlternarPagina={alternarSeleccionPagina}
								onCambiarPagina={manejarCambiarPagina}
							/>
						</div>
					) : (
						<VistaSeleccionadas seleccionadas={seleccionadas} onVolver={() => setVista('busqueda')} />
					)}

					<PanelSeleccion
						seleccionadas={seleccionadas}
						onQuitar={quitarSeleccion}
						onVerSeleccionadas={() => setVista('seleccion')}
					/>
				</div>
			</section>
		</>
	);
}
