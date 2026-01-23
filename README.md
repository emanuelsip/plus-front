# PLUS Events Platform

Plataforma de gestión de eventos exclusivos desarrollada con React, TypeScript, Vite y Tailwind CSS.

## 🚀 Características

- **React 18** con TypeScript
- **Vite** para desarrollo rápido
- **Tailwind CSS** con estilos personalizados
- **React Router** para navegación
- **Zustand** para manejo de estado
- **React Hook Form + Zod** para formularios y validaciones
- **Axios** configurado para Laravel Sanctum
- **Docker** para entorno de desarrollo
- **Mock data** con toggle simple para integrar APIs reales
- Arquitectura escalable basada en features

## 📁 Estructura del Proyecto

```
src/
├── api/              # Cliente de API (Axios)
├── components/       # Componentes UI reutilizables
│   └── ui/          # Componentes atómicos (Button, Input, Card, etc.)
├── features/         # Módulos funcionales
│   ├── auth/        # Autenticación
│   └── events/      # Eventos
├── hooks/           # Hooks globales
├── lib/             # Utilidades y configuraciones
├── shared/          # Tipos, constantes y utilidades compartidas
└── App.tsx          # Componente principal
```

## 🛠️ Instalación

### Desarrollo Local

1. Instalar dependencias:
```bash
npm install
```

2. Copiar archivo de entorno:
```bash
cp .env.example .env
```

3. Iniciar servidor de desarrollo:
```bash
npm run dev
```

### Docker

1. Construir y ejecutar contenedor:
```bash
docker-compose up -d
```

2. Ver logs:
```bash
docker-compose logs -f frontend
```

3. Detener contenedor:
```bash
docker-compose down
```

Nota (Linux): ajusta `UID` y `GID` en `.env` para que `node_modules` no quede con permisos de root.

### Docker (Producción)

1. Construir y ejecutar imagen optimizada:
```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

2. Apagar:
```bash
docker-compose -f docker-compose.prod.yml down
```

## 🔧 Configuración

### Variables de Entorno

Copia el archivo `.env.example` a `.env` y edita las variables:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_SANCTUM_CSRF_URL=http://localhost:8000/sanctum/csrf-cookie
VITE_USE_MOCKS=true
UID=1000
GID=1000
```

- `VITE_API_BASE_URL`: URL base de la API backend
- `VITE_SANCTUM_CSRF_URL`: URL para obtener cookie CSRF de Sanctum
- `VITE_USE_MOCKS`: Usar datos mock en lugar de API real (true/false). Por defecto es `true` para desarrollo.
- `UID` / `GID`: Usuario y grupo local (Linux) para evitar `node_modules` con permisos de root.

## 📦 Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Previsualiza build de producción
- `npm run lint` - Ejecuta linter

## 🧭 Rutas Principales

- `/` - Home (eventos destacados)
- `/events` - Lista de eventos
- `/events/:id` - Detalle de evento
- `/auth/sign-in` - Inicio de sesión
- `/auth/sign-up` - Registro

## 🏗️ Arquitectura

### Feature-Based Structure

Cada feature contiene:
- `components/` - Componentes específicos de la feature
- `hooks/` - Hooks personalizados
- `services/` - Llamadas a API
- `store/` - Estado con Zustand (si aplica)
- `types/` - Tipos TypeScript y esquemas Zod
- `mocks/` - Datos mock para desarrollo

### Componentes UI

Componentes reutilizables en `src/components/ui/`:
- `Button` - Botones con variantes
- `Input` - Inputs con iconos y validación
- `Card` - Tarjetas con efecto glass

### API Client

El cliente de API está configurado para:
- Autenticación con Laravel Sanctum
- Obtención automática de cookies CSRF
- Interceptores para tokens Bearer
- Manejo de errores 401 y 419 (CSRF)
- Credenciales CORS (`withCredentials: true`)
- Headers requeridos por Sanctum (`X-Requested-With`)

## 🎨 Estilos

El proyecto usa Tailwind CSS con:
- Tema oscuro por defecto
- Colores personalizados (primary gold, backgrounds)
- Fuentes: Cinzel (display) e Inter (sans)
- Efectos glass y gradientes dorados

## 🔐 Autenticación

La autenticación está preparada para Laravel Sanctum:
- Tokens almacenados en localStorage
- Interceptor de Axios para agregar tokens
- Store de Zustand para estado de autenticación

## 📝 Componentes Globales

### Componentes Compartidos (`src/components/shared/`)
- `Logo` - Logo de PLUS con variantes (default, small, large)
- `Footer` - Footer con variantes (default, minimal)
- `AuthLinks` - Links de acceso (Sign up / Sign in)

### Componentes UI (`src/components/ui/`)
- `Button` - Botones con variantes (primary, secondary, outline, ghost, dashed)
- `Input` - Inputs con iconos Material Icons y variantes
- `Card` - Tarjetas con efecto glass

## 🔄 Integración con Backend

### Cambiar de Mocks a API Real

1. Edita `.env` y cambia `VITE_USE_MOCKS=false`
2. Asegúrate de que `VITE_API_BASE_URL` apunte a tu backend Laravel
3. El cliente API automáticamente usará las llamadas reales

### Preparación para Sanctum

El proyecto está listo para integrarse con Laravel Sanctum:
- Las cookies CSRF se obtienen automáticamente
- Los tokens Bearer se agregan a cada petición
- Los errores 401 y 419 se manejan automáticamente

## 📝 Próximos Pasos

1. Integrar más vistas del preview (confirmaciones, pagos)
2. Implementar formularios de invitaciones
3. Agregar sistema de pagos
4. Conectar con API backend real
5. Implementar autenticación completa

## 🤝 Contribuir

1. Crear rama desde `main`
2. Hacer cambios
3. Commit con mensajes descriptivos
4. Push y crear Pull Request

## 📄 Licencia

ISC

