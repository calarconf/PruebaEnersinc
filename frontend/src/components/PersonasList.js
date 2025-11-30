import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Space, Modal, notification } from 'antd';
import { 
  EyeOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  PlusOutlined,
  ExclamationCircleOutlined 
} from '@ant-design/icons';
import {
  fetchPersonas,
  deletePersona,
  clearLastAction,
} from '../store/personasSlice';
import PersonaForm from './PersonaForm';
import PersonaDetail from './PersonaDetail';

const { confirm } = Modal;

const PersonasList = () => {
  const dispatch = useDispatch();
  const { items: personas, loading, lastAction } = useSelector((state) => state.personas);
  
  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [formMode, setFormMode] = useState('create'); // 'create' o 'edit'

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    dispatch(fetchPersonas());
  }, [dispatch]);

  // Mostrar notificaciones basadas en lastAction
  useEffect(() => {
    if (lastAction) {
      if (lastAction.success) {
        api.success({
          message: 'Operación exitosa',
          description: lastAction.message,
          placement: 'topRight',
        });
      } else {
        api.error({
          message: 'Error',
          description: lastAction.message,
          placement: 'topRight',
        });
      }
      dispatch(clearLastAction());
    }
  }, [lastAction, api, dispatch]);

  const columns = [
    {
      title: 'Tipo Documento',
      dataIndex: 'tipo_documento',
      key: 'tipo_documento',
      width: 150,
    },
    {
      title: 'Documento',
      dataIndex: 'documento',
      key: 'documento',
      width: 150,
    },
    {
      title: 'Nombres',
      dataIndex: 'nombres',
      key: 'nombres',
    },
    {
      title: 'Apellidos',
      dataIndex: 'apellidos',
      key: 'apellidos',
    },
    {
      title: 'Hobbie',
      dataIndex: 'hobbie',
      key: 'hobbie',
    },
    {
      title: 'Acciones',
      key: 'acciones',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            ghost
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            Ver
          </Button>
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Editar
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  const handleView = (persona) => {
    setSelectedPersona(persona);
    setIsDetailModalVisible(true);
  };

  const handleEdit = (persona) => {
    setSelectedPersona(persona);
    setFormMode('edit');
    setIsFormModalVisible(true);
  };

  const handleDelete = (persona) => {
    confirm({
      title: '¿Está seguro de eliminar esta persona?',
      icon: <ExclamationCircleOutlined />,
      content: `${persona.nombres} ${persona.apellidos} - ${persona.documento}`,
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        dispatch(deletePersona(persona.id));
      },
    });
  };

  const handleAdd = () => {
    setSelectedPersona(null);
    setFormMode('create');
    setIsFormModalVisible(true);
  };

  const handleFormSuccess = () => {
    setIsFormModalVisible(false);
    setSelectedPersona(null);
    dispatch(fetchPersonas());
  };

  const handleFormCancel = () => {
    setIsFormModalVisible(false);
    setSelectedPersona(null);
  };

  return (
    <div style={{ padding: '24px' }}>
      {contextHolder}
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Gestión de Personas</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          size="large"
        >
          Agregar Persona
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={personas}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} personas`,
        }}
        bordered
      />

      <Modal
        title={formMode === 'create' ? 'Agregar Nueva Persona' : 'Editar Persona'}
        open={isFormModalVisible}
        onCancel={handleFormCancel}
        footer={null}
        width={600}
        destroyOnClose
      >
        <PersonaForm
          persona={selectedPersona}
          mode={formMode}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      </Modal>

      <Modal
        title="Detalle de Persona"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
            Cerrar
          </Button>,
        ]}
        width={600}
      >
        <PersonaDetail persona={selectedPersona} />
      </Modal>
    </div>
  );
};

export default PersonasList;
