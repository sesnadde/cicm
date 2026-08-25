const EVENTOS = [
	{
		lado: 'izquierda',
		fecha: 'Enero 2020',
		titulo: 'Aprobación de la PNA',
		texto: 'Se aprueba oficialmente la Política Nacional Anticorrupción (PNA), que establece las bases para coordinar las acciones nacionales en materia de prevención y combate a la corrupción.',
	},
	{
		lado: 'derecha',
		fecha: '2020',
		titulo: 'Desarrollo metodológico',
		texto: 'Se desarrollan las propuestas metodológicas para evaluar los resultados e impactos derivados de la implementación de la PNA, así como el comportamiento del fenómeno de la corrupción en México a través del tiempo.',
	},
	{
		lado: 'izquierda',
		fecha: '2020',
		titulo: 'Inicio de la construcción del CICM',
		texto: 'La SESNA recibe la instrucción de iniciar el desarrollo de la herramienta, con base en el Cuarto Transitorio del Acuerdo por el cual el Comité Coordinador del Sistema Nacional Anticorrupción aprueba la Política Nacional Anticorrupción.',
	},
	{
		lado: 'derecha',
		fecha: '6 de abril de 2020',
		titulo: 'Primera versión del CICM',
		texto: 'La SESNA presenta la primera herramienta de consulta dinámica del CICM en formato Microsoft Excel con aproximadamente 600 variables.',
	},
	{
		lado: 'izquierda',
		fecha: 'Octubre 2020',
		titulo: 'Ampliación del catálogo',
		texto: 'El Catálogo de Información sobre la Corrupción en México crece de 600 a 1,650 variables.',
	},
	{
		lado: 'derecha',
		fecha: '2020',
		titulo: 'Migración a plataforma web',
		texto: 'Gracias a un proyecto de cooperación internacional con la GIZ en México y la Agencia Mexicana de Cooperación Internacional para el Desarrollo, inicia la migración del CICM hacia una plataforma web con mayor capacidad y una interfaz de búsqueda más amigable.',
	},
	{
		lado: 'izquierda',
		fecha: '29 de marzo de 2022',
		titulo: 'Lanzamiento del CICM 2.0',
		texto: 'Se presenta oficialmente la versión 2.0 del Catálogo de Información sobre la Corrupción en México.',
	},
];

export default function HistoriaCicm() {
	return (
		<section id="historia-cicm-visual" className="seccion-alterna">
			<div className="container">
				<h2>Historia del CICM</h2>

				<div className="timeline">
					{EVENTOS.map((evento) => (
						<article key={evento.titulo} className={`timeline-item ${evento.lado}`}>
							<div className="timeline-punto"></div>
							<div className="timeline-card">
								<span className="timeline-fecha">{evento.fecha}</span>
								<h3>{evento.titulo}</h3>
								<p>{evento.texto}</p>
							</div>
						</article>
					))}
				</div>
			</div>

			<div className="timeline-punto color-1"></div>
			<div className="timeline-punto color-2"></div>
			<div className="timeline-punto color-3"></div>
			<div className="timeline-punto color-4"></div>
			<div className="timeline-punto color-5"></div>
			<div className="timeline-punto color-6"></div>
			<div className="timeline-punto color-7"></div>
		</section>
	);
}
