/**
 * Divider.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React from "react";
import { Link } from "react-scroll";
import { Container } from "react-bootstrap";


const Divider = ({ children, index }) =>
{
    const isBottom = index >= children.length - 2;
    const child = children[isBottom ? 0 : index + 1];
    
    return (
        <Container>
            <div className="divider">
                <div className="divider-line"/>
            </div>
        </Container>
    );
}

export default Divider;