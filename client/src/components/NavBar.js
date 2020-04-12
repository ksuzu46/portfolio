/**
 * NavBar.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { animateScroll as scroll } from "react-scroll";
import config from "../../config";
import NavBarItem from "./NavBarItem";
import { useRouteMatch } from "react-router";


const { myName } = config;

const NavBar = ({ children }) =>
{
    const [ expanded, setExpanded ] = useState(false);
    const { path } = useRouteMatch();
    const onClick = () =>
    {
        setExpanded(false);
        scroll.scrollToTop();
    }
    return (
        <>
            {
                children.length === 4 ?
                <>
                    <Navbar expanded={ expanded } expand="lg" fixed="top">
                        <Container>
                            <Nav.Link
                                className="navbar-brand"
                                onClick={ onClick }
                            >
                                { myName }
                            </Nav.Link>
                            <Navbar.Toggle
                                onClick={ () => setExpanded(
                                    expanded ? false : "expanded") }
                                className="navbar-toggler"
                            >
                                <i className="icon-ellipsis-vert"/>
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
                                                path={ path }
                                                setExpanded={ () => setExpanded(
                                                    false) }
                                            />
                                        )
                                    }
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </>
                                      :
                <><Navbar expanded={ expanded } expand="lg" fixed="top">
                    <Container>
                        <Nav.Link
                            className="navbar-brand"
                            onClick={ onClick }
                        >
                            { myName }
                        </Nav.Link>
                        <Navbar.Toggle
                            onClick={ () => setExpanded(
                                expanded ? false : "expanded") }
                            className="navbar-toggler rounded"
                        >
                            <i className="icon-ellipsis-vert"/>
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
                                            path={ path }
                                            setExpanded={ () => setExpanded(
                                                false) }
                                        />
                                    )
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                </>
            }
        </>
    )
}

export default NavBar;

