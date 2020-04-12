import React from "react";
import config from "../../config";
import { scroller } from "react-scroll";
import { Col } from "react-bootstrap";


const { linkedinUrl, myGmail } = config;

const Icons = ({ ghData, parent, scrollToContact }) =>
{
    return (
        <div className={ `${ parent }-icons` }>
            <a
                className={ `${ parent }-social` }
                href={ linkedinUrl }
                aria-label="linkedin">
                <i className="icon-linkedin-squared"/>
            </a>
            <a
                className={ `${ parent }-social` }
                href={ ghData.url }
                aria-label="github">
                <i className="icon-github-squared"/>
            </a>
            <a
                className={ `${ parent }-social` }
                onClick={ () => scroller.scrollTo('contact', {
                    duration: 750,
                    offset: -80,
                    delay: 0,
                    smooth: true
                }) }
                aria-label="email">
                <i className="icon-mail-squared"/>
            </a>
        </div>
    );
}

export default Icons;