/**
 * PortfolioPage.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React from "react";
import ReactMarkdown from "react-markdown/with-html";
import Projects from "./Projects";
import About from "./About";
import NavBar from "../NavBar";
import Contact from "./Contact";
import Footer from "../Footer";
import Loader from "../Loader";
import { useGhFetch } from "../../hooks/useGhFetch";
import { useEmail } from "../../hooks/useEmail"
import Divider from "../Divider";
import { Container } from "react-bootstrap";

// Bootstrap default breakpoint
// Navbar size setting in src/styles/scss/base/_variables.scss in REM
const childComponents = [ About, Projects, Contact ];
const children = [ "about", "projects", "contact", "blog" ];


const PortfolioPage = ({ ghData }) =>
{
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
                                <Divider
                                    children={ children }
                                    index={index}/>
                            </div>
                        ))
                    }
                    <Footer ghData={ ghData }/>
                </>
            }
        
        </>
    )
}

export default PortfolioPage;
