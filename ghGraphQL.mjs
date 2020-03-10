/**
 * ghGraphQL.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */
import { graphqlUrl, ghUsername } from "./conf"
import gql from 'graphql-tag';
import { print } from 'graphql';
import axios from "axios"

export const query = gql`
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

export const fetchGhData = async() => {
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