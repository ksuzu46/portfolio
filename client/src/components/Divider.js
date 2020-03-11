/**
 * Divider.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React from "react";
import { Button } from "react-bootstrap";


const Divider = () =>
    (
        <div className="divider">
            <div className="divider-line"/>
            <div className="divider-icon">
                <Button className="divider-button">
                    <i className="fas fa-x fa-chevron-down"/>
                </Button>
            </div>
            <div className="divider-line"/>
        </div>
    );

export default Divider;