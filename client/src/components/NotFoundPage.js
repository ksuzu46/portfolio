/**
 * NotFoundPage.js
 * @author [Keisuke Suzuki](https://github.com/ksuzu46)
 */

import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";


const NotFoundPage = () => (
    <div className="page">
        <Container className="notfound">
            <h1>Oops!</h1>
            <h3>404 Not Found</h3>
            <p>Could not find the page you requested</p>
            <Link to="/">
                <Button className="link">Go Home</Button>
            </Link>
        </Container>
    </div>
);

export default NotFoundPage;