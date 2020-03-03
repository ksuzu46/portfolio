/**
 * Footer.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */


import React from "react";
import config from "../../config"
import Icons from "./Icons";
import { Container } from "react-bootstrap";


const Footer = ({ projectData }) => (
    <Container className="footer">
        <Icons projectData={ projectData } parent="footer"/>
        <div className="copyright">
            &copy; 2020 { config.myName }
        </div>
    </Container>
);

export default Footer;