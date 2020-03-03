/**
 * ProjectsItem.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React from "react";
import { Col, Container } from "react-bootstrap";


const ProjectsItem = ({ node, ind }) =>
{
    const { name, homepageUrl, description, url } = node;
    return (
        <Col lg="auto" md="auto" sm="auto"
             key={ ind }>
            <Container className="projects-list-item">
                <Container
                    className="projects-list-item-header">
                    <h4>{ name }</h4>
                    {
                        homepageUrl && <a href={ homepageUrl }>
                            <i className="fas fa-2x fa-home"/>
                        </a>
                    }
                    {
                        url && <a href={ url }>
                            <i className="fab fa-2x fa-github"/>
                        </a>
                    }
                </Container>
                <Container
                    className="projects-list-item-description"> { description }
                </Container>
            </Container>
        </Col>
    )
}

export default ProjectsItem;