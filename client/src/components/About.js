/**
 * About.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React, { useRef } from "react";
import { Container, Media } from "react-bootstrap";
import config from "../../config.js";
import Icons from "./Icons";


const About = React.forwardRef(({ projectData, scrollToContact }, ref) =>
{
    const { myName, aboutMe, linkedinUrl, myGmail, where } = config;
    return (
        <Container ref={ ref } className="about">
            <img
                className="about-avatar"
                src={ projectData.avatarUrl }
                alt=""
            />
            <h1 className="about-heading">{ myName }</h1>
            <div className="about-where">{ where }</div>
            <Icons
                parent="about"
                projectData={ projectData }
                scrollToContact={scrollToContact}
            />
            <p className="about-text">{ aboutMe }</p>
        </Container>
    )
});

export default About;