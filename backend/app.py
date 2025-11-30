from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config
from models import db, Persona

app = Flask(__name__)
app.config.from_object(Config)

# Configurar CORS
CORS(app)

# Inicializar extensiones
db.init_app(app)
migrate = Migrate(app, db)

# Manejo de errores
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Recurso no encontrado'}), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return jsonify({'error': 'Error interno del servidor'}), 500

# Rutas de la API

@app.route('/api/personas', methods=['GET'])
def get_personas():
    """Obtener todas las personas"""
    try:
        personas = Persona.query.all()
        return jsonify({
            'success': True,
            'message': 'Personas obtenidas exitosamente',
            'data': [persona.to_dict() for persona in personas]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error al obtener personas: {str(e)}'
        }), 500

@app.route('/api/personas/<int:id>', methods=['GET'])
def get_persona(id):
    """Obtener una persona por ID"""
    try:
        persona = Persona.query.get(id)
        if not persona:
            return jsonify({
                'success': False,
                'message': 'Persona no encontrada'
            }), 404
        
        return jsonify({
            'success': True,
            'message': 'Persona obtenida exitosamente',
            'data': persona.to_dict()
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error al obtener persona: {str(e)}'
        }), 500

@app.route('/api/personas', methods=['POST'])
def create_persona():
    """Crear una nueva persona"""
    try:
        data = request.get_json()
        
        # Validar campos requeridos
        required_fields = ['tipo_documento', 'documento', 'nombres', 'apellidos']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({
                    'success': False,
                    'message': f'El campo {field} es requerido'
                }), 400
        
        # Verificar si el documento ya existe
        existing_persona = Persona.query.filter_by(documento=data['documento']).first()
        if existing_persona:
            return jsonify({
                'success': False,
                'message': 'Ya existe una persona con ese número de documento'
            }), 400
        
        # Crear nueva persona
        nueva_persona = Persona(
            tipo_documento=data['tipo_documento'],
            documento=data['documento'],
            nombres=data['nombres'],
            apellidos=data['apellidos'],
            hobbie=data.get('hobbie', '')
        )
        
        db.session.add(nueva_persona)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Persona creada exitosamente',
            'data': nueva_persona.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': f'Error al crear persona: {str(e)}'
        }), 500

@app.route('/api/personas/<int:id>', methods=['PUT'])
def update_persona(id):
    """Actualizar una persona existente"""
    try:
        persona = Persona.query.get(id)
        if not persona:
            return jsonify({
                'success': False,
                'message': 'Persona no encontrada'
            }), 404
        
        data = request.get_json()
        
        # Validar campos requeridos
        required_fields = ['tipo_documento', 'documento', 'nombres', 'apellidos']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({
                    'success': False,
                    'message': f'El campo {field} es requerido'
                }), 400
        
        # Verificar si el documento ya existe en otra persona
        if data['documento'] != persona.documento:
            existing_persona = Persona.query.filter_by(documento=data['documento']).first()
            if existing_persona:
                return jsonify({
                    'success': False,
                    'message': 'Ya existe una persona con ese número de documento'
                }), 400
        
        # Actualizar campos
        persona.tipo_documento = data['tipo_documento']
        persona.documento = data['documento']
        persona.nombres = data['nombres']
        persona.apellidos = data['apellidos']
        persona.hobbie = data.get('hobbie', '')
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Persona actualizada exitosamente',
            'data': persona.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': f'Error al actualizar persona: {str(e)}'
        }), 500

@app.route('/api/personas/<int:id>', methods=['DELETE'])
def delete_persona(id):
    """Eliminar una persona"""
    try:
        persona = Persona.query.get(id)
        if not persona:
            return jsonify({
                'success': False,
                'message': 'Persona no encontrada'
            }), 404
        
        db.session.delete(persona)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Persona eliminada exitosamente'
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': f'Error al eliminar persona: {str(e)}'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'success': True,
        'message': 'API funcionando correctamente'
    }), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
