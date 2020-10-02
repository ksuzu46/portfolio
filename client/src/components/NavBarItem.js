/**
 * NavBarItem.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React from "react";
import { Link } from "react-router-dom"
import { Nav } from "react-bootstrap";
import { animateScroll as scroll, Link as ScrollLink } from "react-scroll";
import { capitalize, getBaseURI, removeSlash } from "../lib";
import config from "../../config"
import {Redirect} from "react-router";

const NavBarItem = ({ child, setExpanded, path }) =>
{
    const { blogUrl } = config;
    const scrollLink = (child) => (
        <ScrollLink
            className="nav-link"
            activeClass="active"
            onSetActive={ setExpanded }
            to={ child }
            spy={ true }
            smooth={ true }
            offset={ -140 }
            duration={ 700 }
            delay={ 0 }
            isDynamic={ true }>
            { capitalize(child) }
        </ScrollLink>
    );
    
    const link = (to, child) => (
        <a
            className="nav-link"
            href={to}>
            {capitalize(child)}
        </a>
    )
    
    return (
        <Nav.Item className="nav-item">
            { child === 'blog' ? link(blogUrl, child) : scrollLink(child) }
        </Nav.Item>
    )
};

export default NavBarItem;