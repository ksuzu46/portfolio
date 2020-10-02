/**
 * ghGraphQL.mjs
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */
import gql from 'graphql-tag';
import { print } from 'graphql';
import axios from "axios";
import { ghUsername, gqlUrl } from "./config.mjs";

/* eslint react/prop-types: 0 */

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
    }`;

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
        const { user, repository } = res.data.data;
        const { edges } = user.pinnedItems;
        const projects = edges.map(edge => edge.node);
        return { ...user, projects };
    } catch(error)
    {
        console.log(error)
        return error;
    }
}

export { fetchGhData }