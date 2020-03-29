/**
 * App.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import PortfolioPage from "./components/portfolio/PortfolioPage";
import BlogPage from "./components/blog/BlogPage";
import { useGhFetch } from "./hooks/useGhFetch";
import NotFoundPage from "./components/NotFoundPage";
import BlogPost from "./components/blog/BlogPost";


export const App = (props) =>
{
    const ghData = useGhFetch();
    return (
            <div className="page">
                <Switch>
                    <Route exact path="/">
                        <PortfolioPage ghData={ghData} />
                    </Route>
                    <Route path="/blog">
                        <BlogPage ghData={ ghData } />
                    </Route>
                    <Route exact path="/404">
                        <NotFoundPage/>
                    </Route>
                    <Route>
                        <Redirect to='/404'/>
                    </Route>
                </Switch>
            </div>
    )
};

export default App;


