/**
 * About.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React from "react";
import { Container } from "react-bootstrap";
import { Element } from "react-scroll";
import config from "../../config.js";
import Icons from "./Icons";
import Divider from "./Divider";


const About = ({ ghData }) =>
{
    const { myName, aboutMe, linkedinUrl, myGmail, where } = config;
    return (
        <Element name="about" className="about">
            <Container>
                <div className="about-avatar">
                    <img
                        src={ ghData.avatarUrl }
                        alt=""/>
                </div>
                <h1 className="about-heading">{ myName }</h1>
                <div className="about-where">{ where }</div>
                <Icons
                    parent="about"
                    ghData={ ghData }
                />
                <p className="about-text">{ aboutMe }</p>
            </Container>
        </Element>
    )
};

export default About;