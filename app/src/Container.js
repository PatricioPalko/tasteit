import React from "react";
import { Switch, Route } from "react-router-dom";
import App from "./App";
import styled from "styled-components";


function Container() {
    return (
        <Navigation>
            <Switch>
                <Route exact path="/" component={App} />
            </Switch>
        </Navigation>
    ) ;
}
const Navigation = styled.div`
`;


export default Container;