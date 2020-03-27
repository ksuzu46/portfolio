/**
 * BlogPage.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React from "react";
import NavBar from "../NavBar";
import { Container } from "react-bootstrap";
import ReactMarkdown from "react-markdown/with-html";
import Loader from "../Loader";
import BlogPost from "./BlogPost";
import {
    Link, Route, Switch, useHistory, useRouteMatch
} from "react-router-dom";
import NotFoundPage from "../NotFoundPage";


const children = [ "home", "blog" ];
const BlogPage = ({ ghData }) =>
{
    const { path, url } = useRouteMatch();
    return (<>
        <NavBar children={ children }/>
        {
            ghData.loading ? <Loader/> :
            ghData.fetched &&
            <div className="blog">
                <Container>
                    <h2 className="blog-heading"> My Blog </h2>
                    <ol>
                        {
                            ghData.data.blogEntries.map((entry, index) =>
                            {
                                return (
                                    <Container key={ index }>
                                        <li>
                                            <Link
                                                to={ `${ url }/${ entry.oid }` }>
                                                { entry.text.subtitle }
                                            </Link>
                                        </li>
                                    </Container>
                                )
                            })
                        }
                    </ol>
                    <Switch>
                        <Route exact path={ path }>
                            <Container>
                                <h4 className="blog-post-heading">Please select
                                    an entry</h4>
                            </Container>
                        </Route>
                        <Route path={ `${ path }/:id` }>
                            <BlogPost
                                posts={ ghData.data.blogEntries }/>
                        </Route>
                    </Switch>
                </Container>
            </div>
        }
    </>)
};

export default BlogPage;