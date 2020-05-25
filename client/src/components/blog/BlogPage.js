/**
 * BlogPage.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React, {useState} from "react";
import NavBar from "../NavBar";
import {Container, Dropdown} from "react-bootstrap";
import Loader from "../Loader";
import BlogPost from "./BlogPost";
import {Link, Redirect, Route, Switch, useRouteMatch} from "react-router-dom";
import TextTruncate from "react-text-truncate";
import {stripHtml} from "../../lib";
import {scroller} from "react-scroll";

const children = ["home", "blog", "contributions"];
const statuses = ["Date (new)", "Date (old)", "Title"];
const BlogPage = ({ghData}) => {

    const {path, url} = useRouteMatch();
    const [status, setStatus] = useState(() => "Sort By");
    const sortPost = (status) => {
        switch (status) {
            case "Date (new)" :
                ghData.data.blogEntries.sort((lhs, rhs) => {
                    return lhs.name > rhs.name ? -1 :
                        lhs.name < rhs.name ? 1 : 0;
                });
                setStatus(() => statuses[0]);
                break;
            case "Date (old)" :
                ghData.data.blogEntries.sort((lhs, rhs) => {
                    return lhs.name < rhs.name ? -1 :
                        lhs.name > rhs.name ? 1 : 0;
                });
                setStatus(() => statuses[1]);
                break;
            case "Title"     :
                ghData.data.blogEntries.sort((lhs, rhs) => {
                    return lhs.text.subtitle < rhs.text.subtitle ? -1 :
                        lhs.text.subtitle > rhs.text.subtitle ? 1 : 0;
                });
                setStatus(() => statuses[2]);
                break;
            default         :
                break;
        }
    }

    return (
        <>
            <NavBar children={children}/>
            {
                ghData.loading ? <Loader/> :
                    ghData.fetched &&
                    <div className="blog">
                        <Container>
                            <div className="blog-heading">
                                <h2 className="blog-heading-text"> Blog </h2>
                                <Dropdown className="blog-heading-dropdown">
                                    <Dropdown.Toggle
                                        variant="info"
                                        id="dropdown-basic">
                                        {status}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            onClick={() => sortPost("Date (new)")}>Date
                                            (new)
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => sortPost("Date (old)")}>Date
                                            (old)
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => sortPost("Title")}>Title
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Container>
                        {

                            ghData.data.blogEntries.map((entry, index) => {
                                const body = stripHtml(entry.text.body);
                                return (
                                    <Container key={index}>
                                        <Link
                                            className="card-link"
                                            to={`${url}/${entry.name}`}
                                            onClick={() => scroller.scrollTo('post', {
                                                duration: 750,
                                                offset: -80,
                                                delay: 50,
                                                smooth: true
                                            })}
                                        >
                                            <div className="blog-card">
                                                <div
                                                    className="article-details">
                                                    <h3 className="post-title">
                                                        {entry.text.subtitle}
                                                    </h3>
                                                    <div
                                                        className="post-description">
                                                        <TextTruncate
                                                            line={3}
                                                            truncateText="..."
                                                            text={body}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </Container>
                                )
                            })
                        }
                        <Switch>
                            <Route exact path={path}>
                                <Container>
                                    <h3 id='post'
                                        className="blog-post-heading">Please
                                        select
                                        an entry</h3>
                                </Container>
                            </Route>
                            <Route exact path={`${path}/:id`}>
                                <BlogPost
                                    posts={ghData.data.blogEntries}/>
                            </Route>
                            <Route>
                                <Redirect to="/404"/>
                            </Route>
                        </Switch>
                    </div>
            }
        </>)
};

export default BlogPage;