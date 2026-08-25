import { useState } from 'react';

const EJES = [
	{
		id: 'eje-1',
		numero: 1,
		ariaLabel: 'Eje 1. Corrupción e impunidad',
		titulo: 'Eje 1. Combatir la corrupción y la impunidad',
		puntos: [
			'Prevención, detección, denuncia, investigación, substanciación y sanción de faltas administrativas.',
			'Procuración e impartición de justicia en materia de delitos por hechos de corrupción.',
		],
	},
	{
		id: 'eje-2',
		numero: 2,
		ariaLabel: 'Eje 2. Arbitrariedad y el abuso de poder',
		titulo: 'Eje 2. Combatir la arbitrariedad y el abuso de poder',
		puntos: [
			'Profesionalización e integridad en el servicio público.',
			'Procesos institucionales.',
			'Auditoría y fiscalización.',
		],
	},
	{
		id: 'eje-3',
		numero: 3,
		ariaLabel: 'Eje 3. Mejora de la gestión y de puntos de contacto entre gobierno y sociedad',
		titulo: 'Eje 3. Mejorar la gestión y los puntos de contacto gobierno-sociedad',
		puntos: [
			'Puntos de contacto gobierno-ciudadanía: trámites, servicios y programas públicos.',
			'Puntos de contacto gobierno-iniciativa privada.',
		],
	},
	{
		id: 'eje-4',
		numero: 4,
		ariaLabel: 'Eje 4. Involucramiento social en el control de la corrupción',
		titulo: 'Eje 4. Involucrar a la sociedad y al sector privado',
		puntos: [
			'Participación ciudadana: vigilancia, colaboración y cocreación.',
			'Corresponsabilidad e integridad empresarial.',
			'Educación y comunicación para el control de la corrupción.',
		],
	},
];

export default function EjesPna() {
	const [ejeActivo, setEjeActivo] = useState('eje-1');

	return (
		<div className="ejes-wrapper">
			{/* Cuadros: solo el número, el título va en el aria-label */}
			<div className="menu-ejes-cuadros" role="group" aria-label="Ejes del Plan Nacional Anticorrupción">
				{EJES.map((eje) => (
					<button
						key={eje.id}
						type="button"
						className={`eje-cuadro eje-${eje.numero}${eje.id === ejeActivo ? ' activo' : ''}`}
						data-eje={eje.id}
						aria-label={eje.ariaLabel}
						onClick={() => setEjeActivo(eje.id)}
					>
						<span className="eje-cuadro-numero">{eje.numero}</span>
					</button>
				))}
			</div>

			{/* Panel de descripción (acomodado a la izquierda por CSS) */}
			<div className="ejes-contenido">
				{EJES.map((eje) => (
					<div
						key={eje.id}
						id={eje.id}
						className={`eje-panel eje-${eje.numero}${eje.id === ejeActivo ? ' activo' : ''}`}
					>
						<h3>{eje.titulo}</h3>
						<ul>
							{eje.puntos.map((punto) => (
								<li key={punto}>{punto}</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
}
