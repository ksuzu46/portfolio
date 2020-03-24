/**
 * Divider.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import { Button, Container } from "react-bootstrap";


const Divider = ({ child }) =>
    (
        <Container>
            <div className="divider">
                <div className="divider-line"/>
                <div className="divider-icon">
                    <Link
                        className="fas fa-x fa-chevron-down"
                        activeClass="active"
                        to={ child }
                        spy={ true }
                        smooth={ true }
                        offset={ -140 }
                        duration={ 500 }
                        isDynamic={ true }>
                    </Link>
                </div>
                <div className="divider-line"/>
            </div>
        </Container>
    );

export default Divider;