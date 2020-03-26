/**
 * Page.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React, {
    createRef, useEffect, useLayoutEffect, useRef, useState
} from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown/with-html";
import { convertRem2Pix, requestConfig } from "../lib";
import config from "../../config.js";
import Projects from "./Projects";
import About from "./About";
import NavBar from "./NavBar";
import Contact from "./Contact";
import Footer from "./Footer";
import Loader from "./Loader";
import { useGhFetch } from "../hooks/useGhFetch";
import { useEmail } from "../hooks/useEmail"
import Divider from "./Divider";
import { Container } from "react-bootstrap";

// Bootstrap default breakpoint
const breakPoints = { sm: 576, md: 768, lg: 992, xl: 1200 };
// Navbar size setting in src/styles/scss/base/_variables.scss in REM
const navbarHeight = { md: 4.5, lg: 7.5 };

const childComponents = [ About, Projects, Contact ];
const children = [ "about", "projects", "contact" ];


const Page = () =>
{
    const ghData = useGhFetch();
    const { emailStatus, sendEmail } = useEmail();
    
    return (
        <>
            <NavBar children={ children }/>
            {
                ghData.loading ? <Loader/> :
                ghData.fetched && <>
                    {
                        childComponents.map((Component, index) => (
                            <div key={ index }>
                                <Component
                                    ghData={ ghData.data }
                                    emailStatus={ emailStatus }
                                    sendEmail={ data => sendEmail(data) }
                                />
                                <Divider child={children[index < 2 ? index + 1 : index]}/>
                            </div>
                        ))
                    }
                    <Footer ghData={ ghData } />
                    </>
            }
            <>
            {
                ghData.fetched && ghData.data.blogEntries.map((entry) => {
                    return <Container key={entry.oid}>
                        <h2>{entry.text.subtitle}</h2>
                    <ReactMarkdown
                        source={entry.text.body}
                        escapeHtml={false} />
                    </Container>
                })
            }
            </>
        </>
    )
}

export default Page;
