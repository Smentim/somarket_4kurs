import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchAmmoInfos, fetchOnItem } from "../http/ItemAPI";

const DevicePage = () => {
    const [item, setItem] = useState({info: []})
    const [ammoInfos, setAmmoInfos] = useState([]);
    const {id} = useParams()

    useEffect(() => {
        // Функция для загрузки данных об элементе
        const fetchItemData = async () => {
            try {
                const itemData = await fetchOnItem(id);
                setItem(itemData);
            } catch (error) {
                console.error('Error fetching item data:', error);
            }
        };

        // Функция для загрузки данных ammo_infos
        const fetchAmmoInfosData = async () => {
            try {
                const ammoInfosData = await fetchAmmoInfos(id); // Предположим, что у вас есть функция fetchAmmoInfos для загрузки данных ammo_infos
                setAmmoInfos(ammoInfosData);
                console.log(ammoInfos);
            } catch (error) {
                console.error('Error fetching ammo_infos data:', error);
            }
        };

        fetchItemData();
        fetchAmmoInfosData();
    }, [id]);
    return (
        <Container className="mt-3">
            <Row>
                <Col md={2}>
                    <Image width={150} height={150} src={process.env.REACT_APP_API_URL + item.img} />
                </Col>
                <Col md={10}>
                    <hr></hr>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>

                    {/* Вывод характеристик ammo_infos */}
                    {ammoInfos.length > 0 && (
                        <div>
                            <h4>Характеристики</h4>
                            <ul>
                                {ammoInfos.map(ammoInfo => (
                                    <li key={ammoInfo.id}>
                                        <strong>Тип боеприпаса:</strong> {item.ammoInfo.type_ammo}<br />
                                        <strong>Пробивание:</strong> {ammoInfo.breaking_throught}<br />
                                        <strong>Урон:</strong> {ammoInfo.damage}<br />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default DevicePage;