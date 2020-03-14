/**
 * NavBar.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import config from "../../config";
import NavBarItem from "./NavBarItem";


const { myName } = config;

const NavBar = ({ children, ...props }) =>
{
    const [ expanded, setExpanded ] = useState(false);
    
    return (
        <>
            <Navbar expanded={ expanded } expand="lg" fixed="top">
                <Container>
                    <Nav.Link
                        className="navbar-brand"
                        onClick={ () =>
                        {
                            setExpanded(false);
                            scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                        } }
                    >
                        { myName }
                    </Nav.Link>
                    <Navbar.Toggle
                        onClick={ () => setExpanded(
                            expanded ? false : "expanded") }
                        className="navbar-toggler rounded"
                    >
                        <i className="fas fa-bars"/>
                    </Navbar.Toggle>
                    <Navbar.Collapse
                        onClick={ () => setExpanded(false) }
                    >
                        <Nav className="ml-auto">
                            {
                                children.map((child, ind) =>
                                    <NavBarItem
                                        key={ child }
                                        child={ child }
                                        ind={ ind }
                                        { ...props }
                                    />
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;

