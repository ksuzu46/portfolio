/**
 * Projects.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */
import React from "react";
import { Container, Row } from "react-bootstrap";
import { Element } from "react-scroll";
import ProjectsItem from "./ProjectsItem";


const Projects = ({ ghData }) => (
    <div className="projects">
        <Container>
            <Element name="projects">
                <h3 className="projects-heading">Projects</h3>
            </Element>
            <Row>{
                ghData.projects.map((node, ind) =>
                    <ProjectsItem key={ ind } node={ node } ind={ ind }/>
                )
            }</Row>
        </Container>
    </div>
);

export default Projects;
