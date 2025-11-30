import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Select, Button, Space } from 'antd';
import { createPersona, updatePersona } from '../store/personasSlice';

const { Option } = Select;

const PersonaForm = ({ persona, mode, onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.personas);

  useEffect(() => {
    if (mode === 'edit' && persona) {
      form.setFieldsValue(persona);
    } else {
      form.resetFields();
    }
  }, [mode, persona, form]);

  const handleSubmit = async (values) => {
    try {
      if (mode === 'create') {
        await dispatch(createPersona(values)).unwrap();
      } else {
        await dispatch(updatePersona({ id: persona.id, persona: values })).unwrap();
      }
      form.resetFields();
      onSuccess();
    } catch (error) {
      // El error se maneja en el slice y se muestra en la notificación
      console.error('Error en el formulario:', error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="Tipo de Documento"
        name="tipo_documento"
        rules={[
          { required: true, message: 'Por favor seleccione el tipo de documento' },
        ]}
      >
        <Select placeholder="Seleccione tipo de documento">
          <Option value="CC">Cédula de Ciudadanía</Option>
          <Option value="CE">Cédula de Extranjería</Option>
          <Option value="TI">Tarjeta de Identidad</Option>
          <Option value="PAS">Pasaporte</Option>
          <Option value="NIT">NIT</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Número de Documento"
        name="documento"
        rules={[
          { required: true, message: 'Por favor ingrese el número de documento' },
          { 
            pattern: /^[a-zA-Z0-9]+$/, 
            message: 'Solo se permiten letras y números' 
          },
        ]}
      >
        <Input placeholder="Ingrese número de documento" />
      </Form.Item>

      <Form.Item
        label="Nombres"
        name="nombres"
        rules={[
          { required: true, message: 'Por favor ingrese los nombres' },
          { min: 2, message: 'Los nombres deben tener al menos 2 caracteres' },
        ]}
      >
        <Input placeholder="Ingrese nombres" />
      </Form.Item>

      <Form.Item
        label="Apellidos"
        name="apellidos"
        rules={[
          { required: true, message: 'Por favor ingrese los apellidos' },
          { min: 2, message: 'Los apellidos deben tener al menos 2 caracteres' },
        ]}
      >
        <Input placeholder="Ingrese apellidos" />
      </Form.Item>

      <Form.Item
        label="Hobbie"
        name="hobbie"
        rules={[
          { max: 200, message: 'El hobbie no puede exceder 200 caracteres' },
        ]}
      >
        <Input.TextArea 
          placeholder="Ingrese hobbie (opcional)" 
          rows={3}
          showCount
          maxLength={200}
        />
      </Form.Item>

      <Form.Item>
        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {mode === 'create' ? 'Crear' : 'Actualizar'}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default PersonaForm;
