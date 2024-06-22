import React, { useState } from 'react';
import { Card, Col, Image, Button, Row, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/consts';

const ItemItem = ({ device, serverId }) => {
    const navigate = useNavigate();
    const [isBuying, setIsBuying] = useState(false);
    const formattedServerId = serverId.serverId.replace('-', '');

    const userNickname = device.user[formattedServerId];

    const handleBuyClick = () => {
        setIsBuying(true);
    };

    const handleCancelClick = () => {
        setIsBuying(false);
    };

    return (
        <Col md={12}>
            <Card id='cardItem' style={{ cursor: 'pointer', marginBottom: '10px', padding: '10px', fontSize: '14px' }} border="light">
                {!isBuying ? (
                    <>
                        <Row className="h-100" style={{ marginRight: 0, marginLeft: 0 }}>
                            <Col md={3} className="h-100 d-flex align-items-center justify-content-center" style={{ paddingRight: 0, paddingLeft: 0 }}>
                                <Image
                                    src={process.env.REACT_APP_API_URL + device.item.img}
                                    fluid
                                    style={{ maxHeight: '100%', width: 'auto' }}
                                    onClick={() => navigate(DEVICE_ROUTE + '/' + device.item.id)}
                                />
                            </Col>
                            <Col md={6} className="d-flex align-items-center">
                                <div>
                                    <div>{"Название: " + device.item.name}</div>
                                    <div>{"Цена за единицу: " + device.price}</div>
                                    <div>{"Количество: " + device.quantity}</div>
                                </div>
                            </Col>
                            <Col md={3} className="d-flex align-items-center justify-content-center">
                                <Button variant="primary" onClick={handleBuyClick}>Купить</Button>
                            </Col>
                        </Row>
                        <hr style={{ margin: '10px 0' }} />
                        <Row className="d-flex justify-content-center">
                            <div>{"  " + userNickname}</div>
                        </Row>
                    </>
                ) : (
                    <>
                        <Row className="h-100" style={{ marginRight: 0, marginLeft: 0 }}>
                            <Col md={12}>
                                <div style={{ marginBottom: '5px' }}>Скопируйте сообщение ниже:</div>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    defaultValue={`@${userNickname} Привет. Хочу купить: "${device.item.name}" за ${device.price} рублей (somarket)`}
                                    style={{ fontSize: '14px' }}
                                />
                            </Col>
                        </Row>
                        <hr style={{ margin: '10px 0' }} />
                        <Row className="d-flex justify-content-center">
                            <Button variant="outline-danger" size="sm" onClick={handleCancelClick} style={{ width: 'auto', margin: '5 auto' }}>Закрыть</Button>
                        </Row>
                    </>
                )}
            </Card>
        </Col>
    );
};

export default ItemItem;
