/**
 * BlogPage.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React from "react";
import NavBar from "../NavBar";
import { Container } from "react-bootstrap";
import Loader from "../Loader";
import BlogPost from "./BlogPost";
import { Link, Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import TextTruncate from "react-text-truncate";
import { stripHtml } from "../../lib";
import { scroller } from "react-scroll";


const children = [ "home", "blog", "contributions" ];
const BlogPage = ({ ghData }) =>
{
    const { path, url } = useRouteMatch();
    return (<>
        <NavBar children={ children }/>
        {
            ghData.loading ? <Loader/> :
            ghData.fetched &&
            <div className="blog">
                <h2 className="blog-heading"> My Blog </h2>
                {
                    ghData.data.blogEntries.map((entry, index) =>
                    {
                        const body = stripHtml(entry.text.body);
                        return (
                            <Container key={ index }>
                                <Link
                                    className="card-link"
                                    to={ `${ url }/${ entry.oid }` }
                                    onClick={ () => scroller.scrollTo('post', {
                                        duration: 750,
                                        offset: -140,
                                        delay: 50,
                                        smooth: true
                                    }) }
                                >
                                    <div className="blog-card">
                                        <div className="article-details">
                                            <h3 className="post-title">
                                                { entry.text.subtitle }
                                            </h3>
                                            <div className="post-description">
                                                <TextTruncate
                                                    line={ 3 }
                                                    truncateText="..."
                                                    text={ body }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </Container>
                        )
                    })
                }
                <div id="post">
                    <Switch>
                        <Route exact path={ path }>
                            <Container>
                                <h4 className="blog-post-heading">Please select
                                    an entry</h4>
                            </Container>
                        </Route>
                        <Route exact path={ `${ path }/:id` }>
                            <BlogPost
                                posts={ ghData.data.blogEntries }/>
                        </Route>
                        <Route>
                            <Redirect to="/404"/>
                        </Route>
                    </Switch>
                </div>
            </div>
        }
    </>)
};

export default BlogPage;