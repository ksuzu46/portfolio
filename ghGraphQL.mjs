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
            avatarUrl
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


const convertToGFM = async (data) =>
{
    let newData = new Array(data.length);
    try
    {
        const { blogEntries } = data;
        for(let i = 0; i < blogEntries.length; i++)
        {
            const { oid, name, text } = blogEntries[i];
            const processed = await renderGfm(text);
            newData[i] = ({ oid, name, text: processed });
        }
        return { ...data, blogEntries: newData };
    } catch (error) {
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
                headers: { 'Authorization': `Bearer ${ process.env.GH_TOKEN }`}
            });
        const { user, repository } = res.data.data;
        const { edges } = user.pinnedItems;
        const projects = edges.map(edge => edge.node);
        const blogEntries = repository.object.entries.map((
            entry, index) => ({
            oid: entry.oid,
            name: entry.name,
            text: entry.object.text
        }));
        return { ...user, projects, blogEntries };
    } catch(error)
    {
        console.log(error)
        return error;
    }
}

export { fetchGhData, convertToGFM }