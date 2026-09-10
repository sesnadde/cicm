import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
	console.error(
		'Faltan las variables de entorno VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY (revisa tu archivo .env). El buscador no podrá consultar datos.'
	);
}

// Cliente de Supabase para el navegador: usa la llave pública (anon),
// protegida por las políticas de Row Level Security del proyecto.
// Si faltan las variables de entorno usamos un URL de relleno: createClient()
// lanza una excepción de inmediato con un URL vacío, lo que rompería toda la
// aplicación (Buscador.jsx se importa desde App.jsx). Con el relleno, el
// cliente se crea sin problema y las llamadas fallan de forma controlada,
// cayendo en los mensajes de error que ya maneja cada componente.
export const supabase = createClient(SUPABASE_URL || 'https://sin-configurar.supabase.co', SUPABASE_ANON_KEY || 'sin-configurar');
