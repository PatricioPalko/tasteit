import ReactDOM from "react-dom";
import App from "../../App";
import React from "react";

if (window.location.pathname === '/') {
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
}