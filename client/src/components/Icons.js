import React from "react";
import config from "../../config";
import { Col, Container } from "react-bootstrap";

const { linkedinUrl, myGmail } = config;

const Icons = ({ ghData, parent, scrollToContact }) => {
    return (
        <Col xl mb={ 5 } mb-lg={ 0 } className={`${parent}-icons`}>
            <a className={`${parent}-social`} href={ linkedinUrl }>
                <i className="fab fa-3x fa-linkedin"/>
            </a>
            <a className={`${parent}-social`} href={ ghData.url }>
                <i className="fab fa-3x fa-github-square"/>
            </a>
            <a className={`${parent}-social`} onClick={ scrollToContact }>
                <i className="fas fa-3x fa-envelope-square"/>
            </a>
        </Col>
    );
}

export default Icons;