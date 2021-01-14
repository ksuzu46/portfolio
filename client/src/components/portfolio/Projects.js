/**
 * Projects.js
 * @author [Keisuke Suzuki](https://github.com/ksuzu46)
 */
import React from "react";
import { Container, Row } from "react-bootstrap";
import { Element } from "react-scroll";
import ProjectsItem from "./ProjectsItem";
import jpConfig from "../../../jpConfig";


const Projects = ({ ghData, language }) => {
    const isEnglish = language === 'en';
    return (
        <div className="projects">
            <Container>
                <Element name="projects">
                    <h3 className="projects-heading">{isEnglish ? 'Projects' : 'プロジェクト'}</h3>
                </Element>
                {console.log(ghData.projects)}
                <Row>{
                    isEnglish ? ghData.projects.map((node, ind) =>
                        <ProjectsItem key={ind} node={node} ind={ind} isEnglish={isEnglish}/>
                    ) : jpConfig.projects.map((node, ind) =>
                        <ProjectsItem key={ind} node={node} ind={ind} isEnglish={isEnglish}/>
                    )
                }</Row>
            </Container>
        </div>
    )
};

export default Projects;
