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
import Media from "react-bootstrap/Media";
import Icons from "./Icons";
import loader from '../../public/images/loader-334px.gif'
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
    const [ ghData, setGhData ] = useState({
        data: null,
        loading: false,
        error: false,
        complete: false
    });
    const [ isFetched, setIsFetched ] = useState(false);
    
    const fetchGhData = async() =>
    {
        setGhData(prevState => ({ ...prevState, loading: true, }));
        try
        {
            const tmp = await axios.get("/api/gh", requestConfig());
            await setGhData(prevState => ({
                ...prevState,
                data: tmp.data,
                loading: false,
                complete: true
            }));
        } catch(error)
        {
            await setGhData(prevState => ({
                ...prevState,
                error: error.response,
                loading: false,
                complete: true,
            }));
        }
    };
    
    useEffect(() =>
    {
        fetchGhData();
    }, []);
    
    useLayoutEffect(() => {
        if(ghData.complete)
        {
            console.log(ghData);
            const { user } = ghData.data;
            const { pinnedItems } = user;
            const { edges } = pinnedItems;
            const projects = edges.map(edge => edge.node);
            setGhData({ ...user, projects });
            !ghData.loading && setIsFetched(true);
        }
    }, [ghData.complete])
    
    
    /**
     * Send Email using nodemailer
     */
    const [ res, setRes ] = useState({
        data: null,
        sending: false,
        error: false,
        complete: false
    });
    
    const sendEmail = async(data) =>
    {
        setRes(prevState => ({ ...prevState, sending: true, }));
        try
        {
            const tmp = await axios.post(mailerUrl, data, requestConfig());
            await setRes(prevState => ({
                ...prevState,
                data: tmp.data,
                sending: false,
                complete: true
            }));
        } catch(error)
        {
            await setRes(prevState => ({
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
    
    useEffect(() =>
    {
        window.addEventListener("resize", updateHeights);
        window.addEventListener("scroll", onScroll);
        return () =>
        {
            window.removeEventListener("resize", updateHeights);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);
    
    useEffect(() =>
    {
        updateHeights();
    }, [ document.body.scrollHeight, document.documentElement.scrollHeight,
         isFetched, height ]);
    
    
    return (
        <>
            <NavBar
                handleScroll={ i => scrollToInd(i) }
                children={ children }
            />
            {
                ghData.loading ? <Loader/>
                : isFetched && childComponents.map((Component, index) => (
                                   <div key={ index }>
                                       <Component
                                           ref={ ref => (refs.current[index] = ref) }
                                           projectData={ ghData }
                                           res={ res }
                                           scrollToContact={ () => scrollToInd(2) }
                                           sendEmail={ data => sendEmail(data) }
                                       />
                                       <Divider/>
                                   </div>
                               ))
            }
            { isFetched && <Footer projectData={ ghData }/> }
        </>
    )
}

export default Page;
