/**
 * BlogPost.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React from "react";
import NavBar from "../NavBar";
import Loader from "../Loader";
import { Container } from "react-bootstrap";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import ReactMarkdown from "react-markdown/with-html";


const BlogPost = ({ posts }) =>
{
    const { id } = useParams();
    const getMatchingPost = () =>
    {
        const index = posts.findIndex(post =>
        {
            return post.oid === id;
        });
        
        return posts[index].text;
    }
    
    return (
        <div className="blog-post">
            <h3 className="blog-post-heading">
                { getMatchingPost().subtitle }</h3>
            <div className="blog-post-body">
                <div className="markdown-body">
                    <ReactMarkdown
                        source={ getMatchingPost().body }
                        escapeHtml={ false }>
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    )
};

export default BlogPost;