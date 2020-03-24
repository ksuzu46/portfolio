/**
 * NavBarItem.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React from "react";
import { Nav, NavLink } from "react-bootstrap";
import { capitalize } from "../lib";


const NavBarItem = ({ child, ind, handleScroll }) => (
    <Nav.Item className='mx-0 mx-lg-1 py-3 px-0'>
        <Nav.Link
            href={ `#${ child }` }
            className="px-lg-3 rounded">
            { capitalize(child) }
        </Nav.Link>
    </Nav.Item>
);

export default NavBarItem;