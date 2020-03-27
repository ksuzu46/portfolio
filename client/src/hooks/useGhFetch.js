/**
 * useGhFetch.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import { useEffect, useLayoutEffect, useState } from 'react';
import axios from "axios";
import { requestConfig } from "../lib";


export const useGhFetch = () =>
{
    const [ ghFetch, setGhFetch ] = useState({
        loading: false,
        error: false,
        complete: false,
        fetched: false,
    });
    
    const splitJekyllHeader = (text, index) => {
        /**
         * Get first string that starts from a string `---\n`, and ends with
         *  `---`
         */
        const headerRe = /[-]{3,}\n[^[-]{3,}]*[-]{3,}/g;
        const subtitleRe = /(?=subtitle:).*$/mg;
        const headerRes = headerRe.exec(text) || [];
        const header = headerRes[0] ? headerRes[0] : "";
        const subtitleRes =  subtitleRe.exec(header) || [];
        const subtitle =  subtitleRes[0] ? subtitleRes[0].replace("subtitle:" +
                                                                  " " , '') : '';
        const body = text.substr(headerRe.lastIndex);
        return { subtitle, body };
    }
    
    useEffect(() =>
    {
        let unmounted = false;
        const fetchGhData = async() =>
        {
            setGhFetch(prevState => ({ ...prevState, loading: true, }));
            try
            {
                if(!unmounted)
                {
                    const tmp = await axios.get("/api/gh", requestConfig());
                    let data = {
                        avatarUrl: "",
                        bio: "",
                        bioHTML: "",
                        blogEntries: [],
                        email: "",
                        projects: []
                    };
                    if(tmp.data)
                    {
                        const { user, repository } = tmp.data;
                        const { edges } = user.pinnedItems;
                        const projects = edges.map(edge => edge.node);
                        const blogEntries =  repository.object.entries.map((
                            entry, index) => ({
                                oid: entry.oid,
                                name: entry.name,
                                text: splitJekyllHeader(entry.object.text, index)
                            }));
                        data = { ...user, projects, blogEntries };
                    }
                    await setGhFetch(prevState => ({
                        ...prevState,
                        data: { ...data },
                        loading: false,
                        complete: true,
                        fetched: true
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
        return () => { unmounted = true; }
    }, []);
    return ghFetch;
}