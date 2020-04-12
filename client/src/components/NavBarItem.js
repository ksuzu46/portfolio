/**
 * NavBarItem.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React from "react";
import { Link } from "react-router-dom"
import { Nav } from "react-bootstrap";
import { animateScroll as scroll, Link as ScrollLink } from "react-scroll";
import { capitalize, getBaseURI, removeSlash } from "../lib";


const NavBarItem = ({ child, setExpanded, path }) =>
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
    
    const scrollToTop = (child) => (
        <a className="nav-link" onClick={ () =>
        {
            setExpanded()
            scroll.scrollToTop();
        } }>
            { capitalize(child) }
        </a>
    );
    
    const link = (to, child) => (
        <Link
            to={ child === 'home' ? '/' : to }
            className="nav-link"
            onClick={ () => {
                scroll.scrollToTop();
                setExpanded()
            } }>
            { capitalize(child) }
        </Link>
    )
    
    return (
        <Nav.Item className="nav-item">
            {
                path === '/' ? (
                    child === 'blog' ?
                    link(`/${ child }`, child) : scrollLink(child)
                ) : (
                    child === removeSlash(getBaseURI(path)) ?
                    scrollToTop(child) : link(`/${ child }`, child)
                )
            }
        </Nav.Item>)
};

export default NavBarItem;