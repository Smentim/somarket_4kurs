import React, { useContext, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const click = async () => {
        try {
            let data;
        if (isLogin) {
            data = await login(email, password)
        } else {
            data = await registration(email, password)
        }
        user.setUser(user)
        user.setIsAuth(true)
        history(MAIN_ROUTE)
        } catch(e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-4"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between align-items-center mt-3">
                        {isLogin ? 
                            <Col className="pl-0">
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
                            </Col>
                            :
                            <Col className="pl-0">
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </Col>
                        }
                        {isLogin ? 
                            <Col className="d-flex justify-content-end pr-0">
                                <Button variant="outline-success" onClick={click}>Войти</Button>
                            </Col>
                            :
                            <Col className="d-flex justify-content-end pr-0">
                                <Button variant="outline-success" onClick={click}>Зарегистрироваться</Button>
                            </Col>
                        }
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;