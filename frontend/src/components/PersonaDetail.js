import React from 'react';
import { Descriptions, Tag } from 'antd';
import { 
  UserOutlined, 
  IdcardOutlined, 
  SmileOutlined,
  CalendarOutlined 
} from '@ant-design/icons';

const PersonaDetail = ({ persona }) => {
  if (!persona) return null;

  const getTipoDocumentoLabel = (tipo) => {
    const tipos = {
      'CC': 'Cédula de Ciudadanía',
      'CE': 'Cédula de Extranjería',
      'TI': 'Tarjeta de Identidad',
      'PAS': 'Pasaporte',
      'NIT': 'NIT',
    };
    return tipos[tipo] || tipo;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Descriptions bordered column={1} size="middle">
      <Descriptions.Item 
        label={<span><IdcardOutlined /> Tipo de Documento</span>}
      >
        <Tag color="blue">{getTipoDocumentoLabel(persona.tipo_documento)}</Tag>
      </Descriptions.Item>
      
      <Descriptions.Item 
        label={<span><IdcardOutlined /> Número de Documento</span>}
      >
        <strong>{persona.documento}</strong>
      </Descriptions.Item>
      
      <Descriptions.Item 
        label={<span><UserOutlined /> Nombres</span>}
      >
        {persona.nombres}
      </Descriptions.Item>
      
      <Descriptions.Item 
        label={<span><UserOutlined /> Apellidos</span>}
      >
        {persona.apellidos}
      </Descriptions.Item>
      
      <Descriptions.Item 
        label={<span><SmileOutlined /> Hobbie</span>}
      >
        {persona.hobbie || 'No especificado'}
      </Descriptions.Item>
      
      <Descriptions.Item 
        label={<span><CalendarOutlined /> Fecha de Creación</span>}
      >
        {formatDate(persona.created_at)}
      </Descriptions.Item>
      
      <Descriptions.Item 
        label={<span><CalendarOutlined /> Última Actualización</span>}
      >
        {formatDate(persona.updated_at)}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default PersonaDetail;
