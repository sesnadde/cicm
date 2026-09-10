import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import AvisoVersion from './AvisoVersion.jsx';

export default function Layout() {
	const [menuAbierto, setMenuAbierto] = useState(false);
	const [avisoVisible, setAvisoVisible] = useState(false);

	useEffect(() => {
		if (!sessionStorage.getItem(AvisoVersion.claveSesion)) {
			setAvisoVisible(true);
		}
	}, []);

	function cerrarAviso() {
		sessionStorage.setItem(AvisoVersion.claveSesion, '1');
		setAvisoVisible(false);
	}

	return (
		<>
			{avisoVisible && <AvisoVersion onCerrar={cerrarAviso} />}
			<a className="skip-link" href="#contenido-principal">Saltar al contenido principal</a>

			{/* Barra institucional */}
			<div className="barra-institucional">
				<div className="container">
					<img src="/logo-sesna.png" alt="Secretaría Ejecutiva del Sistema Nacional Anticorrupción (SESNA)" className="logo-sesna" />
				</div>
			</div>

			{/* Encabezado principal */}
			<header id="encabezado-principal">
				<div className="container">
					<Link to="/" className="logo-sitio">
						CICM
						<span>Catálogo de Información sobre la Corrupción en México</span>
					</Link>

					<div className="encabezado-acciones">
						<Link to="/buscador" className="boton-buscar" aria-label="Ir directamente al buscador">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
								<circle cx="11" cy="11" r="7"></circle>
								<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
							</svg>
							<span className="buscar-texto">Buscar</span>
						</Link>

						<button
							type="button"
							className="boton-menu-movil"
							aria-label="Abrir menú de navegación"
							aria-expanded={menuAbierto}
							aria-controls="menu-principal"
							onClick={() => setMenuAbierto((abierto) => !abierto)}
						>
							<span></span><span></span><span></span>
						</button>

						{/* Menú de navegación */}
						<nav id="menu-principal" aria-label="Menú principal" className={menuAbierto ? 'menu-abierto' : ''}>
							<ul className="menu-nav">
								<li><NavLink to="/" end>Inicio</NavLink></li>
								<li><NavLink to="/preguntas-frecuentes">Preguntas frecuentes</NavLink></li>
								<li><NavLink to="/contacto">Contáctanos</NavLink></li>
							</ul>
						</nav>
					</div>
				</div>
			</header>

			<main id="contenido-principal">
				<Outlet />
			</main>

			{/* Pie de página */}
			<footer id="pie-pagina">
				<div className="container">
					<div className="footer-contenido">
						<div className="footer-institucional">
							<h4>CICM</h4>
							<p>Catálogo de Información sobre la Corrupción en México, una herramienta de la Secretaría Ejecutiva del Sistema Nacional Anticorrupción (SESNA).</p>
						</div>
						<nav className="footer-enlaces" aria-label="Enlaces del pie de página">
							<h4>Navegación</h4>
							<ul>
								<li><Link to="/">Inicio</Link></li>
								<li><Link to="/preguntas-frecuentes">Preguntas frecuentes</Link></li>
								<li><Link to="/contacto">Contáctanos</Link></li>
							</ul>
						</nav>
						<div className="footer-sesna">
							<h4>Más información</h4>
							<ul className="footer-enlaces">
								<li><a href="https://www.sesna.gob.mx" target="_blank" rel="noopener">Sitio de la SESNA</a></li>
								<li><a href="http://sna.org.mx" target="_blank" rel="noopener">Sistema Nacional Anticorrupción</a></li>
							</ul>
						</div>
					</div>
					<p className="footer-derechos">&copy; 2026 CICM - SESNA. Todos los derechos reservados.</p>
				</div>
			</footer>
		</>
	);
}
