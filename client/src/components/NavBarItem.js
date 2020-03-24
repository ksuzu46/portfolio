/**
 * NavBarItem.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React from "react";
import { Nav, NavLink } from "react-bootstrap";
import { Link, animateScroll as scroll } from "react-scroll";
import { capitalize, convertRem2Pix } from "../lib";


const NavBarItem = ({ child, setExpanded }) => (
    <Nav.Item className='mx-0 mx-lg-1 py-3 px-0 px-lg-3 rounded'>
        <Link
            className="nav-link"
            activeClass="active"
            onSetActive={setExpanded}
            to={child}
            spy={true}
            smooth={true}
            offset={-140}
            duration={700}
            delay={0}
            isDynamic={true}>
            { capitalize(child) }
        </Link>
    </Nav.Item>
);

export default NavBarItem;