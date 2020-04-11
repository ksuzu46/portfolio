/**
 * App.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import PortfolioPage from "./components/portfolio/PortfolioPage";
import BlogPage from "./components/blog/BlogPage";
import { useGhFetch } from "./hooks/useGhFetch";
import NotFoundPage from "./components/NotFoundPage";
import ContributionsPage from "./components/blog/ContributionsPage";


export const App = (props) =>
{
    const ghData = useGhFetch();
    console.log(ghData);
    return (
        <div className="page">
            <Switch>
                <Route exact path="/">
                    <PortfolioPage ghData={ ghData }/>
                </Route>
                <Route path="/blog">
                    <BlogPage ghData={ ghData }/>
                </Route>
                <Route path="/contributions" exact>
                    <ContributionsPage ghData={ ghData }/>
                </Route>
                <Route exact path="/404">
                    <NotFoundPage/>
                </Route>
                <Route>
                    <Redirect to="/404"/>
                </Route>
            </Switch>
        </div>
    )
};

export default App;


