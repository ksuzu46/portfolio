/**
 * ghGraphQL.mjs
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */
import gql from 'graphql-tag';
import { print } from 'graphql';
import axios from "axios";
import { ghUsername, graphqlUrl } from "./config.mjs";


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

const fetchGhData = async() =>
{
    try
    {
        const res = await axios.post(graphqlUrl, { query: print(query) },
            {
                headers: {
                    'Authorization': `Bearer ${ process.env.GH_TOKEN }`
                }
            });
        return res.data;
    } catch(error)
    {
        console.log(error);
        return error;
    }
}

export { fetchGhData }