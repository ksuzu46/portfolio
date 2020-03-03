/**
 * apolloClient.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 * @description Appolo client configuration for github graphql api
 */
import ApolloClient, { gql } from 'apollo-boost';
import config from "./config";


const { GH_TOKEN } = process.env;
const { graphqlUrl, ghUsername } = config;

export const client = new ApolloClient({
    uri: graphqlUrl,
    request: (operation) =>
    {
        operation.setContext({
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${ GH_TOKEN }`
            }
        });
    }
});

export const MY_GH_DATA = gql`
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