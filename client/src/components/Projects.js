/**
 * Projects.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */
import React from "react";
import { Container, Row } from "react-bootstrap";
import ProjectsItem from "./ProjectsItem";
import Divider from "./Divider";


const Projects = React.forwardRef(({ ghData }, ref) => (
        <>
            <Container ref={ ref } id='projects' className="projects">
                <h2 className="projects-heading">Projects</h2>
                <Row>{
                        ghData.projects.map((node, ind) =>
                            <ProjectsItem key={ ind } node={ node } ind={ ind }/>
                        )
                    
                }</Row>
            </Container>
            <Divider/>
        </>
    )
);

export default Projects;
