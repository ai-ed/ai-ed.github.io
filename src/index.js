import * as Handlebars from "handlebars";

import {header} from "./ai-ed.js";
import {renderTools} from "./resources.js"

window.onload = () => {
    header();
    if(window.location.pathname == "/resources.html") {
        renderTools(); 
    }
} ;
