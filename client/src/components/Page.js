/**
 * Page.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React, {
    createRef, useEffect, useLayoutEffect, useRef, useState
} from "react";
import axios from "axios";
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
    
    /**
     * Layout manipulation
     */
    const [ height, setHeight ] = useState(0);
    const [ heights, setHeights ] = useState([]);
    const refs = useRef([ ...Array(3) ].map(() => createRef()));
    
    const scrollToInd = (i) =>
    {
        if(typeof window !== 'undefined')
        {
            window.scrollTo({ left: 0, top: heights[i], behavior: "smooth" });
        }
    }
    const onScroll = () =>
    {
        setHeight(
            document.body.scrollTop || document.documentElement.scrollTop
        );
    };
    const updateHeights = () =>
    {
        let curWidth = {};
        if(typeof window !== 'undefined')
        {
            curWidth = window.innerWidth;
        }
        const curNavbarHeight =
            curWidth > breakPoints.lg ?
            convertRem2Pix(navbarHeight.lg) :
            convertRem2Pix(navbarHeight.md);
        
        // Subtract navbar size if the element referred to is at the top of
        // page.
        const nextHeights = refs.current.map((ref, ind) =>
        {
            const { offsetTop } = ref;
            return ind !== 0 ? offsetTop - curNavbarHeight : 0;
        });
        setHeights(nextHeights)
    }
    // Update heights
    useEffect(() =>
    {
        if(typeof window !== 'undefined')
        {
            window.addEventListener("resize", updateHeights);
            window.addEventListener("scroll", onScroll);
        }
        updateHeights();
        return () =>
        {
            if(typeof window !== 'undefined')
            {
                window.removeEventListener("resize", updateHeights);
                window.removeEventListener("scroll", onScroll);
            }
        };
    }, [ document.body.scrollHeight, document.documentElement.scrollHeight,
         ghData.fetched, height ]);
    
    
    return (
        <>
            <NavBar
                handleScroll={ i => scrollToInd(i) }
                children={ children }
            />
            {
                ghData.loading ? <Loader/> :
                ghData.fetched && <>
                     {
                        childComponents.map((Component, index) => (
                            <div key={ index }>
                                <Component
                                    ref={ ref => (refs.current[index] = ref) }
                                    ghData={ ghData.data }
                                    emailStatus={ emailStatus }
                                    scrollToContact={ () => scrollToInd(2) }
                                    sendEmail={ data => sendEmail(data) }
                                />
                            </div>
                        ))
                    }
                    <Footer ghData={ ghData }/>
                </>
            }
        </>
    )
}

export default Page;
