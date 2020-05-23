/**
 * ghGraphQL.mjs
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */
import gql from 'graphql-tag';
import { print } from 'graphql';
import axios from "axios";
import { ghUsername, gqlUrl } from "./config.mjs";
import { renderGfm } from "./processMarkdown";


const query = gql`
    {
        ## Fetch user information
        user(login: ${ ghUsername })
        {
            bio
            bioHTML
            email
            pinnedItems(first: 10) {
                edges {
                    node {
                        ... on Repository {
                            id
                            name
                            description
                            descriptionHTML
                            url
                            shortDescriptionHTML
                            homepageUrl
                            primaryLanguage {
                                name
                            }
                        }
                    }
                }
            }
            url
        }
        ## Fetch from custom location
        repository(name: "Ks5810-weekly", owner: "hunter-college-ossd-spr-2020")
        {
            contributions: object(expression: "gh-pages:contributions.md") {
                ... on Blob {
                    text
                }
            }
            object(expression: "gh-pages:_posts") {
                ... on Tree {
                    entries {
                        oid
                        object {
                            ... on Blob {
                                text
                            }
                        }
                        name
                    }
                }
            }
        }
    }`;


const convertToGFM = async(data) =>
{
    let newData = new Array(data.length);
    const newContributions = await renderGfm(data.contributions);
    try
    {
        const { blogEntries } = data;
        for(let i = 0; i < blogEntries.length; i++)
        {
            const { oid, name, text } = blogEntries[i];
            const processed = await renderGfm(text);
            newData[i] = ({ oid, name, text: processed });
        }
        return { ...data, blogEntries: newData, contributions: newContributions,  };
    } catch(error)
    {
        return error;
    }
}

const fetchGhData = async() =>
{
    try
    {
        const res = await axios.post(gqlUrl,
            { query: print(query) },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    'Authorization': `Bearer ${ process.env.GH_TOKEN }` }
            });
        console.log(res.data);
        const { user, repository } = res.data.data;
        const { edges } = user.pinnedItems;
        const projects = edges.map(edge => edge.node);
        const blogEntries = repository.object.entries.map((
            entry, index) => ({
            oid: entry.oid,
            name: entry.name,
            text: entry.object.text
        }));
        const contributions = repository.contributions.text;
        return { ...user, projects, blogEntries, contributions };
    } catch(error)
    {
        console.log(error)
        return error;
    }
}

export { fetchGhData, convertToGFM }