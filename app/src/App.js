import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import './less/index.less';
import RecipeDetail from "./components/RecipeDetail";
import Home from "./Home";

function App() {
    return (
        <div className="page-wrap">
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/recipe" exact component={Home}/>
                    <Route path="/recipe/:title" component={RecipeDetail}/>
                </Switch>
            </Router>
        </div>
  );
}

export default App