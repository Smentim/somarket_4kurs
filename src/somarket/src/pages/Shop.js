import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import ClassBar from "../components/ClassBar";
import ItemList from "../components/ItemList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchClasses, fetchItem, fetchStorageItems, fetchTypes, searchItemByName } from "../http/ItemAPI";
import Pages from "../components/Pages";
import '../App.css';
import SellItemModal from "../components/modals/SellItemModal";
import { useNavigate, useParams } from "react-router-dom";

const Shop = observer(() => {
  const {user, device} = useContext(Context);
  const navigate = useNavigate();
  const { serverId } = useParams();
  const [showModal, setShowModal] = useState(false);

  const handleSellItem = async () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const typesData = await fetchTypes();
            device.setTypes(typesData);

            const classesData = await fetchClasses();
            device.setClasses(classesData);

            const storageItemsData = await fetchStorageItems(serverId, device.selectedType.id, device.selectedClass.id, device.page, 5);
            device.setItems(storageItemsData.rows);
            device.setTotalCount(storageItemsData.count);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, [device.selectedType, device.selectedClass, device.page, serverId]);

  return (
      <Container>
          <Row className="mt-2">
            <Col md={3}>
              <TypeBar />
            </Col>
            <Col md={9}>
              <ClassBar />
              <ItemList serverId={serverId} />
              <Pages />
            </Col>
          </Row>
          <Button variant="primary" onClick={() => setShowModal(true)} style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
              <i className="fas fa-plus"></i> Выставить на продажу
          </Button>
          <SellItemModal show={showModal} handleClose={() => setShowModal(false)} handleSell={handleSellItem} serverId={serverId} />
      </Container>
  );
});

export default Shop;