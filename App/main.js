/// <reference path="../types/requirejs.d.ts" />
/**
* Created by Stephan on 11.01.2015.
*/
"use strict";
require.config({
    baseUrl: "./",
    paths: {
        "libs": "../" + "node_modules",
        "fluss": "../node_modules/fluss/amd/" + "fluss",
        "react": "../node_modules/react/" + "dist/react"
    }
});

define(["libs/domready/ready", "application"], function (ready, application) {
    ready(function () {
        application.init();
    });
});
//# sourceMappingURL=main.js.map
