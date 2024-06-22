import React, { useContext } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ADMIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = observer(() => {
    const {user} = useContext(Context) 
    const navigate = useNavigate()
    return (
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav.Link style={{fontSize: "24px"}} as={Link} to={MAIN_ROUTE}>SO Market</Nav.Link>
          {user.isAuth ?
            <Nav className="ml-auto">
              <Button 
                variant="dark" 
                onClick={() => {
                  navigate(ADMIN_ROUTE);
                }}
              >
                Админ панель
              </Button>
              <Button 
                variant="dark" 
                onClick={() => navigate(PROFILE_ROUTE)} 
                style={{backgroundColor: "#0d6efd"}}
              >
                Профиль
              </Button>
            </Nav>
            :
            <Nav className="ml-auto">
              <Button variant="dark" style={{backgroundColor: "#0d6efd"}} onClick={() => navigate(REGISTRATION_ROUTE)}>Авторизация</Button>
            </Nav>
          }
        </Container>
      </Navbar>
    );
})

export default NavBar;