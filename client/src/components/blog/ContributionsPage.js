/**
 * ContributionsPage.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import ReactMarkdown from "react-markdown/with-html";
import parse from 'html-react-parser';
import NavBar from "../NavBar";
import Loader from "../Loader";

const children = [ "home", "blog", "contributions" ];
const ContributionsPage = ({ ghData }) =>
{
    return (<>
        <NavBar children={children} />
            {
                ghData.loading ? <Loader/> :
                ghData.fetched &&
                <div className='contributions'>
                    <Container>
                        <h3 className="blog-post-heading">
                            Contributions</h3>
                        <div className="contributions-body">
                            <div className="markdown-body-custom">
                                {parse( ghData.data.contributions.body)}
                            </div>
                        </div>
                    </Container>
                </div>
            }
        </>)
        
};

export default ContributionsPage;