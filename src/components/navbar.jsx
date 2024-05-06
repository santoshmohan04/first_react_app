import React from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet } from 'react-router-dom';
import { logoutUser } from "../redux";

function TopHeader() {
  const totalCounters = useSelector(state => state.counters.counter);
  const totaltodo = useSelector(state => state.todos.todos);
  const usrdtls = useSelector(state => state.auth.loggedInUserDetails);

  const dispatch = useDispatch();

  return (
    <>
    <Navbar expand="lg" bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Counter App{" "}
            <span className="badge rounded-pill bg-secondary">
              {totalCounters.length}
            </span></Nav.Link>
          <Nav.Link as={Link} to="/weather">Weather App</Nav.Link>
          <Nav.Link as={Link} to="/vatavaran">Vatavaran</Nav.Link>
          <Nav.Link as={Link} to="/todo"> To Do List{" "}
            <span className="badge rounded-pill bg-secondary">
              {totaltodo.length}
            </span></Nav.Link>
        </Nav>
        <Nav className="justify-content-end">
        <Navbar.Text>
        <i className="bi bi-person-circle"></i> 
          </Navbar.Text>
          <NavDropdown title={ usrdtls.email } id="basic-nav-dropdown" drop="down">
          <NavDropdown.Item as={Link} to="/weather">
          <i className="bi bi-bag-check"></i> Cart
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/weather">
          <i className="bi bi-gear"></i> Settings
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => {dispatch(logoutUser())}}>
          <i className="bi bi-box-arrow-in-right"></i> Logout
          </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
     <main className="container-fluid">
      <Outlet />
     </main>
     </>
  );
}

export default TopHeader;
