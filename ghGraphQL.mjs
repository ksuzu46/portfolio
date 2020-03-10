/**
 * ghGraphQL.mjs
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */
import gql from 'graphql-tag';
import { print } from 'graphql';
import axios from "axios";
import { ghUsername, graphqlUrl } from "./conf.mjs";

const query = gql`
    {
        user(login: ${ ghUsername }) {
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
    }`;

const fetchGhData = async() => {
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