import { useEffect } from 'react';

function setMetaTag(name, content) {
	let etiqueta = document.querySelector(`meta[name="${name}"]`);

	if (!content) {
		if (etiqueta) etiqueta.remove();
		return;
	}

	if (!etiqueta) {
		etiqueta = document.createElement('meta');
		etiqueta.setAttribute('name', name);
		document.head.appendChild(etiqueta);
	}
	etiqueta.setAttribute('content', content);
}

// Sincroniza <title> y metaetiquetas por página, ya que la SPA
// comparte un único index.html entre todas las rutas.
export default function usePageMeta({ title, description, robots }) {
	useEffect(() => {
		if (title) document.title = title;
		setMetaTag('description', description);
		setMetaTag('robots', robots);
	}, [title, description, robots]);
}
