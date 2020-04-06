/**
 * ProjectsItem.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React, { useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import TextTruncate from "react-text-truncate";


const ProjectsItem = ({ node, ind }) =>
{
    const [ expanded, setExpanded ] = useState(false);
    const { name, homepageUrl, description, url, primaryLanguage } = node;
    console.log(primaryLanguage.name);
    return (
        <Col
            lg="auto" md="auto" sm="auto"
            key={ ind }
        >
            <Card className="projects-card">
                <div className="projects-card-header">
                    <div className="projects-card-title">
                        <h4>{ name }</h4>
                        {
                            homepageUrl && <a
                                href={ homepageUrl }
                                aria-label="got to project's homepage"
                                target="homepage">
                                <i className="fas fa-2x fa-home"/>
                            </a>
                        }
                        {
                            url && <a
                                href={ url }
                                aria-label="see project on github"
                                target="github">
                                <i className="fab fa-2x fa-github"/>
                            </a>
                        }
                    </div>
                </div>
                <div className="projects-card-description">
                    <div className="projects-card-description-text">
                        { expanded ? <p>{ description }</p> : <TextTruncate
                            line={ 5 }
                            truncateText="..."
                            text={ description }
                        /> }
                    </div>
                    <Button
                        className="projects-card-description-button"
                        onClick={ () => setExpanded(!expanded) }
                    >
                        { expanded ? "Read Less" : "Read More" }
                    </Button>
                </div>
            </Card>
        </Col>
    )
}

export default ProjectsItem;