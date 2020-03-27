/**
 * NavBarItem.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React from "react";
import { Link } from "react-router-dom"
import { Nav, NavLink } from "react-bootstrap";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { capitalize, convertRem2Pix } from "../lib";


const NavBarItem = ({ child, setExpanded, blogPage }) =>
{
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
        <Link
            to={ to }
            className="nav-link"
            onClick={ () => setExpanded }>
            { capitalize(child) }
        </Link>
    )
    
    return (
        <Nav.Item className="mx-0 mx-lg-1 py-3 px-0 px-lg-3 rounded">
            {
                blogPage ? (
                    child === 'home' ?
                    link('/', child) : scrollLink(child)
                ) : (
                    child === 'blog' ?
                    link("/blog", child) : scrollLink(child)
                )
            }
        </Nav.Item>)
};

export default NavBarItem;