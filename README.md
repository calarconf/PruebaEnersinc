# Sistema de Gestión de Personas

Aplicación Full Stack para gestión de personas con CRUD completo.

## Tecnologías

### Backend
- Python 3.8+
- Flask
- PostgreSQL
- SQLAlchemy
- Flask-Migrate

### Frontend
- React 18
- Redux Toolkit
- React Router
- Ant Design
- Axios

## Estructura del Proyecto

```
PruebaTecnica/
├── backend/                 # API REST con Flask
│   ├── app.py              # Aplicación principal
│   ├── models.py           # Modelos de base de datos
│   ├── config.py           # Configuración
│   ├── requirements.txt    # Dependencias Python
│   └── README.md
│
└── frontend/               # Aplicación React
    ├── src/
    │   ├── components/     # Componentes React
    │   ├── services/       # API calls con Axios
    │   └── store/          # Redux store y slices
    ├── package.json
    └── README.md
```

## Instalación y Configuración

### 1. Backend

```bash
cd backend

# Crear entorno virtual
python -m venv venv
.\venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar base de datos
# Crear base de datos en PostgreSQL: CREATE DATABASE personas_db;
# Copiar .env.example a .env y configurar credenciales

# Ejecutar migraciones
flask db init
flask db migrate -m "Initial migration"
flask db upgrade

# Ejecutar servidor
python app.py
```

El backend estará en `http://localhost:5000`

### 2. Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Ejecutar aplicación
npm start
```

El frontend estará en `http://localhost:3000`

## Funcionalidades

### Backend (API REST)
- ✅ GET /api/personas - Listar todas las personas
- ✅ GET /api/personas/:id - Obtener persona por ID
- ✅ POST /api/personas - Crear nueva persona
- ✅ PUT /api/personas/:id - Actualizar persona
- ✅ DELETE /api/personas/:id - Eliminar persona
- ✅ Validaciones en el servidor
- ✅ Manejo de errores con mensajes descriptivos
- ✅ CORS habilitado

### Frontend (React)
- ✅ Tabla con listado de personas
- ✅ Modal para ver detalle de persona
- ✅ Modal con formulario para crear/editar persona
- ✅ Confirmación para eliminar persona
- ✅ Sistema de notificaciones (éxito/error)
- ✅ Validación de formularios
- ✅ Gestión de estado con Redux
- ✅ Navegación con React Router
- ✅ UI responsive con Ant Design

## Modelo de Datos

```sql
Persona:
- id (Integer, PK)
- tipo_documento (String) - CC, CE, TI, PAS, NIT
- documento (String, Unique)
- nombres (String)
- apellidos (String)
- hobbie (String, Opcional)
- created_at (DateTime)
- updated_at (DateTime)
```

## Requisitos de la Prueba Técnica

### Backend ✅
- [x] API en Flask
- [x] Modelo Persona con propiedades requeridas
- [x] Migraciones de base de datos
- [x] PostgreSQL como motor de base de datos
- [x] Endpoints CRUD completo

### Frontend ✅
- [x] Create-react-app
- [x] React Router
- [x] Redux para gestión de estado
- [x] Ant Design para UI
- [x] Axios para consumo de API
- [x] Tabla con listado de personas
- [x] Acciones: Ver, Agregar, Editar, Eliminar
- [x] CRUD completo funcional
- [x] Componente de notificaciones para mensajes

## Notas Adicionales

- La API utiliza respuestas JSON con estructura consistente: `{ success, message, data }`
- El frontend incluye manejo de loading states y errores
- Validaciones tanto en frontend como backend
- Documentos únicos por persona
- Timestamps automáticos para auditoría
