// CreateClasse.js
import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { createClass, fetchTypes } from "../../http/ItemAPI";

const CreateClasse = observer(({ show, onHide }) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
      }, [device])

    const addClass = async () => {
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('typeId', device.selectedType.id)
            createClass(formData).then(data => onHide())
        } catch (error) {
            console.error("Error adding class: ", error);
        }
    }

    return (
        <Modal
          show={show}
          onHide={onHide}
          size="lg"
          centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Добавить класс
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item onClick={() => device.setSelectedType(type)} key={type.id}>{type.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Введите название класса"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addClass}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateClasse;
