/**
 * App.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

/* eslint react/prop-types: 0 */
import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import PortfolioPage from "./components/portfolio/PortfolioPage";
import { useGhFetch } from "./hooks/useGhFetch";
import NotFoundPage from "./components/NotFoundPage";


export const App = () =>
{
    const ghData = useGhFetch();
    return (
        <div className="page">
            <Switch>
                <Route exact path="/">
                    <PortfolioPage ghData={ ghData }/>
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


