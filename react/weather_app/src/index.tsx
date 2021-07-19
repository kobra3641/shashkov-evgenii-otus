import ReactDOM from "react-dom";
import App from "./components/homepage/app";
import React from "react";

ReactDOM.render(
    <App
        weatherData={[]}
        isLoading={true}
        favorites={[]}
        town=''/>,
    document.getElementById("root"));