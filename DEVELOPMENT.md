# Guía de Desarrollo

## 🚀 Inicio Rápido

### Desarrollo Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   ```
   
   Edita `.env` según tu configuración:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   VITE_SANCTUM_CSRF_URL=http://localhost:8000/sanctum/csrf-cookie
   VITE_USE_MOCKS=true
  UID=1000
  GID=1000
   ```

3. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

### Desarrollo con Docker

Nota (Linux): ajusta `UID` y `GID` en `.env` para evitar `node_modules` con permisos de root.

1. **Construir y ejecutar:**
   ```bash
   docker-compose up -d --build
   ```

2. **Ver logs:**
   ```bash
   docker-compose logs -f frontend
   ```

3. **Detener:**
   ```bash
   docker-compose down
   ```

### Producción (VPS)

1. **Construir y ejecutar:**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d --build
   ```

2. **Detener:**
   ```bash
   docker-compose -f docker-compose.prod.yml down
   ```

## 📁 Estructura de Carpetas

```
src/
├── api/                    # Cliente API (Axios + Sanctum)
│   └── client.ts
├── components/
│   ├── shared/            # Componentes globales reutilizables
│   │   ├── Logo/
│   │   └── Footer/
│   └── ui/                # Componentes UI atómicos
│       ├── Button/
│       ├── Input/
│       └── Card/
├── features/              # Módulos funcionales (Feature-Based)
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   └── types/
│   └── events/
│       ├── components/
│       ├── hooks/
│       ├── mocks/
│       ├── pages/
│       ├── services/
│       └── types/
├── hooks/                 # Hooks globales
├── lib/                   # Utilidades (cn, etc.)
├── shared/                # Tipos, constantes globales
│   ├── constants/
│   └── types/
└── App.tsx
```

## 🎨 Componentes

### Componentes Compartidos

**Logo** (`src/components/shared/Logo/`)
- Props: `variant?: 'default' | 'small' | 'large'`, `invert?: boolean`
- Uso: `<Logo variant="large" />`

**Footer** (`src/components/shared/Footer/`)
- Props: `variant?: 'default' | 'minimal'`
- Uso: `<Footer variant="minimal" />`

### Componentes UI

**Button** (`src/components/ui/Button/`)
- Variantes: `primary`, `secondary`, `outline`, `ghost`, `dashed`
- Tamaños: `sm`, `md`, `lg`
- Props: `variant`, `size`, `isLoading`, `icon`
- Uso: `<Button variant="primary" size="lg" icon={<Icon />}>Enviar</Button>`

**Input** (`src/components/ui/Input/`)
- Variantes: `default`, `primary`, `secondary`
- Props: `icon`, `label`, `error`, `variant`
- Uso: `<Input icon="person" variant="primary" placeholder="Nombre" />`

**Card** (`src/components/ui/Card/`)
- Variantes: `default`, `glass`
- Uso: `<Card variant="glass">Contenido</Card>`

## 🔌 Integración con API

### Cambiar de Mocks a API Real

1. Edita `.env`:
   ```env
   VITE_USE_MOCKS=false
   VITE_API_BASE_URL=http://tu-backend.com/api
   ```

2. El servicio automáticamente usará la API real.

### Configuración de Sanctum

El cliente API está configurado para:
- ✅ Obtener cookies CSRF automáticamente
- ✅ Agregar tokens Bearer a las peticiones
- ✅ Manejar errores 401 (no autorizado)
- ✅ Manejar errores 419 (CSRF token mismatch)
- ✅ Enviar credenciales CORS

### Ejemplo de Servicio

```typescript
// src/features/events/services/eventsService.ts
import { apiClient } from '@/api/client'
import { API_ENDPOINTS } from '@/shared/constants'

export const eventsService = {
  async getEvents(): Promise<Event[]> {
    // Si VITE_USE_MOCKS=true, retorna mocks
    if (USE_MOCKS) {
      return mockEvents
    }
    
    // Si no, hace petición real
    const response = await apiClient.get(API_ENDPOINTS.EVENTS.LIST)
    return response.data.data
  },
}
```

## 🎯 Agregar Nueva Feature

1. Crear carpeta en `src/features/nueva-feature/`
2. Estructura:
   ```
   nueva-feature/
   ├── components/
   ├── hooks/
   ├── services/
   ├── store/          # Si usa Zustand
   ├── types/
   ├── mocks/          # Si necesita mocks
   └── index.ts        # Barrel exports
   ```
3. Agregar endpoints en `src/shared/constants/index.ts`
4. Crear tipos en `src/shared/types/` si son globales

## 🧪 Testing con Mocks

Los mocks están en `src/features/*/mocks/`. Para usar mocks:
- `VITE_USE_MOCKS=true` en `.env`
- Los servicios automáticamente retornan datos mock

## 📝 Convenciones

- **TypeScript estricto**: No usar `any`
- **Barrel exports**: Usar `index.ts` para exportar
- **Nombres**: PascalCase para componentes, camelCase para funciones
- **Imports**: Usar alias `@/` para imports desde `src/`

## 🐛 Debugging

### Ver peticiones API
Abre DevTools → Network para ver todas las peticiones.

### Ver estado de Zustand
Instala React DevTools para inspeccionar stores.

### Logs del servidor
```bash
docker-compose logs -f frontend
```

## 🔄 Flujo de Trabajo

1. Crear feature o componente
2. Agregar tipos en `types/`
3. Crear mocks si es necesario
4. Implementar servicio API
5. Crear hooks personalizados
6. Implementar componentes
7. Agregar a páginas

## 📚 Recursos

- [React Router](https://reactrouter.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Laravel Sanctum](https://laravel.com/docs/sanctum)

