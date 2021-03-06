/**
 * ProjectsItem.js
 * @author [Keisuke Suzuki](https://github.com/ksuzu46)
 */

import React, { useState } from "react";
import { Button, Card, Col, Container } from "react-bootstrap";
import TextTruncate from "react-text-truncate";


const ProjectsItem = ({ node, ind, isEnglish }) =>
{
    const [ expanded, setExpanded ] = useState(false);
    const { name, homepageUrl, description, url, primaryLanguage } = node;
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
                                <i className="icon-globe"/>
                            </a>
                        }
                        {
                            url && <a
                                href={ url }
                                aria-label="see project on github"
                                target="github">
                                <i className="icon-github-circled"/>
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
                        { expanded ? isEnglish ? "Read Less" : "閉じる"
                            :　isEnglish ? "Read More" : "もっと読む" }
                    </Button>
                </div>
            </Card>
        </Col>
    )
}

export default ProjectsItem;