/**
 * About.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React from "react";
import { Container } from "react-bootstrap";
import config from "../../config.js";
import Icons from "./Icons";
import Divider from "./Divider";


const About = React.forwardRef(({ ghData, scrollToContact }, ref) =>
{
    const { myName, aboutMe, linkedinUrl, myGmail, where } = config;
    return (
        <>
            <Container ref={ ref } className="about">
                <img
                    className="about-avatar"
                    src={ ghData.avatarUrl }
                    alt=""
                />
                <h1 className="about-heading">{ myName }</h1>
                <div className="about-where">{ where }</div>
                <Icons
                    parent="about"
                    ghData={ ghData }
                    scrollToContact={ scrollToContact }
                />
                <p className="about-text">{ aboutMe }</p>
            </Container>
            <Divider/>
        </>
    )
});

export default About;