/**
 * ContributionsPage.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React from "react";
import { Container } from "react-bootstrap";
import parse from 'html-react-parser';
import NavBar from "../NavBar";
import Loader from "../Loader";


const children = [ "home", "blog", "contributions" ];
const ContributionsPage = ({ ghData }) =>
{
    return (<>
        <NavBar children={ children }/>
        {
            ghData.loading ? <Loader/> :
            ghData.fetched &&
            <div className="contributions">
                <Container>
                    <h2 className="contributions-heading"> Contributions</h2>
                    <div className="contributions-body">
                        <div className="markdown-body-custom">
                            { parse(ghData.data.contributions.body) }
                        </div>
                    </div>
                </Container>
            </div>
        }
    </>)
    
};

export default ContributionsPage;