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
import Divider from "./Divider";
import Loader from "./Loader";


// Bootstrap default breakpoint
const breakPoints = { sm: 576, md: 768, lg: 992, xl: 1200 };
// Navbar size setting in src/styles/scss/base/_variables.scss in REM
const navbarHeight = { md: 4.5, lg: 7.5 };
const { mailerUrl } = config;
const childComponents = [ About, Projects, Contact ];
const children = [ "about", "projects", "contact" ];


const Page = () =>
{
    /**
     * Fetch from gh data from the endpoint
     */
    const [ ghFetch, setGhFetch ] = useState({
        data: null,
        loading: true,
        error: false,
        complete: false
    });
    const [ ghData, setGhData ] = useState({
        avatarUrl: "",
        bio: "",
        bioHTML: "",
        email: "",
        projects: []
    });
    const [ isFetched, setIsFetched ] = useState(false);
    
    
    useEffect(() =>
    {
        let unmounted = false;
        const fetchGhData = async() =>
        {
            setGhFetch(prevState => ({ ...prevState, loading: true, }));
            try
            {
                const tmp = await axios.get("/api/gh", requestConfig());
                if(!unmounted)
                {
                    setGhFetch(prevState => ({
                        ...prevState,
                        data: tmp.data,
                        loading: false,
                        complete: true
                    }));
                }
            } catch(error)
            {
                if(!unmounted)
                {
                    setGhFetch(prevState => ({
                        ...prevState,
                        error: error.response,
                        loading: false,
                        complete: true,
                    }));
                }
            }
        };
        fetchGhData();
        return () => { unmounted = true };
    }, []);
    
    useLayoutEffect(() =>
    {
        if(ghFetch.complete)
        {
            const { user } = ghFetch.data;
            const { pinnedItems } = user;
            const { edges } = pinnedItems;
            const projects = edges.map(edge => edge.node);
            setGhData(prevState => ({ ...prevState, ...user, projects }));
            setIsFetched(true);
        }
    }, [ghFetch])
    
    
    /**
     * Send Email using nodemailer
     */
    const [ emailStatus, setEmailStatus ] = useState({
        data: null,
        sending: false,
        error: false,
        complete: false
    });
    
    const sendEmail = async(data) =>
    {
        setEmailStatus(prevState => ({ ...prevState, sending: true, }));
        try
        {
            const tmp = await axios.post(mailerUrl, data, requestConfig());
            await setEmailStatus(prevState => ({
                ...prevState,
                data: tmp.data,
                sending: false,
                complete: true
            }));
        } catch(error)
        {
            await setEmailStatus(prevState => ({
                ...prevState,
                error: error.response,
                sending: false,
                complete: true,
            }));
        }
    };
    
    /**
     * Layout manipulation
     */
    const [ height, setHeight ] = useState(0);
    const [ heights, setHeights ] = useState([]);
    const refs = useRef([ ...Array(3) ].map(() => createRef()));
    
    const scrollToInd = (i) =>
    {
        window.scrollTo({ left: 0, top: heights[i], behavior: "smooth" });
    }
    const onScroll = () =>
    {
        setHeight(
            document.body.scrollTop || document.documentElement.scrollTop
        );
    };
    const updateHeights = () =>
    {
        const curWidth = window.innerWidth;
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
        window.addEventListener("resize", updateHeights);
        window.addEventListener("scroll", onScroll);
        updateHeights();
        return () =>
        {
            window.removeEventListener("resize", updateHeights);
            window.removeEventListener("scroll", onScroll);
        };
    }, [ document.body.scrollHeight, document.documentElement.scrollHeight,
         isFetched, height ]);
    
    
    return (
        <>
            <NavBar
                handleScroll={ i => scrollToInd(i) }
                children={ children }
            />
            {
                ghFetch.complete ?
                <>
                    {
                        childComponents.map((Component, index) => (
                            <div key={ index }>
                                <Component
                                    ref={ ref => (refs.current[index] = ref) }
                                    ghData={ ghData }
                                    emailStatus={ emailStatus }
                                    scrollToContact={ () => scrollToInd(2) }
                                    sendEmail={ data => sendEmail(data) }
                                />
                            </div>
                        ))
                    }
                    <Footer ghData={ ghData }/>
                </>
                : <Loader/>
            }
        </>
    )
}

export default Page;
