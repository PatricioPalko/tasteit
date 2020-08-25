import React from 'react';
import Header from "./components/Header";

import './less/index.less';
import RecipesWrapper from "./components/RecipesWrapper";


function Home() {
    return (
        <div className="page-wrap">
            <Header/>
            <div className="tpl__textBlock">
                <div className="tpl">
                    <div className="container-medium">
                        <div className="row">
                            <div className="grid-xs-9">
                                <h2 className="heading">Lorem Ipsum is simply dummy text</h2>
                            </div>
                            <div className="grid-xs-14 grid-xs-offset-1">
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                            </div>
                        </div>
                        <div id="nette-debug"></div>
                    </div>
                </div>
            </div>
            <RecipesWrapper/>
        </div>
    );
}

export default Home