/**
 * Projects.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */
import React from "react";
import { Container, Row } from "react-bootstrap";
import { Element } from "react-scroll";
import ProjectsItem from "./ProjectsItem";


const Projects = ({ ghData }) => (
    <Element name="projects" className="projects">
        <Container>
            <h3 className="projects-heading">Projects</h3>
            <Row>{
                ghData.projects.map((node, ind) =>
                    <ProjectsItem key={ ind } node={ node } ind={ ind }/>
                )
            }</Row>
        </Container>
    </Element>
);

export default Projects;
