import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import { addItemToStorage, searchItemByName } from '../../http/ItemAPI';
import { Context } from '../../index';
import { check } from '../../http/userAPI';
import ServerSelectModal from '../ServerSelectModal';

const SellItemModal = ({ show, handleClose, handleSell, serverId }) => {
    const { user } = useContext(Context);

    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [itemImagePath, setItemImagePath] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await check();
                if (userData) {
                    setUserId(userData.userId);
                } else {
                    // Обработка ситуации, если данные не загрузились
                    console.error('Данные пользователя не загружены');
                }
            } catch (error) {
                console.error('Ошибка при загрузке данных пользователя:', error);
            }
        };
        
        fetchUserData();
    }, []);

    const handleSearch = async (name) => {
        if (!name) {
            setSearchResults([]);
            return;
        }

        try {
            const items = await searchItemByName(name);
            setSearchResults(items.slice(0, 5)); // Ограничиваем результаты до 5
        } catch (error) {
            console.error('Ошибка при поиске предмета:', error);
        }
    };

    const handleSelectItem = (item) => {
        setItemName(item.name);
        setItemImagePath(item.img);
        setSelectedItem(item); // Устанавливаем выбранный предмет
        setSearchResults([]); // Закрываем список результатов поиска
    };

    const handleSellClick = async () => {
        try {
            if (!selectedItem) {
                throw new Error('Пожалуйста, выберите предмет для продажи.');
            }
    
            if (!price || !quantity) {
                throw new Error('Пожалуйста, заполните цену и количество для продажи.');
            }
    
            await addItemToStorage({ userId, itemId: selectedItem.id, price, quantity, typeId: selectedItem.typeId, classId: selectedItem.classId, server: serverId });
            handleClose();
        } catch (error) {
            console.error('Ошибка при выставлении предмета на продажу:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Выставить товар на продажу</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formItemName">
                        <Form.Label>Название предмета</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите название предмета"
                            value={itemName}
                            onChange={(e) => {
                                setItemName(e.target.value);
                                handleSearch(e.target.value);
                            }}
                        />
                        {searchResults.length > 0 && (
                            <ListGroup>
                                {searchResults.map(item => (
                                    <ListGroup.Item
                                        key={item.id}
                                        action
                                        onClick={() => handleSelectItem(item)}
                                    >
                                        {item.name}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </Form.Group>
                    {itemImagePath && <img src={process.env.REACT_APP_API_URL + itemImagePath} alt={itemName} />}
                    <Form.Group controlId="formPrice">
                        <Form.Label>Цена за единицу</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Введите цену"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formQuantity">
                        <Form.Label>Количество</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Введите количество"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={handleSellClick}>
                    Выставить на продажу
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SellItemModal;
