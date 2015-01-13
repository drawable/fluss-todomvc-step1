/// <reference path="../../types/react.d.ts" />
/// <reference path="../../node_modules/fluss/fluss.d.ts" />

/**
 * Created by Stephan on 09.01.2015.
 */

"use strict";


import React = require("react");
import Fluss = require("fluss");

export var TodoCount = React.createClass({

    mixins: [Fluss.ReactMixins.componentLifecycle],

    componentDidMount: function() {
        var that = this;
        this.props.todos.allChanges
            .forEach(function() {
                that.forceUpdate();
            }).until(this._willUnmount);
    },

    render: function() {
        var count = this.props.todos.length;
        return React.DOM.span({ id: "todo-count"}, React.DOM.strong({}, count), count === 1 ? " item left" : " items left");
    }
});