/**
 * PortfolioPage.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React, {useState} from "react";
import Projects from "./Projects";
import About from "./About";
import NavBar from "../NavBar";
import Contact from "./Contact";
import Footer from "../Footer";
import Loader from "../Loader";
import {useEmail} from "../../hooks/useEmail"
import Divider from "../Divider";

// Bootstrap default breakpoint
// Navbar size setting in src/styles/scss/base/_variables.scss in REM
const childComponents = [About, Projects, Contact];
const children = ["about", "projects", "contact", "blog"];


const PortfolioPage = ({ghData}) => {
    const {emailStatus, sendEmail} = useEmail();
    const [ language, setLanguage ] = useState('jp');

    return (
        <>
            <NavBar
                children={children}
                language={language}
                onLangChange={lang => setLanguage(lang)}/>
            {
                ghData.loading ? <Loader/> :
                    ghData.fetched &&
                    <>
                        {
                            childComponents.map((Component, index) => (
                                <div key={index}>
                                    <Component
                                        ghData={ghData.data}
                                        emailStatus={emailStatus}
                                        sendEmail={data => sendEmail(data)}
                                        language={language}
                                    />
                                    <Divider
                                        children={children}
                                        index={index}/>
                                </div>
                            ))
                        }
                        <Footer ghData={ghData.data}/>
                    </>
            }

        </>
    )
}

export default PortfolioPage;
