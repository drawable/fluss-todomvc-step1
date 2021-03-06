/// <reference path="../../types/react.d.ts" />

/**
 * Created by Stephan on 04.01.2015.
 */


"use strict";
import React = require("react");

import Actions = require("app/actions");

export var NewTodo = React.createClass({

    handleInput: function(event) {
        this.setState({ value: event.currentTarget.value })
    },

    handleKeyDown: function(event) {
        if (event.keyCode === 13) {
            Actions.addTodo(this.state.value);
            this.setState({ value: "" });
        }
    },

    getInitialState: function() {
        return { value: ""}
    },

    render: function() {
        return React.DOM.input({ id: "new-todo", placeholder: "What needs to be done?", autofocus: "autofocus",
            onChange: this.handleInput, onKeyDown: this.handleKeyDown,
            value: this.state.value })
    }
});