import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import ServerSelectModal from "../components/ServerSelectModal";

const Main = () => {
    const [modalShow, setModalShow] = useState(false)
    return (
        <div className="home-background">
          <Container className="text-center text-white d-flex flex-column justify-content-center align-items-center vh-100">
            <h1>SO MARKET</h1>
            <h2>УДОБНАЯ ПЛОЩАДКА ДЛЯ ТОРГОВЛИ</h2>
            <p>Для начала выберите свой сервер</p>
            <Button variant="outline-light" className="mt-3" onClick={() => setModalShow(true)}>Выбрать сервер</Button>

            <ServerSelectModal show={modalShow} handleClose={() => setModalShow(false)} />
          </Container>
        </div>
    );
};

export default Main;