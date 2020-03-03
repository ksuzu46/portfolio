/**
 * app.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "@apollo/react-hooks"
import { client } from "../apolloClient";
import Page from "./components/Page";
import "./styles/scss/styles.scss";


const App = () => (
    <ApolloProvider client={ client }>
        <Page/>
    </ApolloProvider>
);

ReactDOM.render(<App/>, document.getElementById('app'));


