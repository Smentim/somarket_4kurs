import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import ItemItem from "./ItemItem";

const ItemList = observer(( serverId ) => {
    const {device} = useContext(Context)
    return (
        <Row className="d-flex">
            {device.items.map(item =>
                <ItemItem key={item.id} device={item} serverId={serverId}/>
            )}
        </Row>
    );
});

export default ItemList;