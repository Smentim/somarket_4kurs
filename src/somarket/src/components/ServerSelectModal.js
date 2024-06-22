// src/components/ServerSelectModal.js
import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ServerSelectModal = ({ show, handleClose }) => {
  const navigate = useNavigate();

  const servers = [
    { id: 'ru-1', name: 'RU-1' },
    { id: 'ru-2', name: 'RU-2' },
    { id: 'ru-3', name: 'RU-3' },
    { id: 'eu-1', name: 'EU-1' },
    { id: 'us-1', name: 'US-1' },
  ];

  const handleServerClick = (serverId) => {
    navigate(`/shop/${serverId}`);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-dark text-light">
        <Modal.Title>Выберите сервер</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-light">
        <ListGroup>
          {servers.map(server => (
            <ListGroup.Item key={server.id} action onClick={() => handleServerClick(server.id)} className="bg-dark text-light">
              {server.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
};

export default ServerSelectModal;
