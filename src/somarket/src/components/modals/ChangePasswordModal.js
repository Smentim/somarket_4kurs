import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { changePassword } from "../../http/userAPI";

const ChangePasswordModal = ({ show, handleClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Новый пароль и подтверждение пароля не совпадают");
      return;
    }
    try {
      await changePassword(currentPassword, newPassword);
      alert("Пароль успешно изменен");
      handleClose();
    } catch (e) {
      if (e.response && e.response.data) {
        alert(e.response.data.message);
      } else {
        alert("Произошла ошибка при изменении пароля");
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Изменение пароля</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Текущий пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введите текущий пароль"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Новый пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введите новый пароль"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Подтверждение нового пароля</Form.Label>
            <Form.Control
              type="password"
              placeholder="Подтвердите новый пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleChangePassword}>
            Изменить пароль
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ChangePasswordModal;
