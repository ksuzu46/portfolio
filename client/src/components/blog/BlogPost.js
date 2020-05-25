/**
 * BlogPost.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import parse from 'html-react-parser';
import { animateScroll as scroll } from "react-scroll";


const BlogPost = ({ posts }) =>
{
    const { id } = useParams();
    const findMatchingPost = () =>
    {
        const index = posts.findIndex(post =>
        {
            return post.name === id;
        });
        
        return posts[index] ? posts[index].text : null;
    }
    const post = findMatchingPost();
    
    return (
        <div className="blog-post">
            {
                post ? (
                    <Container>
                        <h3 id="post" className="blog-post-heading">
                            { post.subtitle }</h3>
                        <div className="blog-post-body">
                            <div className="markdown-body-custom">
                                { parse(post.body) }
                                <Button
                                    className="blog-post-button-full"
                                    onClick={ () => scroll.scrollToTop() }
                                >
                                    Go to Blog Top
                                </Button>
                            </div>
                        </div>
                    
                    </Container>
                ) : <Container className="notfound">
                    <h1>Oops!</h1>
                    <br/>
                    <p>Could not find the post you are looking for :(</p>
                    <Link to="/blog">
                        <Button className="link">Go to Blog Top</Button>
                    </Link>
                </Container>
            }
        
        </div>
    )
};

export default BlogPost;