/**
 * About.js
 * @author [Keisuke Suzuki](https://github.com/ksuzu46)
 */

import React from "react";
import { Container } from "react-bootstrap";
import { Element } from "react-scroll";
import config from "../../../config.js";
import jpConfig from "../../../jpConfig";
import Icons from "../Icons";
import ghAvatar from "../../../assets/images/gh_avatar.png"


const About = ({ ghData, language }) =>
{
    return (
        <Element name="about" className="about">
            <Container>
                <div className="about-avatar">
                    <img
                        src={ ghAvatar }
                        alt=""
                    />
                </div>
                <h1 className="about-heading">{ language === 'en' ? config.myName : jpConfig.myName }</h1>
                <Icons
                    parent="about"
                    ghData={ ghData }
                />
                <p className="about-text">{ language === 'en' ? config.aboutMe : jpConfig.aboutMe }</p>
            </Container>
        </Element>
    )
};

export default About;