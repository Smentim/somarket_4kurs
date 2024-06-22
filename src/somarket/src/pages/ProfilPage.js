import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Image } from 'react-bootstrap';
import './ProfilPage.css';
import ChangePasswordModal from "../components/modals/ChangePasswordModal";
import { Context } from '../index';
import { check, updateNickname } from '../http/userAPI';
import { deleteUserItem, fetchUserItems } from '../http/ItemAPI';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/consts';

const Profile = () => {
    const { user } = useContext(Context);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [nicknames, setNicknames] = useState({
        ru3: '',
        ru2: '',
        ru1: '',
        eu1: '',
        us1: ''
    });
    const [items, setItems] = useState([]);
    const [userData, setUserData] = useState({ id: 0, email: '', role: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await check();
    
                if (user) {
                    const { userId, email, role } = user;
                    setUserData({ id: userId, email, role });
    
                    console.log("Fetched user data:", user);
    
                    // Получение предметов пользователя после установки userData
                    const userItems = await fetchUserItems(userId);
                    setItems(userItems);
    
                    setNicknames({
                        ru3: user.ru3 || '',
                        ru2: user.ru2 || '',
                        ru1: user.ru1 || '',
                        eu1: user.eu1 || '',
                        us1: user.us1 || ''
                    });
                } else {
                    console.error('Ошибка аутентификации пользователя');
                }
            } catch (error) {
                console.error('Ошибка при загрузке данных пользователя:', error);
            }
        };
    
        fetchData();
    }, []);

    const handleOpenChangePasswordModal = () => setShowChangePasswordModal(true);
    const handleCloseChangePasswordModal = () => setShowChangePasswordModal(false);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setNicknames((prevState) => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSaveNicknames = async () => {
        try {
            await updateNickname(userData.id, nicknames);
        } catch (error) {
            console.error('Ошибка при сохранении никнеймов:', error);
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            await deleteUserItem(itemId);
            setItems(items.filter(item => item.id !== itemId));
        } catch (error) {
            console.error('Ошибка при удалении предмета:', error);
        }
    };

    return (
        <>
            <div className="profile-background"></div>
            <Container className="profile-container">
                <h1 className="profile-title">Профиль пользователя</h1>
                <Row className="profile-row">
                    <Col md={6}>
                        <h4>Игровой никнейм:</h4>
                        <Form>
                            {Object.keys(nicknames).map((key) => (
                                <Form.Group className="mb-3" controlId={key} key={key}>
                                    <Form.Label>{key.toUpperCase().replace('_', '-')}:</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Никнейм..." 
                                        value={nicknames[key]} 
                                        onChange={handleInputChange} 
                                    />
                                </Form.Group>
                            ))}
                            <Button variant="primary" onClick={handleSaveNicknames}>Сохранить изменения</Button>
                        </Form>
                    </Col>
                    <Col md={6}>
                        <h4>Ваш email: {userData.email}</h4>
                        <Button variant="dark" className="mb-3" onClick={handleOpenChangePasswordModal}>Изменить пароль</Button>
                        <h4>Роль: {userData.role}</h4>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <h4>Выставленные товары:</h4>
                    {items.map(item => (
                        <React.Fragment key={item.id}>
                            <Row className="h-100" style={{ marginRight: 0, marginLeft: 0 }}>
                                <Col md={3} className="h-100 d-flex align-items-center justify-content-center" style={{ paddingRight: 0, paddingLeft: 0 }}>
                                    <Image
                                        src={process.env.REACT_APP_API_URL + item.item.img}
                                        fluid
                                        style={{ maxHeight: '100%', width: 'auto' }}
                                        onClick={() => navigate(DEVICE_ROUTE + '/' + item.id)}
                                    />
                                </Col>
                                <Col md={6} className="d-flex align-items-center">
                                    <div>
                                        <div>{"Название: " + item.item.name}</div>
                                        <div>{"Цена за единицу: " + item.price}</div>
                                        <div>{"Количество: " + item.quantity}</div>
                                        <div>{"Сервер: " + item.server}</div>
                                    </div>
                                </Col>
                                <Col md={3} className="d-flex align-items-center justify-content-center">
                                    <Button variant="danger" onClick={() => handleDeleteItem(item.id)}>Удалить</Button>
                                </Col>
                            </Row>
                            <hr style={{ margin: '10px 0' }} />
                        </React.Fragment>
                    ))}
                </Row>
                <ChangePasswordModal
                    show={showChangePasswordModal}
                    handleClose={handleCloseChangePasswordModal}
                />
            </Container>
        </>
    );
};

export default Profile;
