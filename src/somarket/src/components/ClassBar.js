import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import { Card, Col, Row } from "react-bootstrap";

const ClassBar = observer(() => {
    const {device} = useContext(Context) 
    return (
        <Row className="d-flex flex-wrap">
            {device.classes
                .filter(classe => classe.typeId === device.selectedType.id) // Фильтруем классы по выбранному типу
                .map(classe => (
                    <Col key={classe.id} xs="auto" className="mb-3">
                        <Card
                            style={{ cursor: 'pointer', minWidth: '150px' }}
                            className={`p-3`}
                            onClick={() => device.setSelectedClass(classe)}
                            border={classe.id === device.selectedClass.id ? 'danger' : 'light'}
                        >
                            {classe.name}
                        </Card>
                    </Col>
                ))}
        </Row>
    );
});

export default ClassBar;