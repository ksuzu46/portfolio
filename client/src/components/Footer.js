/**
 * Footer.js
 * @author [Keisuke Suzuki](https://github.com/ksuzu46)
 */


import React from "react";
import config from "../../config"
import Icons from "./Icons";
import { Container } from "react-bootstrap";


const Footer = ({ ghData }) => (
    <Container>
        <div className="footer">
            <Icons ghData={ ghData } parent="footer"/>
            <div className="copyright">
                &copy; 2020 { config.myName }
            </div>
        </div>
    </Container>
);

export default Footer;