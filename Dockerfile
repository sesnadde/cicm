# Etapa 1: build del sitio con Vite
FROM node:20-alpine AS build
WORKDIR /app

# Vite incrusta las variables VITE_* en el bundle durante el build,
# por lo que deben pasarse como --build-arg (no como variables de
# entorno del contenedor en tiempo de ejecución).
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa 2: servir los archivos estáticos con Nginx
FROM nginx:1.27-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
