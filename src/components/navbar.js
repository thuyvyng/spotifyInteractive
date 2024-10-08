import React from "react";
import { Nav, Navbar } from "react-bootstrap";

export default function Navigation() {
  return (
    <Navbar expand="lg">
      <Navbar.Brand href="/">unpaws the music</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Nav.Link style={{ color: "#f7ede2" }} href="/userstats">
            purrsona
          </Nav.Link>
          <Nav.Link style={{ color: "#f7ede2" }} href="/combineplaylists">
            concat playlists
          </Nav.Link>
          <Nav.Link style={{ color: "#f7ede2" }} href="/developers">
            about
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
