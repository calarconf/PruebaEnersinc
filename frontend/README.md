# Frontend - Aplicación React

Aplicación web para gestión de personas desarrollada con React, Redux, React Router y Ant Design.

## Requisitos

- Node.js 14+
- npm o yarn

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
   - El archivo `.env` ya está configurado para desarrollo local
   - Modificar si es necesario la URL de la API

## Ejecutar aplicación

```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## Características

- ✅ Listado de personas en tabla
- ✅ Crear nueva persona
- ✅ Ver detalle de persona
- ✅ Editar persona existente
- ✅ Eliminar persona con confirmación
- ✅ Sistema de notificaciones para mensajes de éxito y error
- ✅ Validación de formularios
- ✅ Gestión de estado con Redux Toolkit
- ✅ Navegación con React Router
- ✅ UI con Ant Design

## Estructura del proyecto

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── PersonasList.js    # Tabla principal
│   │   ├── PersonaForm.js     # Formulario crear/editar
│   │   └── PersonaDetail.js   # Vista detalle
│   ├── services/
│   │   └── api.js             # Configuración Axios
│   ├── store/
│   │   ├── store.js           # Configuración Redux
│   │   └── personasSlice.js   # Slice de personas
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

## Scripts disponibles

- `npm start` - Inicia servidor de desarrollo
- `npm build` - Genera build de producción
- `npm test` - Ejecuta tests
- `npm eject` - Expone configuración de webpack
