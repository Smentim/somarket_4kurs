import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateClasse from "../components/modals/CreateClasse";
import CreateItem from "../components/modals/CreateItem";
import CreateType from "../components/modals/CreateType";

const Admin = () => {
    const [classeVisible, setClasseVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [itemVisible, setItemVisible] = useState(false);

    return (
        <Container className="d-flex flex-column">
            <Button variant="dark" className="mt-2" onClick={() => setTypeVisible(true)}>Добавить тип</Button>
            <Button variant="dark" className="mt-2" onClick={() => setClasseVisible(true)}>Добавить класс</Button>
            <Button variant="dark" className="mt-2" onClick={() => setItemVisible(true)}>Добавить предмет</Button>
            <CreateClasse show={classeVisible} onHide={() => setClasseVisible(false)} />
            <CreateItem show={itemVisible} onHide={() => setItemVisible(false)} />
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
        </Container>
    );
};

export default Admin;
