import usePageMeta from '../hooks/usePageMeta.js';
import FaqItem from '../components/FaqItem.jsx';
import '../styles/preguntas-frecuentes.css';

export default function PreguntasFrecuentes() {
	usePageMeta({
		title: 'Preguntas frecuentes - CICM',
		description: 'Respuestas a las preguntas más frecuentes sobre el Catálogo de Información sobre la Corrupción en México.',
	});

	return (
		<>
			<section className="banner">
				<div className="container">
					<h1>Preguntas frecuentes</h1>
					<p className="subtitulo">Resuelve tus dudas sobre el CICM: qué es, cómo se construye y qué dice sobre la corrupción en México.</p>
				</div>
			</section>

			<section id="seccion-faq">
				<div className="container">
					<div id="lista-preguntas">

						<FaqItem id="1" pregunta="¿Qué es el CICM?">
							<p>El Catálogo de Información sobre la Corrupción en México (CICM) es una iniciativa de la Secretaría Ejecutiva del Sistema Nacional Anticorrupción (SESNA). Esta herramienta facilita la sistematización, organización y presentación de variables generadas por organismos públicos, académicos, sociedad civil y entidades internacionales. Como repositorio, permite analizar las diversas manifestaciones del fenómeno de la corrupción en México, así como los esfuerzos anticorrupción implementados en los distintos niveles del Estado.</p>
						</FaqItem>

						<FaqItem id="2" pregunta="¿Cuándo se creó el CICM?">
							<p>El CICM en su versión 1.0 fue presentado en abril del 2020. Dada la cantidad de información disponible, se optó por liberar un primer catálogo de 600 variables (150 por cada uno de los cuatro procesos definidos en la LGSNA) que permitieron guiar el desarrollo de esta herramienta.</p>
						</FaqItem>

						<FaqItem id="3" pregunta="¿Cuáles son las principales fuentes de información?">
							<p>Entre las 33 instituciones con funciones de información del CICM, el INEGI es la principal fuente. En la versión más reciente del catálogo (V2.0), el 75% de las variables registradas provienen del INEGI.</p>
						</FaqItem>

						<FaqItem id="4" pregunta="¿Cómo se utiliza/procesa la información de dichas fuentes?">
							<p>Tras recopilar la información de fuentes oficiales, se identifican las variables que, de manera directa o indirecta, guardan relación con el fenómeno de la corrupción y las acciones destinadas a su control. Estas variables se clasifican según las temáticas predefinidas del CICM. Finalmente, se genera una base de datos para el análisis de sus valores.</p>
						</FaqItem>

						<FaqItem id="5" pregunta="¿Cómo se crean las variables?">
							<p>El procesamiento de la información proveniente de fuentes oficiales conlleva la creación de nuevas variables, las cuales se asignan a diversas categorías que, de manera directa o indirecta, se relacionan con alguna temática del fenómeno de la corrupción.</p>
						</FaqItem>

						<FaqItem id="6" pregunta="¿Cómo se clasifican las variables?">
							<p>Cada una de las variables creadas se clasifica según los cuatro procesos principales definidos por la LGSNA: prevención, detección, sanción y fiscalización, así como el control de recursos públicos. Posteriormente, se realiza una segunda clasificación conforme a los ejes estratégicos y temas establecidos en la PNA.</p>
						</FaqItem>

						<FaqItem id="7" pregunta="¿Cuál es la periodicidad de los datos?">
							<p>Se tienen datos anuales, bienales, semestrales, trimestrales y la categoría "otro".</p>
						</FaqItem>

						<FaqItem id="8" pregunta="¿Cuál es la desagregación geográfica de los datos?">
							<p>Los datos se desagregan a nivel federal, estatal, municipal, nacional y "otro". La mayoría corresponde a datos estatales (39% del total) y nacionales (30% del total).</p>
						</FaqItem>

						<FaqItem id="9" pregunta="¿Cómo se mide la corrupción?">
							<p>La corrupción se mide a través de dos enfoques principales: directos e indirectos.</p>
							<p>Los métodos directos buscan recopilar datos mediante procedimientos estadísticos estandarizados, enfocándose en experiencias reales de corrupción. Se basan en indicadores como las tasas de prevalencia e incidencia de la corrupción o la de soborno.</p>
							<p>Por otro lado, los métodos indirectos miden la percepción de la corrupción en lugar de su incidencia real, ya que esta última es difícil de cuantificar con precisión. Entre los principales indicadores de este tipo se encuentran el Índice de Percepción de la Corrupción (IPC), el Índice de Control de la Corrupción (ICC) y el Índice Nacional de Corrupción y Buen Gobierno (INCBG). Asimismo, encuestas como las de Latinobarómetro y las realizadas por el INEGI evalúan la percepción de la corrupción en instituciones y unidades económicas.</p>
						</FaqItem>

						<FaqItem id="10" pregunta="¿Cómo vamos en México respecto a la corrupción?">
							<p>En el Índice de Percepción de la Corrupción (IPC) 2024, México se ubica en la posición 140 de 180 países, con una calificación de 26 puntos sobre 100. Esta cifra representa una caída de cinco puntos respecto a 2022 y coloca al país en una posición desfavorable dentro de América Latina, por debajo de Brasil (34 puntos) y Chile (63 puntos), aunque aún por encima de Guatemala (25 puntos) y Paraguay (24 puntos).</p>
							<p>En cuanto al Índice de Control de la Corrupción (ICC), si bien no se dispone de datos actualizados para 2024, en 2019 México obtuvo una calificación de -0.82108, lo que indica un bajo control de la corrupción en comparación con otras naciones de la región.</p>
							<p>En 2017, México registró una tasa de soborno del 44%, lo que lo posicionó como el segundo país con mayor incidencia de sobornos en América Latina, sólo superado por República Dominicana. Este porcentaje representó un aumento considerable en comparación con el 33% registrado en 2013.</p>
							<p>Por otro lado, la tasa de prevalencia de la corrupción -que mide el porcentaje de personas que experimentaron actos de corrupción al interactuar con funcionarios públicos- pasó del 12.1% en 2013 al 13.96% en 2023. La tasa de incidencia, que refleja la cantidad de actos de corrupción por cada 100,000 habitantes, también se ha incrementado, alcanzando en 2023 un total de 25,394 actos.</p>
						</FaqItem>

					</div>
				</div>
			</section>
		</>
	);
}
