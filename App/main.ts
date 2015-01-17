/// <reference path="../types/requirejs.d.ts" />
/**
 * Created by Stephan on 11.01.2015.
 */

"use strict";

require.config({
    baseUrl: "./",
    paths: {
        app: "./",
        libs: "../" + "node_modules",
        react: "../node_modules/react/dist/react",
        fluss: "../node_modules/fluss/amd/index"
    }
});

define(["libs/domready/ready", "app/application"], function(ready, application) {

    ready(function() {
        application.init();
    });
});
