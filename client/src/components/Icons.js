import React from "react";
import config from "../../config";
import { scroller } from "react-scroll";
import { Col } from "react-bootstrap";


const { linkedinUrl, myGmail } = config;

const Icons = ({ ghData, parent, scrollToContact }) =>
{
    return (
        <Col xl mb={ 5 } mb-lg={ 0 } className={ `${ parent }-icons` }>
            <a
                className={ `${ parent }-social` }
                href={ linkedinUrl }
                aria-label="linkedin">
                <i className="fab fa-3x fa-linkedin"/>
            </a>
            <a
                className={ `${ parent }-social` }
                href={ ghData.url }
                aria-label="github">
                <i className="fab fa-3x fa-github-square"/>
            </a>
            <a
                className={ `${ parent }-social` }
                onClick={ () => scroller.scrollTo('contact', {
                    duration: 750,
                    offset: -140,
                    delay: 0
                }) }
                aria-label="email">
                <i className="fas fa-3x fa-envelope-square"/>
            </a>
        </Col>
    );
}

export default Icons;