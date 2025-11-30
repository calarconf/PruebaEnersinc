# Backend - API REST con Flask

API REST para gestión de personas desarrollada con Flask y PostgreSQL.

## Requisitos

- Python 3.8+
- PostgreSQL 12+
- pip

## Instalación

1. Crear y activar entorno virtual:
```bash
python -m venv venv
.\venv\Scripts\activate  # Windows
```

2. Instalar dependencias:
```bash
pip install -r requirements.txt
```

3. Configurar base de datos:
   - Crear base de datos en PostgreSQL: `CREATE DATABASE personas_db;`
   - Copiar `.env.example` a `.env` y configurar credenciales

4. Inicializar migraciones:
```bash
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

## Ejecutar servidor

```bash
python app.py
```

El servidor estará disponible en `http://localhost:5000`

## Endpoints API

- `GET /api/personas` - Listar todas las personas
- `GET /api/personas/<id>` - Obtener una persona por ID
- `POST /api/personas` - Crear nueva persona
- `PUT /api/personas/<id>` - Actualizar persona
- `DELETE /api/personas/<id>` - Eliminar persona
- `GET /api/health` - Health check

## Estructura del proyecto

```
backend/
├── app.py              # Aplicación principal
├── config.py           # Configuración
├── models.py           # Modelos de base de datos
├── requirements.txt    # Dependencias
├── .env               # Variables de entorno (no incluir en git)
└── migrations/        # Migraciones de base de datos
```
